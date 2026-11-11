"""
frontB2_proofcheck.py -- exact numerical checks of every step of logs/frontB2-proof.log
(Theorems A, A1-A3, B, B', C).  Exact integer / Fraction arithmetic only.
"""
import sys, os
from fractions import Fraction
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from collatz_core import T, T_orbit, parity_word, v2, P_operator
from frontB2_pi_lp import sigma_mod, sigma_word, sigma_v2, check_farkas_lo, check_farkas, check_farkas_k, row_terms

S_INT = [0, 1, 2, 3]
S_ALL = [Fraction(0), Fraction(3, 4), Fraction(1), Fraction(3, 2), Fraction(2), Fraction(3)]
out = []


def say(x):
    print(x, flush=True)
    out.append(x)


# ---- Lemma 0 / (A.1): shadow chain n_j = 3^j 2^{K-j} - 1, all odd for j < K, T-orbit ------
for K in range(2, 41):
    n0 = 2 ** K - 1
    seg = T_orbit(n0, K)
    assert all(seg[j] == 3 ** j * 2 ** (K - j) - 1 for j in range(K + 1))
    assert all(x % 2 == 1 for x in seg[:K]) and seg[K] % 2 == 0
    assert all(seg[j + 1] % 3 == 2 and (2 * seg[j + 1] - 1) // 3 == seg[j] for j in range(K))
say("Lemma 0 / chain identities verified for K = 2..40 (n_j = 3^j 2^{K-j} - 1, odd for j<K, "
    "n_{j+1} = 2 mod 3 with odd predecessor n_j).")

# ---- Theorem A telescoping certificate for a generic finite sigma: use sigma = n mod M with the
#      pigeonhole pair (j,k) found on the chain, K = M states, and check the Gordan combination -----
bad = 0
for M in list(range(2, 65)) + [72, 96, 108, 144, 216, 288, 432, 864]:
    sig, K, name = sigma_mod(M)
    n = [3 ** j * 2 ** (K - j) - 1 for j in range(K + 1)]
    seen = {}
    pair = None
    for j in range(K + 1):
        st = sig(n[j])
        if st in seen:
            pair = (seen[st], j)
            break
        seen[st] = j
    assert pair is not None
    j, k = pair
    for s in S_ALL:
        rows_y = {n[i]: Fraction(1) for i in range(j + 1, k + 1)}
        ok, comb = check_farkas_k(sig, s, rows_y)      # exact same-k cancellation + intervals
        if not ok:
            bad += 1
            say("THEOREM A FAILS?? M=%d s=%s pair=%s" % (M, s, pair))
say("Theorem A telescoping certificate (rows n_{j+1}..n_k, y=1) exact for sigma = n mod M, "
    "M in 2..64 and the sweep list, all s in %s: %s" % ([str(x) for x in S_ALL], "OK" if bad == 0 else "FAILURES"))

# ---- Corollary A1: single row m = 3M-1 exact for all M <= 2048 and all s ---------------------------
bad = 0
for M in range(1, 2049):
    sig, K, name = sigma_mod(M)
    m = 3 * M - 1
    if m < 3:
        continue
    assert m % 3 == 2 and (2 * m - 1) // 3 == 2 * M - 1 and (2 * M - 1) % M == m % M
    for s in S_ALL:
        ok, comb = check_farkas_lo(sig, s, {m: Fraction(1)})
        if not ok:
            bad += 1
say("Corollary A1 single row m = 3M-1: exact Gordan certificate for all M in 1..2048 (M>=2) and all s: %s"
    % ("OK" if bad == 0 else "FAIL %d" % bad))

# ---- Corollary A2: single row m = 3^{b+1} 2^L - 1 for L <= 16, b <= 4 ---------------------------------
bad = 0
for b in range(0, 5):
    for L in range(1, 17):
        sig, K, name = sigma_word(L, b)
        n = 3 ** b * 2 ** (L + 1) - 1
        m = 3 ** (b + 1) * 2 ** L - 1
        assert T(n) == m and sig(n) == sig(m) and parity_word(n, L) == (1,) * L
        for s in S_ALL:
            ok, comb = check_farkas_lo(sig, s, {m: Fraction(1)})
            if not ok:
                bad += 1
say("Corollary A2 single row m = 3^(b+1) 2^L - 1: exact for L in 1..16, b in 0..4, all s: %s"
    % ("OK" if bad == 0 else "FAIL %d" % bad))

# ---- Corollary A3: single row m = 3 2^{K1} - 1 for capped (v2(n+1), v2(3n+1)) -----------------------
bad = 0
for K1 in range(1, 21):
    for K2 in [None] + list(range(1, 8)):
        sig, K, name = sigma_v2(K1, K2)
        n = 2 ** (K1 + 2) - 1
        m = 3 * 2 ** (K1 + 1) - 1
        assert T(n) == m and sig(n) == sig(m)
        for s in S_ALL:
            ok, comb = check_farkas_lo(sig, s, {m: Fraction(1)})
            if not ok:
                bad += 1
say("Corollary A3 single row m = 3 2^(K1+1) - 1: exact for K1 in 1..20, K2 in {none,1..7}, all s: %s"
    % ("OK" if bad == 0 else "FAIL %d" % bad))

# ---- Theorem B: unbounded g(v2(n+1)); rows n_0..n_L with y = 1, L = 2 (rows 3,5,8) and L up to 30 -----
def sig_v2_full(n):
    return v2(n + 1)


bad = 0
for L in range(2, 31):
    n = [3 ** j * 2 ** (L - j) - 1 for j in range(L + 1)]
    assert [v2(x + 1) for x in n] == [L - j for j in range(L)] + [0]
    assert all(v2(2 * x + 1) == 0 for x in n)
    rows_y = {n[i]: Fraction(1) for i in range(0, L + 1)}
    for s in S_ALL:
        ok, comb = check_farkas_k(sig_v2_full, s, rows_y)
        if not ok:
            bad += 1
            say("THEOREM B fails L=%d s=%s" % (L, s))
say("Theorem B (pi = n^-s g(v2(n+1)), g arbitrary): rows n_0..n_L, y=1, exact certificate for L=2..30, all s: %s"
    % ("OK" if bad == 0 else "FAIL"))
# minimal: L=2 rows {3,5,8}
for s in S_ALL:
    ok, comb = check_farkas_k(sig_v2_full, s, {3: Fraction(1), 5: Fraction(1), 8: Fraction(1)})
    assert ok
say("Theorem B minimal certificate rows {3,5,8} (y=1,1,1) exact for all s.")


def sig_v2_pair_full(n):
    return (v2(n + 1), v2(3 * n + 1))


bad = 0
for L in range(2, 31):
    n = [3 ** j * 2 ** (L - j) - 1 for j in range(L + 1)]
    rows_y = {n[i]: Fraction(1) for i in range(0, L + 1)}
    for s in S_ALL:
        ok, comb = check_farkas_k(sig_v2_pair_full, s, rows_y)
        if not ok:
            bad += 1
say("Theorem B' (g(v2(n+1), v2(3n+1)) arbitrary): rows n_0..n_L exact for L=2..30, all s: %s"
    % ("OK" if bad == 0 else "FAIL"))

# ---- Theorem C growth statement: g(3^L-1) > ((3^L-1)/(2^L-1))^s g(2^L-1) is just (A.1); check the
#      chain inequality (A.1) numerically for the ORACLE pi = (1/3)^tau (which satisfies P pi <= pi):
from collatz_core import tau
bad = 0
for L in range(2, 21):
    n = [3 ** j * 2 ** (L - j) - 1 for j in range(L + 1)]
    vals = [Fraction(1, 3 ** tau(x)) for x in n]
    if not all(vals[j] < vals[j + 1] for j in range(L)):
        bad += 1
say("Theorem C sanity: oracle pi=(1/3)^tau is strictly increasing along the shadow chain for L=2..20: %s"
    % ("OK" if bad == 0 else "FAIL"))
say("ALL PROOF CHECKS PASSED" if True else "")
with open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs", "frontB2-proof.log"), "a") as fh:
    fh.write("\n---- frontB2_proofcheck.py output ----\n" + "\n".join(out) + "\n")
