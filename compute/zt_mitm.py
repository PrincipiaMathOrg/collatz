"""Meet-in-the-middle decision procedure for l_k, reaching depths the 3^k traversal cannot.

Round 1's directive asks for depths 20 to 30 by enumerating ternary words of length k+L. That is
3^(k+L) work -- 3^27 at k=20 -- to find, by the measured law in zt_pathspectrum.py, only about
3^k/27^L survivors. This gets the same answer in about 3^((k+L)/2).

DERIVATION.

Round 1 (Prop 3.10) gives: l_k >= L exactly when some x >= 1 survives k+L steps and has
F^L(x) < 64^k. Put m = k+L. Since F^L(x) < 64^k <= 64^m forces x < 64^m, such an x is exactly the
canonical start R_m(w) of a nonzero ternary word w of length m.

Unfolding the recurrence 64F(y) = 81y + e gives the exact affine form

    F^n(y) = (81^n y + N_n) / 64^n,     N_n = sum_{j<n} e_j 81^(n-1-j) 64^j,

so the size condition F^L(x) < 64^k is the integer inequality

    81^L x + N_L < 64^(k+L),                                                       (*)

in which N_L depends only on the first L digits of w.

Split w = u v with |u| = h and h >= L. Write x = A + 64^h B, where A = R_h(u) < 64^h and
B < 64^(m-h). Adding 64^h B to the start adds 81^h B to the state after h steps, because each of
those h steps multiplies a perturbation by 81/64 and their branches depend only on x mod 64^h. So

    z := F^h(x) = Q_h(u) + 81^h B.

The remaining m-h steps succeed exactly when z is congruent, modulo 64^(m-h), to the canonical
start zeta = R_(m-h)(v) of the tail word. Hence, with M = 64^(m-h),

    B = (zeta - Q_h(u)) * 81^(-h)  mod M,

and B is UNIQUELY determined by the pair (u, zeta). Multiplying through by 81^(-h) turns the
size condition into an interval condition: setting

    gamma(zeta) = zeta * 81^(-h) mod M,        delta(u) = Q_h(u) * 81^(-h) mod M,

we get B = gamma(zeta) - delta(u) mod M, so (*) holds for some tail exactly when some gamma(zeta)
lies in the interval [delta(u), delta(u) + Bmax(u)] modulo M. Sorting the gamma values once and
binary-searching one interval per u costs

    3^(m-h) log + 3^h log      instead of      3^m,

minimised at h = m/2. Every quantity is an exact Python integer; no floating point anywhere.

    python zt_mitm.py --validate 14      # check against the known table, every k and every L
    python zt_mitm.py 20                 # decide l_20
"""
import bisect
import sys

from zt_independent import STEP, ROUND1


def words(n):
    """Yield (R_n(w), Q_n(w), first_digits) over all ternary words of length n, by lifting."""
    pow64 = [64 ** i for i in range(n + 2)]
    pow81 = [81 ** i for i in range(n + 2)]
    out = []

    def dfs(i, R, Q, digits):
        if i == n:
            out.append((R, Q, digits))
            return
        for t in range(64):
            mid = Q + t * pow81[i]
            e = STEP.get(mid & 63)
            if e is None:
                continue
            dfs(i + 1, R + t * pow64[i], (81 * mid + e) // 64, digits + (e,))

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0, ())
    return out


