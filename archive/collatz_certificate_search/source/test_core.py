"""
test_core.py -- verifies, exactly, every identity the campaign recorded (items (a)-(k)
of the gate brief plus the two coordinator additions), printing PASS/FAIL per item.

Run:   cd source && PYTHONIOENCODING=utf-8 python test_core.py            (all items, ~3-4 min)
       python test_core.py a b c                                          (subset)
Item (g) is the heavy one (~2-3 min: DFS over all coefficient-nondescending parity
words to depth 30, exact #B_k, exact rescue counts).  Everything is exact integer /
Fraction arithmetic; no floats enter any comparison.
"""

import sys
import time
import random
from fractions import Fraction

sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")

from collatz_core import *  # noqa
from battery import (all_families, family_D, family_F, family_I, family_K, R43_W1, R43_W2,
                     R60_W1, R60_W2, run_battery)

RESULTS = []


def record(item, ok, detail=""):
    RESULTS.append((item, ok, detail))
    print(("PASS " if ok else "FAIL ") + item + (("  -- " + detail) if detail else ""), flush=True)


def check(item, cond, detail=""):
    record(item, bool(cond), detail)
    return bool(cond)


# ----------------------------------------------------------------------------
# (a) affine identity 2^{A_j} U^j n = 3^j n + C_j, 2000 odd seeds, depth 25
# ----------------------------------------------------------------------------

def test_a():
    rng = random.Random(20260816)
    bad = 0
    for _ in range(2000):
        n = 2 * rng.randrange(1, 10 ** 12) + 1
        w = word(n, 25)
        Ap = A_partial(w)
        Cp = C_partial(w)
        m = n
        for j in range(1, 26):
            m, _ = U(m)
            if (1 << Ap[j]) * m != 3 ** j * n + Cp[j]:
                bad += 1
                break
    check("(a) affine identity 2^{A_j} U^j n = 3^j n + C_j, 2000 seeds x depth 25", bad == 0,
          "%d failures" % bad)


# ----------------------------------------------------------------------------
# (b) r55 Prop 1
# ----------------------------------------------------------------------------

def test_b():
    from itertools import product
    rng = random.Random(55)
    words = [w for w in product((1, 2, 3), repeat=3)]
    words += [tuple(rng.choice((1, 2, 3)) for _ in range(6)) for _ in range(60)]
    bad = []
    for w in words:
        j = len(w)
        A = A_total(w)
        r, M = realizer_class(w)
        Ap = A_partial(w)
        # formula
        if M != 1 << (A + 1) or (3 ** j * r - ((1 << A) - C_carry(w))) % M != 0:
            bad.append((w, "formula"))
            continue
        # realization set: exactly the class r mod M among odd n in [1, 4M)
        for n in range(1, 4 * M, 2):
            if realizes(n, w) != ((n - r) % M == 0):
                bad.append((w, "realization set", n))
                break
        # ray formula U^k(n) = y_k + t 3^k 2^{A_j+1-A_k}
        y = U_orbit(r, j)
        for t in (0, 1, 3, 7):
            n = r + t * M
            orb = U_orbit(n, j)
            for k in range(j + 1):
                if orb[k] != y[k] + t * 3 ** k * (1 << (A + 1 - Ap[k])):
                    bad.append((w, "ray", t, k))
                    break
    check("(b) r55 Prop 1: r(w) formula, realization set, ray U^k(n)=y_k+t 3^k 2^{A_j+1-A_k} "
          "(27 length-3 + 60 length-6 words, t in {0,1,3,7})", not bad, str(bad[:3]))
    # closed-form witness r(1^j) = 2^{j+1}-1, U^k = 3^k 2^{j+1-k} - 1
    ok = all(least_rep((1,) * j) == (1 << (j + 1)) - 1 and
             all(U_iter((1 << (j + 1)) - 1, k) == 3 ** k * (1 << (j + 1 - k)) - 1 for k in range(j + 1))
             for j in range(1, 16))
    check("(b') r55: r(1^j) = 2^{j+1}-1, U^k = 3^k 2^{j+1-k} - 1, j <= 15", ok)


