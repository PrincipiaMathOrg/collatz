"""Deep meet-in-the-middle for l_k, reaching the first depth where the bound jumps to 8.

WHY THIS EXISTS. zt_mitm.py settled l_20 = l_21 = l_22 = 7, so depths 15..22 are eight
consecutive cases where l_k attains floor((k+1)/3) exactly. Every slack case sits at k <= 14.
The question that decides whether "the bound is eventually always attained" is a theorem or a
small-numbers accident is the NEXT depth, because k = 23 is where floor((k+1)/3) jumps to 8:

    l_23 = 8  ->  nine consecutive tight depths, across a jump of the bound;
    l_23 = 7  ->  the first slack case since k = 14, and the run is broken.

Either answer is a real finding. zt_mitm.py cannot reach it: at k=23, L=8 we need m = k+L = 31,
and its balanced split materialises 3^15 head tuples AND 3^16 tail integers at once.

WHAT IS DIFFERENT HERE (the mathematics is unchanged -- see zt_mitm.py for the derivation).

1. UNBALANCED, STREAMING SPLIT. The tail side must be held in memory (it is sorted and searched);
   the head side is only scanned. So put the LARGER half on the head and stream it: h = 16 leaves
   3^16 = 43M head words that are never stored, against 3^15 = 14.3M tail integers that are. The
   head is a generator fused with the interval test, so its memory is O(h).

2. DIGITS ARE COMPUTED, NOT SEARCHED. Both files' DFS loops `for t in range(64)` and keeps the
   three t that land in a residue class where F is defined. Since 81^i is odd it is invertible
   mod 64, so those three t are given by a formula: F is defined exactly on the residues
   r in {0, 15, 49}, and Q + t*81^i = r mod 64 has the unique solution

       t = (r - Q) * 81^(-i)   mod 64.

   Enumerating the three directly instead of filtering 64 candidates removes a factor of ~21 from
   every node expansion. At m = 31 that is the difference between feasible and not.

3. N_L IS CARRIED, NOT REBUILT. N_L = sum_{j<L} e_j 81^(L-1-j) 64^j depends only on the first L
   digits, so it is accumulated during the descent and is already final by depth L, instead of
   being recomputed from the digit tuple at each of 43M leaves.

Exact integers throughout; no floating point. Validated against the known table before use:

    python zt_mitm_deep.py --validate 14     # every k <= 14 and every L, vs zt_independent.ROUND1
    python zt_mitm_deep.py 23 --L 8          # decide whether l_23 >= 8
"""
import bisect
import sys

from zt_independent import STEP, ROUND1, F

GOOD = sorted(STEP)                   # the residues mod 64 where F is defined: 0, 15, 49


def _branches(i, Q, inv81):
    """The three (t, e) with F defined at Q + t*81^i, by formula rather than by scanning 64."""
    ivq = inv81[i]
    return [(((r - Q) * ivq) & 63, STEP[r]) for r in GOOD]