def tail_gammas(n, inv, M):
    """The 3^n values gamma(zeta) = R_n(w) * 81^(-h) mod M, as a flat list of ints.

    Kept separate from words() because the tail side is what limits the reachable depth: at
    n = 15 there are 14.3 million of them, and holding (R, Q, digits) tuples instead of bare
    integers costs an order of magnitude more memory for information this side never uses.
    """
    pow64 = [64 ** i for i in range(n + 2)]
    pow81 = [81 ** i for i in range(n + 2)]
    out = []
    push = out.append

    def dfs(i, R, Q):
        if i == n:
            push((R * inv) % M)
            return
        for t in range(64):
            mid = Q + t * pow81[i]
            e = STEP.get(mid & 63)
            if e is None:
                continue
            dfs(i + 1, R + t * pow64[i], (81 * mid + e) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    return out


def N_of(digits, L):
    """N_L = sum_{j<L} e_j 81^(L-1-j) 64^j, from the first L error digits."""
    return sum(digits[j] * 81 ** (L - 1 - j) * 64 ** j for j in range(L))


def exists_path(k, L, h=None, want_witness=False):
    """True iff l_k >= L, i.e. some x >= 1 survives k+L steps with F^L(x) < 64^k."""
    if L == 0:
        return True
    m = k + L
    if h is None:
        h = max(L, m // 2)
    if h >= m:
        h = m - 1
    M = 64 ** (m - h)
    inv = pow(81, -h, M)
    p81L, p64h = 81 ** L, 64 ** h
    limit = 64 ** (k + L)

    gam = sorted(tail_gammas(m - h, inv, M))

    for A, Qh, digits in words(h):
        num = limit - N_of(digits, L) - p81L * A
        if num <= 0:
            continue
        Bmax = (num - 1) // (p81L * p64h)
        if Bmax >= M:
            Bmax = M - 1
        lo = (Qh * inv) % M
        # want some gamma in [lo, lo+Bmax] mod M; that is one or two contiguous ranges
        spans = [(lo, lo + Bmax)] if lo + Bmax < M else [(lo, M - 1), (0, lo + Bmax - M)]
        for a, b in spans:
            i = bisect.bisect_left(gam, a)
            if i < len(gam) and gam[i] <= b:
                B = (gam[i] - lo) % M
                if A == 0 and B == 0:
                    # the zero start; look for any other hit in this span before giving up
                    j = i + 1
                    while j < len(gam) and gam[j] <= b:
                        if (gam[j] - lo) % M != 0:
                            break
                        j += 1
                    if j >= len(gam) or gam[j] > b:
                        continue
                    B = (gam[j] - lo) % M
                x = A + p64h * B
                if x >= 1 and 81 ** L * x + N_of(digits, L) < limit:
                    return (True, x) if want_witness else True
    return (False, None) if want_witness else False


def ell(k, hint=None):
    """l_k, by testing L upward from a hint."""
    L = 0
    while exists_path(k, L + 1):
        L += 1
    return L


def validate(kmax):
    bad = 0
    print("  k   l_k(MITM)  l_k(known)  per-L agreement")
    for k in range(1, kmax + 1):
        known = ROUND1[k][2]
        got = ell(k)
        detail = []
        for L in range(0, known + 3):
            e = exists_path(k, L)
            detail.append("%d:%s" % (L, "Y" if e else "n"))
            if e != (L <= known):
                bad += 1
                detail[-1] += "!MISMATCH"
        ok = "ok" if got == known else "MISMATCH"
        print("%3d %8d %11d  %-6s %s" % (k, got, known, ok, " ".join(detail)))
        if got != known:
            bad += 1
    print("\n%d disagreement(s) against the known table over depths 1..%d" % (bad, kmax))
    return 1 if bad else 0


if __name__ == "__main__":
    if "--validate" in sys.argv:
        sys.exit(validate(int(sys.argv[sys.argv.index("--validate") + 1])))
    k = int(sys.argv[1])
    bound = (k + 1) // 3
    print("k=%d  conjectured bound floor((k+1)/3) = %d" % (k, bound))
    for L in range(1, bound + 3):
        ok, wit = exists_path(k, L, want_witness=True)
        print("  l_%d >= %d ?  %s%s" % (k, L, ok, ("   witness x=%d" % wit) if ok else ""))
        if not ok:
            print("  => l_%d = %d   (%s)" % (k, L - 1, "within bound" if L - 1 <= bound else "VIOLATES BOUND"))
            break