# ----------------------------------------------------------------------------
# (c) r50 Prop 4 on all 81 length-4 words over {1,2,3}
# ----------------------------------------------------------------------------

def test_c():
    from itertools import product
    bad = []
    for w in product((1, 2, 3), repeat=4):
        j, A, C = 4, A_total(w), C_carry(w)
        try:
            r2, r3 = canonical_pair(w)     # asserts positivity, oddness, < 2^{A+1}, realizes, endpoint
        except AssertionError as e:
            bad.append((w, "canonical_pair", str(e)))
            continue
        if not (1 <= r3 < 2 * 3 ** j and r3 % 2 == 1 and ((1 << A) * r3 - C) % 3 ** j == 0):
            bad.append((w, "r3 range/congruence"))
            continue
        # all positive realizations are r2 + t 2^{A+1} <-> r3 + t 2 3^j
        M = 1 << (A + 1)
        for n in range(1, 6 * M, 2):
            is_real = realizes(n, w)
            in_class = (n - r2) % M == 0
            if is_real != in_class:
                bad.append((w, "realizations", n))
                break
            if in_class:
                t = (n - r2) // M
                if U_iter(n, j) != r3 + t * 2 * 3 ** j:
                    bad.append((w, "endpoint shift", n))
                    break
    check("(c) r50 Prop 4 on all 81 length-4 words: r2 positive odd < 2^{A+1}, realizes w, endpoint r3, "
          "r2 + t 2^{A+1} <-> r3 + t 2 3^k", not bad, str(bad[:3]))


# ----------------------------------------------------------------------------
# (d) r71 family F-D, L = 1..6
# ----------------------------------------------------------------------------

def test_d():
    ok = True
    det = []
    mem = list(family_D(6, 1, full_orbit=True))   # generator asserts q_L odd, n_j odd, T(n_j)=n_{j+1}, T(n_L)=2^{3^L}
    for d in mem:
        L = d["L"]
        # independent re-derivation
        q = d["q_L"]
        if not (q % 2 == 1 and q * 3 ** (L + 1) == (1 << 3 ** L) + 1):
            ok = False
        if not all(x % 2 == 1 for x in d["n_j"]):
            ok = False
        if not all(T(d["n_j"][j]) == d["n_j"][j + 1] for j in range(L)):
            ok = False
        if T(d["n_j"][L]) != 1 << 3 ** L:
            ok = False
        # seed terminates
        if tau(d["n"], cap=10 ** 6) is None:
            ok = False
        det.append((L, d["n_j"][0], d["n_j"][-1]))
    m0 = mem[0]["n_j"] + [mem[0]["top"]]
    m1 = mem[1]["n_j"] + [mem[1]["top"]]
    check("(d) r71 F-D L=1..6: q_L odd integer, n_j odd, T(n_j)=n_{j+1}, T(n_L)=2^{3^L}, seeds terminate",
          ok, "first two members %s and %s" % (m0, m1))
    check("(d') first members are 3->5->8 and 151->227->341->512",
          m0 == [3, 5, 8] and m1 == [151, 227, 341, 512])


# ----------------------------------------------------------------------------
# (e) r69 chains and J(2^L - 1) = 3^L - 1
# ----------------------------------------------------------------------------

def test_e():
    ok = True
    for L in range(2, 40):
        NL = 2 * 3 ** (L - 1) - 1
        xs = [3 ** j * (1 << (L - j)) - 1 for j in range(L + 1)]
        for j in range(L):
            if T(xs[j]) != xs[j + 1] or not xs[j + 1] > xs[j]:
                ok = False
        if not (xs[L - 1] == NL and xs[L] == 3 ** L - 1 > NL):
            ok = False
    check("(e) r69 Thm 2: N_L = 2 3^{L-1}-1, x_j = 3^j 2^{L-j}-1, T(x_j)=x_{j+1}, increasing, "
          "x_{L-1} = N_L, x_L = 3^L-1 > N_L, L=2..39", ok)
    check("(e') r69 s7: J(2^L-1) = 3^L-1 for L=1..39",
          all(J((1 << L) - 1) == 3 ** L - 1 for L in range(1, 40)))
    # r69 worked example 31 -> 47 -> 71 -> 107 -> 161 -> 242 and T(x)+1 <= 3/2 (x+1) with equality iff odd
    ex = T_orbit(31, 5) == [31, 47, 71, 107, 161, 242]
    eq = all((2 * (T(x) + 1) == 3 * (x + 1)) == (x % 2 == 1) and 2 * (T(x) + 1) <= 3 * (x + 1)
             for x in range(1, 200001))
    check("(e'') r69: 31->47->71->107->161->242; T(x)+1 <= (3/2)(x+1) with equality iff x odd, x<=200000",
          ex and eq)


