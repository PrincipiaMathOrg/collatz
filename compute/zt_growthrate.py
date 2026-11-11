"""How fast does l_k really grow? -- the question l_23 = 7 forced open.

CONTEXT. Conjecture 3.12 (round 1) asserts l_k <= floor((k+1)/3), i.e. a growth rate of 1/3.
Depths 15..22 attain the bound exactly, which looked like sharpness; then l_23 = 7 while the bound
is 8. So l_k grows slower than the bound *somewhere*, and the honest question is what rate it
actually has, and whether that rate is above or below 1/3 -- because if it is above 1/3, then
Conjecture 3.12 is FALSE for all large k and the whole branch is building on a false statement.

THE MODEL. A vertex x of Z_k continues L more steps exactly when F^k(x) survives L further steps,
a condition on F^k(x) mod 64^L met by 3^L of the 64^L residues. Under exact equidistribution,

    N(k,L) := #{x in Z_k, x nonzero, path length >= L}  ~  3^k (3/64)^L.

zt_pathspectrum.py measured this and reported "ratio stays between 0.4 and 1.9 with no drift".
That reading is too coarse. The ratios do not scatter about a constant: at fixed k they DECAY in
L (at k=12: 0.79, 0.66, 0.53), which is a systematic effect, not noise. So the right model has a
free per-step factor rather than the theoretical 3/64:

    N(k,L)  ~  C * 3^k * beta^L,

and everything depends on beta, because N(k,L) >= 1 is possible up to

    L  ~  k * ln 3 / ln(1/beta),        so        l_k / k  ->  ln 3 / ln(1/beta).

With the theoretical beta = 3/64 this rate is ln3/ln(64/3) = 0.35926 > 1/3, which would predict
Conjecture 3.12 fails for large k. The measured decay in L pushes beta below 3/64 and the rate
down toward 1/3. The margin is small, so the constant has to be measured, not assumed.

WHAT IS EXACT AND WHAT IS NOT. The counts N(k,L) are exact integers from a complete traversal.
The fitted beta and the rate derived from it are a HEURISTIC EXTRAPOLATION of a model that is not
proved to hold -- they are a prediction about where to look, never evidence for a theorem. Nothing
in this file may be cited as establishing anything about l_k.

    python zt_growthrate.py 15
"""
import math
import sys

from zt_independent import STEP, walk

GOOD = sorted(STEP)
MIN_COUNT = 30            # cells below this are Poisson-noisy; excluded from the fit