def tail_gammas(n, inv, M):
    """Sorted list of the 3^n values gamma = R_n(w) * 81^(-h) mod M.

    Sorted in place: at n = 15 this list is ~14.3M big integers and `sorted()` would hold a
    second copy of it at peak.
    """
    pow64 = [64 ** i for i in range(n + 2)]
    pow81 = [81 ** i for i in range(n + 2)]
    inv81 = [pow(81, -i, 64) for i in range(n + 2)]
    out = []
    push = out.append

    def dfs(i, R, Q):
        if i == n:
            push((R * inv) % M)
            return
        p64, p81 = pow64[i], pow81[i]
        for t, e in _branches(i, Q, inv81):
            mid = Q + t * p81
            dfs(i + 1, R + t * p64, (81 * mid + e) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    out.sort()
    return out


def exists_path(k, L, h=None, want_witness=False, verbose=False):
    """True iff l_k >= L: some x >= 1 survives k+L steps of F with F^L(x) < 64^k."""
    if L == 0:
        return (True, 0) if want_witness else True
    m = k + L
    if h is None:                      # head streams, tail is stored -> give the head the bigger half
        h = max(L, (m + 1) // 2)
    if h >= m:
        h = m - 1
    if h < L:
        raise ValueError("need h >= L so that N_L is determined inside the head")

    M = 64 ** (m - h)
    inv = pow(81, -h, M)
    p81L, p64h = 81 ** L, 64 ** h
    limit = 64 ** (k + L)
    step = p81L * p64h                 # the divisor turning the size bound into a bound on B

    if verbose:
        print("  k=%d L=%d  m=%d  h=%d  head=3^%d  tail=3^%d" % (k, L, m, h, h, m - h))
        sys.stdout.flush()

    gam = tail_gammas(m - h, inv, M)
    if verbose:
        print("  tail built: %d gammas" % len(gam))
        sys.stdout.flush()

    pow64 = [64 ** i for i in range(h + 2)]
    pow81 = [81 ** i for i in range(h + 2)]
    inv81 = [pow(81, -i, 64) for i in range(h + 2)]
    # weight[j] = 81^(L-1-j) 64^j, the contribution of the j-th error digit to N_L
    weight = [81 ** (L - 1 - j) * 64 ** j for j in range(L)]
    ngam = len(gam)
    found = []

    def dfs(i, R, Q, N):
        """Descend the head; at a leaf test whether any tail completes this word."""
        if found:
            return
        if i == h:
            num = limit - N - p81L * R
            if num <= 0:
                return
            Bmax = (num - 1) // step
            if Bmax >= M:
                Bmax = M - 1
            lo = (Q * inv) % M
            hi = lo + Bmax
            spans = ((lo, hi),) if hi < M else ((lo, M - 1), (0, hi - M))
            for a, b in spans:
                j = bisect.bisect_left(gam, a)
                while j < ngam and gam[j] <= b:
                    B = (gam[j] - lo) % M
                    x = R + p64h * B
                    if x >= 1 and p81L * x + N < limit:
                        found.append(x)
                        return
                    j += 1                     # only the zero start can land here; keep looking
            return
        p64, p81 = pow64[i], pow81[i]
        for t, e in _branches(i, Q, inv81):
            mid = Q + t * p81
            dfs(i + 1, R + t * p64, (81 * mid + e) // 64,
                N + e * weight[i] if i < L else N)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0, 0)
    x = found[0] if found else None
    return (x is not None, x) if want_witness else (x is not None)


def count_paths(k, L, h=None, verbose=False, witness_cap=1000):
    """Exact N(k,L) and C_{k,L}(0), counting ALL completions rather than stopping at the first.

    Round 2's directive: at each head leaf replace the existence test by
    bisect_right(gam,b) - bisect_left(gam,a) on each non-wrapping interval and sum.

    Why the arithmetic is exact rather than an estimate. For a head word u the size condition
    81^L x + N_L < 64^(k+L) is equivalent to B <= Bmax, and every B in [0,Bmax] meeting the
    congruence corresponds to exactly one gamma in the span -- so the interval count IS the number
    of completions, with no double counting: distinct gammas give distinct tails, hence distinct x.

    The all-zero solution x = 0 is counted exactly once (it needs A = 0 and B = 0, and at A = 0 the
    span starts at lo = 0 where the all-zero tail contributes gamma = 0). Since Z_k's zero vertex is
    excluded from N(k,L) but included in the carry fibre, the totals are related by

        C_{k,L}(0) = N(k,L) + 1,

    which is round 2's identity -- so the raw total IS C_{k,L}(0), and N(k,L) is one less. That
    makes this routine a direct probe of the pinned fibre, not merely a path counter.
    """
    if L == 0:
        raise ValueError("L = 0 is degenerate here; N(k,0) counts every vertex")
    m = k + L
    if h is None:
        h = max(L, (m + 1) // 2)
    if h >= m:
        h = m - 1
    if h < L:
        raise ValueError("need h >= L so that N_L is determined inside the head")

    M = 64 ** (m - h)
    inv = pow(81, -h, M)
    p81L, p64h = 81 ** L, 64 ** h
    limit = 64 ** (k + L)
    step = p81L * p64h

    if verbose:
        print("  k=%d L=%d  m=%d  h=%d  head=3^%d  tail=3^%d" % (k, L, m, h, h, m - h))
        sys.stdout.flush()

    gam = tail_gammas(m - h, inv, M)
    if verbose:
        print("  tail built: %d gammas" % len(gam))
        sys.stdout.flush()

    pow64 = [64 ** i for i in range(h + 2)]
    pow81 = [81 ** i for i in range(h + 2)]
    inv81 = [pow(81, -i, 64) for i in range(h + 2)]
    weight = [81 ** (L - 1 - j) * 64 ** j for j in range(L)]
    total = 0
    witnesses = []

    def dfs(i, R, Q, N):
        nonlocal total
        if i == h:
            num = limit - N - p81L * R
            if num <= 0:
                return
            Bmax = (num - 1) // step
            if Bmax >= M:
                Bmax = M - 1
            lo = (Q * inv) % M
            hi = lo + Bmax
            spans = ((lo, hi),) if hi < M else ((lo, M - 1), (0, hi - M))
            for a, b in spans:
                i0 = bisect.bisect_left(gam, a)
                i1 = bisect.bisect_right(gam, b)
                c = i1 - i0
                if c:
                    total += c
                    if len(witnesses) < witness_cap:
                        for j in range(i0, min(i1, i0 + witness_cap)):
                            x = R + p64h * ((gam[j] - lo) % M)
                            if x >= 1:
                                witnesses.append(x)
            return
        p64, p81 = pow64[i], pow81[i]
        for t, e in _branches(i, Q, inv81):
            mid = Q + t * p81
            dfs(i + 1, R + t * p64, (81 * mid + e) // 64,
                N + e * weight[i] if i < L else N)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0, 0)
    return {"C0": total, "N": total - 1, "h": h, "witnesses": witnesses}


def validate_counts(kmax):
    """Cross-check count-all against the complete traversal, every k <= kmax and every L <= l_k+1."""
    from zt_growthrate import spectrum, tail_counts
    counts = spectrum(kmax)
    bad = 0
    print("  k   L   N(count-all)   N(traversal)   C_{k,L}(0)   agree")
    for k in range(1, kmax + 1):
        truth = tail_counts(counts, k)                 # index L-1 -> exact N(k,L)
        lk = len(truth)
        for L in range(1, lk + 2):                     # every L <= l_k + 1
            want = truth[L - 1] if L <= lk else 0
            got = count_paths(k, L)
            ok = got["N"] == want
            if not ok:
                bad += 1
            print("%3d %3d %14d %14d %12d   %s"
                  % (k, L, got["N"], want, got["C0"], "ok" if ok else "MISMATCH"))
    print("\n%d disagreement(s) against the complete traversal over depths 1..%d" % (bad, kmax))
    return 1 if bad else 0


def confirm_witness(x, k, L):
    """Re-verify a witness by direct iteration of F, independently of the search."""
    y, steps = x, 0
    while steps < k + L:
        ny = F(y)
        if ny is None:
            return False, "F undefined after %d steps" % steps
        y = ny
        steps += 1
        if steps == L:
            after_L = y
    if after_L >= 64 ** k:
        return False, "F^L(x) >= 64^k"
    if x >= 64 ** (k + L):
        return False, "x out of range"
    return True, "survives %d steps, F^%d(x) < 64^%d" % (k + L, L, k)


def validate(kmax):
    """Cross-check every decision against the independently computed table."""
    bad = 0
    print("  k   l_k(deep)  l_k(known)  per-L agreement")
    for k in range(1, kmax + 1):
        known = ROUND1[k][2]
        detail, got = [], 0
        for L in range(0, known + 3):
            e = exists_path(k, L)
            detail.append("%d:%s" % (L, "Y" if e else "n"))
            if e != (L <= known):
                bad += 1
                detail[-1] += "!MISMATCH"
            if e and L > got:
                got = L
        ok = "ok" if got == known else "MISMATCH"
        if got != known:
            bad += 1
        print("%3d %8d %11d  %-8s %s" % (k, got, known, ok, " ".join(detail)))
    print("\n%d disagreement(s) against the known table over depths 1..%d" % (bad, kmax))
    return 1 if bad else 0


def main():
    if "--validate-counts" in sys.argv:
        return validate_counts(int(sys.argv[sys.argv.index("--validate-counts") + 1]))
    if "--validate" in sys.argv:
        return validate(int(sys.argv[sys.argv.index("--validate") + 1]))
    if "--count" in sys.argv:
        k = int(sys.argv[1])
        L = int(sys.argv[sys.argv.index("--L") + 1])
        h = int(sys.argv[sys.argv.index("--h") + 1]) if "--h" in sys.argv else None
        r = count_paths(k, L, h=h, verbose=True)
        print("  N(%d,%d) = %d      C_{%d,%d}(0) = %d      h = %d"
              % (k, L, r["N"], k, L, r["C0"], r["h"]))
        if r["witnesses"]:
            w = r["witnesses"][0]
            good, why = confirm_witness(w, k, L)
            print("  witness x = %d" % w)
            print("  direct-iteration check: %s (%s)" % ("PASS" if good else "FAIL", why))
        sys.stdout.flush()
        return 0
    k = int(sys.argv[1])
    bound = (k + 1) // 3
    h = int(sys.argv[sys.argv.index("--h") + 1]) if "--h" in sys.argv else None
    single = "--L" in sys.argv
    Ls = [int(sys.argv[sys.argv.index("--L") + 1])] if single else range(1, bound + 3)
    print("k=%d  conjectured bound floor((k+1)/3) = %d" % (k, bound))
    sys.stdout.flush()
    for L in Ls:
        ok, wit = exists_path(k, L, h=h, want_witness=True, verbose=True)
        print("  l_%d >= %d ?  %s" % (k, L, ok))
        if ok:
            print("     witness x = %d" % wit)
            good, why = confirm_witness(wit, k, L)
            print("     direct-iteration check: %s (%s)" % ("PASS" if good else "FAIL", why))
        sys.stdout.flush()
        if not ok:
            # Only a sweep from L=1 has actually exhibited a path of length L-1. With a single
            # --L probe, monotonicity gives the UPPER bound and nothing else: reporting
            # "l_k = L-1" here would be asserting a lower bound no witness was found for.
            if single:
                print("  => l_%d <= %d   (upper bound only; run without --L, or probe L=%d,"
                      " to establish the matching lower bound)" % (k, L - 1, L - 1))
            else:
                print("  => l_%d = %d   (%s)"
                      % (k, L - 1, "within bound" if L - 1 <= bound else "VIOLATES BOUND"))
            break
    return 0


if __name__ == "__main__":
    sys.exit(main())