# ----------------------------------------------------------------------------
# (f) r51 Lemma 2 with A = C = 2
# ----------------------------------------------------------------------------

def test_f():
    ok = True
    det = []
    for k in (5, 9, 13, 17, 21, 25):
        P = ((1 << 2) * ((1 << k) - 1) - 1) // 3
        N = (3 ** (k + 1) - 1) >> 3
        w = word(P, k + 2)
        target = (2,) + (1,) * (k - 1) + (2, 2)
        if w != target or U_iter(P, k + 2) != N:
            ok = False
        det.append((k, P, N))
    check("(f) r51 Lemma 2, A=C=2: U-word of P is exactly (2,1^{k-1},2,2) and N = U^{k+2}(P), "
          "k in {5,9,13,17,21,25}", ok, "k=5: P=%d N=%d" % (det[0][1], det[0][2]))
    k = 145
    P = (4 * ((1 << k) - 1) - 1) // 3
    N = (3 ** (k + 1) - 1) >> 3
    w = word(P, k + 2)
    agree = (P - N) % 64 == 0 and (P - N) % 27 == 0
    check("(f') r51: at k=145, P = N mod 2^6 and mod 3^3, and the word is still (2,1^144,2,2)",
          agree and w == (2,) + (1,) * 144 + (2, 2),
          "v2(P-N)=%d v3(P-N)=%d" % (v2(P - N), _v3(P - N)))
    # RESULTS.md (r51 digest) lists k = 145, 1009, 1873, 2737, 3601, 4465, 5329 (period 864) as
    # "simultaneous deep agreement" and says "at k = 145, P = N mod 2^6 and mod 3^3".  Exact check:
    ks_64_27 = [kk for kk in range(5, 11000, 2) if _agree(kk, 6, 3)]
    ks_16_27 = [kk for kk in range(5, 5400, 2) if _agree(kk, 4, 3)]
    check("(f'') r51 DISCREPANCY CHECK: the RESULTS list 145,1009,...,5329 (period 864) is the set with "
          "P = N mod 2^4 and 3^3; the mod-2^6-and-3^3 agreement has period 3456: k = 145, 3601, 7057, 10513",
          ks_16_27 == [145, 1009, 1873, 2737, 3601, 4465, 5329] and ks_64_27 == [145, 3601, 7057, 10513],
          "mod(2^4,3^3): %s ; mod(2^6,3^3): %s" % (ks_16_27, ks_64_27))


def _v3(n):
    v = 0
    while n % 3 == 0:
        n //= 3
        v += 1
    return v


def _agree(k, B=6, R=3):
    P = (4 * ((1 << k) - 1) - 1) // 3
    N = (3 ** (k + 1) - 1) >> 3
    return (P - N) % (1 << B) == 0 and (P - N) % 3 ** R == 0


# ----------------------------------------------------------------------------
# (g) r63: rescue counts vs brute force (k <= 14); live words per k; #B_k exact vs bound
# ----------------------------------------------------------------------------

