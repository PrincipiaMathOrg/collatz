"""Independent exact check of round 1's zero-trace table.

Written from the definitions in rounds/round-1.tex, NOT from the round's C++ source: different
language, arbitrary-precision integers throughout (so the 128-bit overflow argument is not being
assumed), and the lifting recursion re-derived below. Round 1's own next-round directive asks for
exactly this -- two independent implementations, cross-checked on every depth k <= 19 before any
new row is accepted.

Definitions used (round-1.tex, section 3):

    F(x) = 81x/64        if x = 0  mod 64
           (81x+1)/64    if x = 15 mod 64
           (81x-1)/64    if x = 49 mod 64      undefined otherwise

    S_k  = { x in [0, 64^k) : the first k applications of F to x are defined }
    Z_k  = graph on S_k with an edge x -> F(x) whenever F(x) is in S_k
    l_k  = longest directed path in the nonzero part of Z_k

Lifting, re-derived: a depth-n state is a pair (R, Q) with R in [0,64^n) and Q = F^n(R). Replacing
R by R + t*64^n replaces Q by Q + t*81^n, because each of the n steps multiplies the perturbation
by 81/64. Appending a step means choosing the unique t in [0,64) making Q + t*81^n land in a
residue class where F is defined; the resulting error e in {-1,0,1} is then forced, and
Q' = (81(Q + t*81^n) + e)/64.

    python zt_independent.py 13          # depths 1..13

    python zt_independent.py 3 --brute   # additionally brute-force every x in [0,64^k)
                                         # and confirm the lifting agrees
"""
import sys

STEP = {0: 0, 15: 1, 49: -1}          # x mod 64 -> the error e, i.e. F(x) = (81x + e)/64


def F(x):
    """F(x), or None where F is undefined."""
    e = STEP.get(x & 63)
    if e is None:
        return None
    return (81 * x + e) // 64


def walk(R, Q, limit):
    """Path length from vertex R of Z_k, given Q = F^k(R) and limit = 64^k.

    F(R) is a vertex of Z_k exactly when F(R) < limit (it is then still in range) and the window
    starting there still has k defined steps, which happens exactly when F(Q) is defined.
    """
    x, y, n = R, Q, 0
    while True:
        ny = F(y)
        if ny is None:
            return n
        nx = F(x)
        if nx is None:                # cannot happen; a genuine assertion, not decoration
            raise AssertionError("F undefined at %d while F^k of it was defined" % x)
        if nx >= limit:
            return n
        x, y, n = nx, ny, n + 1


def table(kmax):
    """Return {k: (vertices, edges, l_k)} by depth-first lifting, exact integers throughout."""
    out = {}
    pow64 = [64 ** n for n in range(kmax + 2)]
    pow81 = [81 ** n for n in range(kmax + 2)]
    stats = {k: [0, 0, 0] for k in range(1, kmax + 1)}     # vertices, edges, l_k

    def dfs(n, R, Q):
        if n:
            s = stats[n]
            s[0] += 1
            if R == 0:
                s[1] += 1                                   # the zero loop
            else:
                length = walk(R, Q, pow64[n])
                if length:
                    s[1] += 1
                    if length > s[2]:
                        s[2] = length
        if n == kmax:
            return
        for t in range(64):
            mid = Q + t * pow81[n]
            e = STEP.get(mid & 63)
            if e is None:
                continue
            dfs(n + 1, R + t * pow64[n], (81 * mid + e) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    for k in range(1, kmax + 1):
        out[k] = tuple(stats[k])
    return out


def brute(k):
    """Definition-level check for small k: every x in [0,64^k), no lifting, no cleverness."""
    limit = 64 ** k
    verts = []
    for x in range(limit):
        y, ok = x, True
        for _ in range(k):
            y = F(y)
            if y is None:
                ok = False
                break
        if ok:
            verts.append((x, y))
    edges = longest = 0
    for x, y in verts:
        if x == 0:
            edges += 1
            continue
        n = walk(x, y, limit)
        if n:
            edges += 1
            longest = max(longest, n)
    return len(verts), edges, longest


ROUND1 = {                       # the table asserted in rounds/round-1.tex, Theorem 4.2
    1: (3, 1, 0), 2: (9, 1, 0), 3: (27, 1, 0), 4: (81, 5, 1), 5: (243, 13, 2),
    6: (729, 35, 1), 7: (2187, 89, 2), 8: (6561, 241, 2), 9: (19683, 811, 3),
    10: (59049, 2239, 3), 11: (177147, 6587, 4), 12: (531441, 19640, 3),
    13: (1594323, 59315, 4), 14: (4782969, 177145, 4), 15: (14348907, 531731, 5),
    16: (43046721, 1594441, 5), 17: (129140163, 4783076, 6),
    18: (387420489, 14349300, 6), 19: (1162261467, 43046372, 6),
}


def main():
    kmax = int(sys.argv[1]) if len(sys.argv) > 1 else 13
    got = table(kmax)
    print("  k   vertices        edges     l_k   bound   round-1 claim")
    bad = 0
    for k in range(1, kmax + 1):
        v, e, l = got[k]
        claim = ROUND1.get(k)
        agree = "AGREES" if claim == (v, e, l) else "DISAGREES %s" % (claim,)
        if claim != (v, e, l):
            bad += 1
        bound = (k + 1) // 3
        flag = "ok" if l <= bound else "VIOLATED"
        print("%3d %10d %12d %6d %6d %-6s %s" % (k, v, e, l, bound, flag, agree))
    if "--brute" in sys.argv:
        for k in range(1, min(kmax, 3) + 1):
            b = brute(k)
            print("brute k=%d -> %s   %s" % (k, b, "AGREES" if b == got[k] else "DISAGREES"))
    print("\n%d disagreement(s) with round 1 over depths 1..%d" % (bad, kmax))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