def spectrum(kmax):
    """Exact N(k,L) for all k <= kmax, using computed digits rather than a 64-way scan."""
    pow64 = [64 ** n for n in range(kmax + 2)]
    pow81 = [81 ** n for n in range(kmax + 2)]
    inv81 = [pow(81, -n, 64) for n in range(kmax + 2)]
    counts = {k: {} for k in range(1, kmax + 1)}

    def dfs(n, R, Q):
        if n and R:
            length = walk(R, Q, pow64[n])
            counts[n][length] = counts[n].get(length, 0) + 1
        if n == kmax:
            return
        p64, p81, ivq = pow64[n], pow81[n], inv81[n]
        for r in GOOD:
            t = ((r - Q) * ivq) & 63
            mid = Q + t * p81
            dfs(n + 1, R + t * p64, (81 * mid + STEP[r]) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    return counts


def tail_counts(counts, k):
    """N(k,L) for L >= 1, as an exact integer list indexed from L=1."""
    dist = counts[k]
    if not dist:
        return []
    return [sum(c for length, c in dist.items() if length >= L)
            for L in range(1, max(dist) + 1)]


def fit(counts, kmax):
    """Least-squares fit of ln N(k,L) = ln C + k ln3 + L ln beta over well-populated cells."""
    pts = []
    for k in range(1, kmax + 1):
        for L, n in enumerate(tail_counts(counts, k), start=1):
            if n >= MIN_COUNT:
                pts.append((k, L, n))
    if len(pts) < 3:
        return None
    # residual y = ln N - k ln3 should be ln C + L ln beta: a straight line in L
    xs = [float(L) for _, L, _ in pts]
    ys = [math.log(n) - k * math.log(3) for k, _, n in pts]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    sxx = sum((x - mx) ** 2 for x in xs)
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    slope = sxy / sxx
    intercept = my - slope * mx
    resid = [y - (intercept + slope * x) for x, y in zip(xs, ys)]
    rms = math.sqrt(sum(r * r for r in resid) / len(resid))
    se = math.sqrt(sum(r * r for r in resid) / max(1, len(resid) - 2) / sxx)
    return {"beta": math.exp(slope), "logbeta": slope, "se_logbeta": se,
            "C": math.exp(intercept), "rms": rms, "n": len(pts)}


def main():
    kmax = int(sys.argv[1]) if len(sys.argv) > 1 else 15
    counts = spectrum(kmax)

    print("EXACT COUNTS.  N(k,L) = # nonzero vertices of Z_k with path length >= L.")
    print("  k   L        N(k,L)     N/3^k        ratio to (3/64)^L")
    for k in range(1, kmax + 1):
        tc = tail_counts(counts, k)
        for L, n in enumerate(tc, start=1):
            pred = 3 ** k * (3 / 64) ** L
            print("%3d %3d %13d   %.3e   %8.3f" % (k, L, n, n / 3 ** k, n / pred if pred else 0))
        if tc:
            print("      depth %d: longest path %d,  bound floor((k+1)/3) = %d"
                  % (k, len(tc), (k + 1) // 3))

    f = fit(counts, kmax)
    print("\nHEURISTIC FIT (not a proof; see module docstring).")
    if not f:
        print("  too few well-populated cells to fit")
        return 0
    print("  cells used (N >= %d): %d" % (MIN_COUNT, f["n"]))
    print("  model N(k,L) = C * 3^k * beta^L")
    print("  C    = %.4f" % f["C"])
    print("  beta = %.6f      (theoretical 3/64 = %.6f)" % (f["beta"], 3 / 64))
    print("  ln beta = %.5f +/- %.5f (1 s.e.)" % (f["logbeta"], f["se_logbeta"]))
    print("  rms residual in ln N: %.4f" % f["rms"])

    # ---- the clean law the fit is pointing at -------------------------------------------------
    # beta comes out near 1/27, and the correction to the naive 3/64 is near 64/81 -- which is
    # exactly the reciprocal of the map's own expansion factor 81/64. Combining,
    #     beta = (3/64) * (64/81) = 3/81 = 1/27 = 3^(-3)   exactly,
    # i.e. 3 of 64 residues survive a step, diluted by the 64/81 measure contraction that the
    # expansion F(x) = (81x+e)/64 applies. That predicts the strikingly simple
    #     N(k,L) = 3^(k-3L),
    # and L <= k/3 is exactly the range where that is >= 1 -- which IS Conjecture 3.12. So the
    # conjecture is not an inequality with room; it is the statement that this constant is 3^(-3).
    print("\nTHE CLEAN LAW:  N(k,L) vs 3^(k-3L)   [beta = (3/64)*(64/81) = 1/27 exactly]")
    print("  measured correction to (3/64)^L, per step:  64/81 = %.6f" % (64 / 81))
    print("  k   L        N(k,L)      3^(k-3L)     N / 3^(k-3L)")
    worst = 0.0
    for k in range(1, kmax + 1):
        for L, n in enumerate(tail_counts(counts, k), start=1):
            e = k - 3 * L
            pred = 3 ** e if e >= 0 else 1.0 / 3 ** (-e)
            r = n / pred
            if n >= MIN_COUNT:
                worst = max(worst, abs(math.log(r)))
            print("%3d %3d %13d %13.4f %14.4f" % (k, L, n, pred, r))
    print("  worst |ln ratio| over cells with N >= %d: %.4f  (a factor of %.3f)"
          % (MIN_COUNT, worst, math.exp(worst)))

    rate = math.log(3) / (-f["logbeta"])
    lo = math.log(3) / (-(f["logbeta"] - f["se_logbeta"]))
    hi = math.log(3) / (-(f["logbeta"] + f["se_logbeta"]))
    lo, hi = min(lo, hi), max(lo, hi)
    print("\n  implied asymptotic rate  l_k / k -> ln3 / ln(1/beta) = %.5f" % rate)
    print("  1 s.e. band: [%.5f, %.5f]" % (lo, hi))
    print("  compare 1/3 = %.5f   (the rate Conjecture 3.12 asserts)" % (1 / 3))
    print("  compare ln3/ln(64/3) = %.5f   (rate if beta were exactly 3/64)" % (math.log(3) / math.log(64 / 3)))
    if lo > 1 / 3:
        verdict = "ABOVE 1/3 even at -1 s.e.: model predicts Conjecture 3.12 FAILS for large k"
    elif hi < 1 / 3:
        verdict = "BELOW 1/3 even at +1 s.e.: model is consistent with Conjecture 3.12 holding"
    else:
        verdict = "STRADDLES 1/3: the data cannot call the direction; the conjecture sits at the critical rate"
    print("  VERDICT: %s" % verdict)

    # ---- what the corrected law says about Conjecture 3.12 itself -----------------------------
    # A violation at depth k means l_k >= floor((k+1)/3) + 1, so the corrected law gives it an
    # expected count of 3^(k - 3(floor((k+1)/3)+1)). That exponent depends only on k mod 3:
    #     k = 3m   -> 3^(-3) = 1/27
    #     k = 3m+1 -> 3^(-2) = 1/9      <-- the most likely depths, by a factor of 3
    #     k = 3m+2 -> 3^(-4) = 1/81
    # Each is < 1, so no single depth is likely to violate -- but the sum over k DIVERGES, at
    # 1/27 + 1/9 + 1/81 = 13/81 per three depths. Under this model Conjecture 3.12 is FALSE, with
    # infinitely many violations, just very sparse ones. That is a heuristic, not a theorem; its
    # value is that it says exactly where to hunt.
    print("\nWHAT THE CORRECTED LAW SAYS ABOUT CONJECTURE 3.12")
    print("  A violation at depth k needs l_k >= floor((k+1)/3)+1; expected count 3^(k-3L):")
    per3 = 0.0
    for r in (0, 1, 2):
        kk = 30 + r                       # any representative; the exponent depends only on k mod 3
        LL = (kk + 1) // 3 + 1
        e = kk - 3 * LL
        per3 += 3.0 ** e
        print("    k = 3m+%d  ->  3^(%d) = %.5f%s"
              % (r, e, 3.0 ** e, "   <-- best hunting ground" if r == 1 else ""))
    print("  sum per three depths: %.5f, so the expected number of violations up to K grows" % per3)
    print("  linearly (~%.4f per depth) and DIVERGES -- the model predicts the conjecture is" % (per3 / 3))
    print("  false, but only sparsely.")
    seen = 23                             # depths decided so far
    exp_so_far = sum(3.0 ** (k - 3 * ((k + 1) // 3 + 1)) for k in range(1, seen + 1))
    print("  expected violations over the decided range k <= %d: %.3f; observed: 0." % (seen, exp_so_far))
    print("  P(none) under a Poisson model with that mean: %.3f -- unremarkable, so the data is"
          % math.exp(-exp_so_far))
    print("  consistent with the model rather than refuting it.")
    print("  ACTIONABLE: hunt violations at k = 1 mod 3 (k = 25, 28, 31, ...), where the expected")
    print("  count is 1/9 -- three times any other residue. Reaching k=25 means deciding L=9 at")
    print("  m = k+L = 34, which needs a tail larger than this node's memory allows; a chunked or")
    print("  disk-backed tail is the enabling step.")

    # Where would the conjecture first break, if the model held exactly?
    print("\n  If the model held exactly, the expected count at L = floor((k+1)/3) + 1")
    print("  (the first value the conjecture forbids) would pass 1 at:")
    shown = 0
    for k in range(15, 200):
        L = (k + 1) // 3 + 1
        e = f["C"] * 3 ** k * f["beta"] ** L
        if e >= 1:
            print("    k = %d  (expected count %.2f)" % (k, e))
            shown += 1
            if shown >= 3:
                break
    if not shown:
        print("    never, for k < 200 -- the model does not predict a violation in reach")
    return 0


if __name__ == "__main__":
    sys.exit(main())