def dfs_first_crossings(K):
    """Walk every coefficient-nondescending parity prefix to depth K.  Returns
    (noncross[j] = #length-j non-crossing words, fc_words[j] = list of (word_bits, s, c)
    first-crossing at depth j, rescued = list of (j, word, n, y))."""
    pow2 = [1 << i for i in range(K + 2)]
    pow3 = [3 ** i for i in range(K + 2)]
    noncross = [0] * (K + 1)
    fc_count = [0] * (K + 1)
    rescued = []
    # state: (j, s, c, bits) bits = integer with bit i = eps_i
    stack = [(0, 0, 0, 0)]
    while stack:
        j, s, c, bits = stack.pop()
        noncross[j] += 1
        if j == K:
            continue
        j1 = j + 1
        # odd child always non-crossing
        stack.append((j1, s + 1, 3 * c + pow2[j], bits | pow2[j]))
        # even child
        if pow3[s] >= pow2[j1]:
            stack.append((j1, s, c, bits))
        else:
            fc_count[j1] += 1
            d = pow2[j1] - pow3[s]
            y = 0
            while 2 * y < s:
                num = c - pow2[j1] * y
                if num > 0 and num % d == 0:
                    rescued.append((j1, bits, num // d, y))
                y += 1
    return noncross, fc_count, rescued


def test_g(K=30):
    t0 = time.time()
    # --- rescue counts vs brute force for k <= 14
    words14 = []
    for k in range(1, 15):
        # enumerate all first-crossing words of length k directly
        for eps in _all_words_first_crossing(k):
            words14.append(eps)
    from collections import Counter
    perk = Counter(len(w) for w in words14)
    formula = {}
    for eps in words14:
        formula[eps] = sorted(n for n, y in rescue_seeds(eps))
    # brute force: every n < 2^16, follow to its first crossing (depth <= 14) and test T^k n >= n
    brute = {}
    NMAX = 1 << 16
    for n in range(1, NMAX):
        m = n
        s = 0
        eps = []
        for j in range(1, 15):
            e = m & 1
            eps.append(e)
            m = (3 * m + 1) >> 1 if e else m >> 1
            s += e
            if 3 ** s < (1 << j):
                if m >= n:
                    brute.setdefault(tuple(eps), []).append(n)
                break
    ok = all(formula[w] == sorted(brute.get(w, [])) for w in words14) and set(brute) <= set(formula)
    live = {w: formula[w] for w in words14 if formula[w]}
    check("(g) r63 eq (45): rescue count m(w) = brute-force seed count for all %d first-crossing words k<=14 "
          "(%d excluding the k=1 even word)" % (len(words14), len(words14) - 1), ok,
          "per k: %s; live words: %s" % (dict(sorted(perk.items())), live))
    check("(g') the only live first crossing for k<=14 is the trivial (1,0) with seed 1 (y=0, exact return)",
          live == {(1, 0): [1]})
    # --- DFS to depth K: non-crossing counts (checked against lattice DP), rescued seeds, #B_k exact
    noncross, fc_count, rescued = dfs_first_crossings(K)
    dp = _dp_counts(K)
    check("(g'') DFS non-crossing counts agree with the lattice-path DP for all k<=%d" % K,
          noncross[1:] == dp[1:], "k=30: %d" % noncross[K])
    live_by_k = {}
    for j, bits, n, y in rescued:
        live_by_k.setdefault(j, []).append((n, y))
    check("(g3) live first-crossing words up to depth %d: only the trivial one (k=2, seed 1)" % K,
          live_by_k == {2: [(1, 0)]}, "first-crossing words per k: %s; total %d" %
          (fc_count[1:], sum(fc_count)))
    # exact #B_k = noncross[k] + rescued seeds n < 2^k with T^i n >= n for j < i <= k
    Bk = []
    for k in range(1, K + 1):
        extra = 0
        for j, bits, n, y in rescued:
            if j <= k and n < (1 << k):
                m = T_iter(n, j)
                good = True
                for i in range(j + 1, k + 1):
                    m = T(m)
                    if m < n:
                        good = False
                        break
                if good:
                    extra += 1
        Bk.append(noncross[k] + extra)
    # brute-force #B_k for k <= 18
    bf = []
    for k in range(1, 19):
        cnt = 0
        for n in range(1, 1 << k):
            m = n
            good = True
            for _ in range(k):
                m = T(m)
                if m < n:
                    good = False
                    break
            cnt += good
        bf.append(cnt)
    check("(g4) exact #B_k (DFS + rescued seeds) equals brute force over all n < 2^k for k<=18",
          bf == Bk[:18], "#B_k k=1..18: %s" % bf)
    rho_up = Fraction(9659065533, 10 ** 10)   # > rho_bulk = 0.96590655323343...
    ok = all(Fraction(Bk[k - 1], 1 << k) <= rho_up ** k for k in range(1, K + 1))
    worst = max((Fraction(Bk[k - 1], 1 << k) / rho_up ** k for k in range(1, K + 1)))
    check("(g5) 2^{-k} #B_k <= (0.9659065533)^k for k<=%d (rational upper bound of rho_bulk)" % K, ok,
          "max ratio = %.6f; #B_30 = %d" % (float(worst), Bk[K - 1]))
    print("   (g) time %.1fs" % (time.time() - t0))


def _all_words_first_crossing(k):
    from itertools import product
    for eps in product((0, 1), repeat=k):
        if is_first_crossing(eps):
            yield eps


def _dp_counts(K):
    from collections import defaultdict
    cur = {0: 1}
    out = [1]
    for j in range(1, K + 1):
        nxt = defaultdict(int)
        for s, c in cur.items():
            for e in (0, 1):
                s2 = s + e
                if 3 ** s2 >= (1 << j):
                    nxt[s2] += c
        cur = nxt
        out.append(sum(cur.values()))
    return out


# ----------------------------------------------------------------------------
# (h) r58
# ----------------------------------------------------------------------------

def test_h():
    from sympy import isprime
    from math import gcd
    w = (1,) * 12 + (9,)
    D = (1 << 21) - 3 ** 13
    C = C_carry(w)
    x = cycle_point(w)
    ws, orb = word_rational(x, 13)
    ok = (D == 502829 and isprime(D) and C == 3 ** 13 - 2 ** 13 == 1586131 and gcd(C, D) == 1
          and x == Fraction(C, D) and ws == w and orb[-1] == x and min(orb) > 3)
    check("(h) r58: w=(1^12,9): D=2^21-3^13=502829 prime, C=3^13-2^13=1586131, gcd=1, rational cycle "
          "closes with the exact valuation word, all 13 points > 3", ok,
          "x = %s, min = %s" % (x, min(orb)))
    w2 = (1, 1, 3)
    ws2, orb2 = word_rational(cycle_point(w2), 3)
    check("(h') r58: (1,1,3) gives 19/5 -> 31/5 -> 49/5 -> 19/5",
          ws2 == w2 and orb2 == [Fraction(19, 5), Fraction(31, 5), Fraction(49, 5), Fraction(19, 5)])
    # rigidity identity q r_m = p mod 2^{mA} for w2 = (1,1,3), m = 1..4
    p, q = 19, 5
    ok = all((q * least_rep(w2 * m) - p) % (1 << (m * 5)) == 0 for m in range(1, 5))
    check("(h'') r58 rigidity q r_m = p mod 2^{mA} for (1,1,3)^m, m<=4", ok)


# ----------------------------------------------------------------------------
# (i) r43 and r60 collisions
# ----------------------------------------------------------------------------

def test_i():
    ok = (len(R43_W1) == len(R43_W2) == 22 and A_total(R43_W1) == A_total(R43_W2) == 34
          and is_barrier_word(R43_W1) and is_barrier_word(R43_W2)
          and C_carry(R43_W2) - C_carry(R43_W1) == 4 * 3 ** 22 == 125524238436)
    n1, n2 = least_rep(R43_W1), least_rep(R43_W2)
    same_end = endpoint_class(R43_W1) == endpoint_class(R43_W2)
    check("(i) r43: w1,w2 length 22, total 34, strict barrier 2^{A_t}<3^t, C_{w2}-C_{w1} = 4 3^22 = 125524238436, "
          "identical endpoint class mod 3^22", ok and same_end,
          "least realizers %d, %d" % (n1, n2))
    # common endpoint seeds 22528613375 / 22528613371 with n2 = n1 - 4
    e = U_iter(22528613375, 22)
    check("(i') r43: seeds 22528613375 (w1) and 22528613371 (w2) share the endpoint, n2 = n1 - 4",
          realizes(22528613375, R43_W1) and realizes(22528613371, R43_W2) and U_iter(22528613371, 22) == e,
          "common endpoint %d" % e)
    ok = (len(R60_W1) == len(R60_W2) == 19 and is_barrier_word(R60_W1) and is_barrier_word(R60_W2)
          and B_word(R60_W1) == 1183691739 and B_word(R60_W2) == 5832737607
          and B_word(R60_W2) - B_word(R60_W1) == 4 * 3 ** 19
          and B_word(R60_W1) % 3 ** 19 == B_word(R60_W2) % 3 ** 19 == 21430272)
    check("(i'') r60: w1=(1^15,2,3,1,3), w2 length 19, barrier A_k <= floor(k log2 3), B(w1)=1183691739, "
          "B(w2)=5832737607, difference 4 3^19, both = 21430272 mod 3^19 (B = C + 2^A)", ok)
    check("(i3) r60: 1^r is exactly 1-terminal (B = 3^r) for r <= 24, and no other barrier word of length <= 14 is",
          all(B_word((1,) * r) == 3 ** r for r in range(1, 25)))


# ----------------------------------------------------------------------------
# (j) r67
# ----------------------------------------------------------------------------

def _tau_table(N):
    """tau(n) for 1 <= n <= N by memoised iteration (exact)."""
    tau_t = {1: 0, 2: 0}          # distance to A; tau(1) = tau(2) = 1 is set at the end
    for n in range(3, N + 1):
        if n in tau_t:
            continue
        path = []
        m = n
        while m not in tau_t:
            path.append(m)
            m = T(m)
        t = tau_t[m]
        for x in reversed(path):
            t += 1
            tau_t[x] = t
    tau_t[1] = tau_t[2] = 1
    assert all(tau_t[n] == tau(n) for n in range(1, min(N, 3000) + 1))
    return tau_t


def test_j():
    N = 100000
    tt = _tau_table(2 * N)
    q = Fraction(1, 3)
    pi = lambda n: q ** tt[n]
    bad = [m for m in range(3, N + 1) if P_operator(pi, m) > pi(m)]
    check("(j) r67 Thm 9.1: pi = (1/3)^tau satisfies P pi <= pi on 3 <= m <= 100000 exactly in rationals",
          not bad, "first violations %s" % bad[:5])
    # tightest ratio
    worst = max(P_operator(pi, m) / pi(m) for m in range(3, 20001))
    check("(j') (P pi)(m)/pi(m) <= 2q = 2/3 on m <= 20000", worst <= Fraction(2, 3), "max ratio %s" % worst)
    M = 300000
    tt = _tau_table(M)
    from collections import Counter
    cnt = Counter(tt[n] for n in range(1, M))
    ok = all(c <= (1 << (r + 1)) for r, c in cnt.items())
    ratio = max(Fraction(c, 1 << (r + 1)) for r, c in cnt.items())
    check("(j'') r67: #{n < 300000 : tau(n) = r} <= 2^{r+1} for every r", ok,
          "max ratio %s (~%.3f), max tau %d" % (ratio, float(ratio), max(cnt)))


# ----------------------------------------------------------------------------
# (k) r70 s8 and r68 Prop 3
# ----------------------------------------------------------------------------

def test_k():
    # r70: minimal exceptional n must be odd; n = 1 mod 4 -> (3n+1)/4 < n integer with T^2(n) = (3n+1)/4;
    # n = 2 mod 3 -> m = (2n-1)/3 odd, < n, T(m) = n.  Surviving residues mod 12: {3, 7}.
    ok1 = all(T_iter(n, 2) == (3 * n + 1) // 4 and (3 * n + 1) % 4 == 0 and (3 * n + 1) // 4 < n
              for n in range(5, 100001, 4))
    ok2 = True
    for n in range(5, 100001, 2):
        if n % 3 == 2:
            m = (2 * n - 1) // 3
            if not (m % 2 == 1 and m < n and T(m) == n and (2 * n - 1) % 3 == 0):
                ok2 = False
                break
    surv = sorted(set(n % 12 for n in range(1, 10 ** 5) if n % 2 == 1 and n % 4 != 1 and n % 3 != 2))
    check("(k) r70 s8: three descent steps (even -> n/2; n=1 mod 4 -> (3n+1)/4 < n; n=2 mod 3 -> odd (2n-1)/3 < n "
          "maps to n) verified n<=100000; surviving residues mod 12 = {3,7}", ok1 and ok2 and surv == [3, 7],
          "residues %s" % surv)
    # r68 Prop 3: cycle max K > 2 is even, its predecessor is odd a = (2K-1)/3, and a's predecessor is
    # forced to be (2a-1)/3 (since 2a > K), so a = 2 mod 3 <=> K = 8 mod 9; with evenness <=> K = 8 mod 18.
    ok = True
    for K in range(3, 100001):
        cond = (K % 2 == 0 and K % 3 == 2 and ((2 * K - 1) // 3) % 3 == 2)
        if cond != (K % 18 == 8):
            ok = False
            break
    ok_odd = all(T(K) > K for K in range(3, 100001, 2))
    ok_pred = all(2 * ((2 * K - 1) // 3) > K for K in range(3, 100001) if K % 3 == 2)
    check("(k') r68 Prop 3: [K even, K=2 mod 3, (2K-1)/3 = 2 mod 3] <=> K = 8 mod 18 on 3<=K<=100000; "
          "T(odd K)>K; 2a > K for a=(2K-1)/3", ok and ok_odd and ok_pred)


# ----------------------------------------------------------------------------
# coordinator additions: 47 -> 61 segment; Delta / h on 1-terminal barrier words
# ----------------------------------------------------------------------------

def test_extra():
    d = list(family_K())[0]
    check("(x1) F-K: 47 -> 61 is a proper-barrier U-segment of length 33 (A=52), barrier breaks at 34, "
          "h = 13, gain U^33(47) - 47 = 14; not 1-terminal (r60 Delta = B/3^r - 1 non-integer)",
          d["end"] == 61 and d["h"] == 13 and d["Delta_gain"] == 14 and not d["one_terminal"],
          "r60 Delta = %s" % d["Delta_r60"])
    tot = 0
    term = []
    for r in range(1, 15):
        for w in barrier_words(r):
            tot += 1
            D, h, one = terminal_delta(w)
            if one:
                term.append((w, D, h))
    nontriv = [(w, D, h) for w, D, h in term if any(a > 1 for a in w)]
    ok_ineq = all(0 < D < h for w, D, h in nontriv)
    check("(x2) 1-terminal barrier words of length <= 14 (%d barrier words scanned): only 1^r "
          "(Delta = 0 = h); 0 < Delta < h holds on every NONTRIVIAL one (vacuously: there are %d)"
          % (tot, len(nontriv)),
          ok_ineq and all(w == (1,) * len(w) for w, D, h in term) and len(term) == 14,
          "1-terminal: %s" % [(len(w), D, h) for w, D, h in term][:3])
    # battery self-consistency: every family generates without assertion errors
    n = sum(1 for _ in all_families())
    check("(x3) battery generates all members without assertion failure", n >= 350, "%d members" % n)
    # sanity: log-height V(n) = n fails on F-A (must), pi = 1/n^2 fails P pi <= pi
    r1 = run_battery(lambda n: n, "potential")
    r2 = run_battery(lambda n: Fraction(1, n * n), "pi")
    check("(x4) run_battery rejects V(n)=n (potential) and pi=1/n^2 (P pi <= pi) as expected",
          (not r1["ok"]) and (not r2["ok"]),
          "failures per family: %s" % {k: v[1] for k, v in r1["per_family"].items()})


TESTS = {"a": test_a, "b": test_b, "c": test_c, "d": test_d, "e": test_e, "f": test_f,
         "g": test_g, "h": test_h, "i": test_i, "j": test_j, "k": test_k, "x": test_extra}

if __name__ == "__main__":
    which = sys.argv[1:] or list(TESTS)
    t0 = time.time()
    for w in which:
        TESTS[w]()
    npass = sum(1 for _, ok, _ in RESULTS if ok)
    print("\n%d/%d PASS  (%.1fs)" % (npass, len(RESULTS), time.time() - t0))
    if npass != len(RESULTS):
        print("FAILED:", [i for i, ok, _ in RESULTS if not ok])
        sys.exit(1)
