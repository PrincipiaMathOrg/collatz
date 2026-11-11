"""
battery.py -- the standing countermodel battery of SKILL s3 (families F-A .. F-J),
exact integers only.  Every candidate potential / rank / weight is evaluated on
these families BEFORE anyone reasons about it (SKILL s3, r64 s6, r69, r71 s5.2).

Each family_X(...) function is a generator of dicts with explicit integers/words
and the round-stated properties (asserted at generation time, so importing agents
get verified objects).  run_battery(candidate, kind) evaluates a candidate on all
families and reports where it fails to strictly decrease / stay admissible.

Families (SKILL s3):
  F-A  n = 2^m - 1                     (T^j = 3^j 2^{m-j} - 1, all odd for m steps)
  F-B  N_m = 2^{m+1} - 2               (even predecessors of F-A, r64 s6)
  F-C  x_j = 3^j 2^{L-j} - 1 chain ending at N_L = 2 3^{L-1} - 1  (r69 Thm 2)
  F-D  n_j = 3^j 2^{L-j} u_L - 1, u_L = 2(2^{3^L}+1)/3^{L+1}, T(n_L) = 2^{3^L} (r71 s5.2)
  F-E  (1,2)^inf ray to -5, R_{2m} = 2^{3m+1} - 5 (r41,r60,r61); -5 -> -7 -> -10 cycle (r57)
  F-F  shadow blocks (A,1^{k-1},2,C), P = (2^A(2^k-1)-1)/3, N = (3^{k+1}-1)/2^{C+1} (r51 L2)
  F-G  barrier words u = (1,1,2), v = (1,2,1) and concatenations (r54)
  F-H  rational pseudo-cycles (1^12,9) -> 1586131/502829, (1,1,3) -> 19/5 (r58)
  F-I  3-adic collisions of barrier words at depth 22 (r43) and 19 (r60)
  F-J  3x-1 control 5 -> 7 -> 5 word (1,2); shortcut 5x+1 cycle 13 -> ... -> 13 (r44, r50)
"""

from fractions import Fraction

from collatz_core import (
    T, T_iter, T_orbit, U, U_iter, U_orbit, T_gen, U_gen, word_gen,
    word, A_total, C_carry, B_word, least_rep, realizes, prefix_coefficients_ok,
    is_barrier_word, parity_word, shortcut_affine, cycle_point, word_rational,
    P_operator, v2, terminal_delta, is_one_terminal, h_count,
)

__all__ = [
    "family_A", "family_B", "family_C", "family_D", "family_E", "family_F",
    "family_G", "family_H", "family_I", "family_J", "family_K", "all_families",
    "run_battery", "R43_W1", "R43_W2", "R60_W1", "R60_W2", "SEG_47_61_WORD",
]


# ----------------------------------------------------------------------------
# F-A  n = 2^m - 1
# ----------------------------------------------------------------------------

def family_A(m_max=64, m_min=2):
    """F-A: n = 2^m - 1.  T^j(n) = 3^j 2^{m-j} - 1 for 0 <= j <= m (all odd for
    j < m), U-word 1^{m-1} then a valuation >= 2; r55: r(1^j) = 2^{j+1} - 1.
    Yields dict(m, n, segment=[T^0..T^m], word).  Killed r15,23,29,47,48,51,55,56,58."""
    for m in range(m_min, m_max + 1):
        n = (1 << m) - 1
        seg = T_orbit(n, m)
        for j in range(m + 1):
            assert seg[j] == 3 ** j * (1 << (m - j)) - 1
        assert all(x % 2 == 1 for x in seg[:m]) and seg[m] % 2 == 0
        assert least_rep((1,) * (m - 1)) == n
        yield {"family": "F-A", "m": m, "n": n, "segment": seg,
               "word": (1,) * (m - 1), "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-B  N_m = 2^{m+1} - 2
# ----------------------------------------------------------------------------

def family_B(m_max=64, m_min=2):
    """F-B: N_m = 2^{m+1} - 2, T(N_m) = 2^m - 1 (r64 s6): the even predecessor of
    F-A defeats every penalty on the -1 shadow.  segment = [N_m, 2^m-1, ..., 3^m-1]."""
    for m in range(m_min, m_max + 1):
        N = (1 << (m + 1)) - 2
        seg = T_orbit(N, m + 1)
        assert seg[1] == (1 << m) - 1 and seg[-1] == 3 ** m - 1
        yield {"family": "F-B", "m": m, "n": N, "segment": seg, "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-C  3^j 2^{L-j} - 1 chains ending at N_L = 2 3^{L-1} - 1  (r69 Thm 2)
# ----------------------------------------------------------------------------

def family_C(L_max=40, L_min=2):
    """F-C (r69 Thm 2): N_L = 2 3^{L-1} - 1; x_j = 3^j 2^{L-j} - 1 satisfies
    T(x_j) = x_{j+1}, x_{j+1} - x_j = 3^j 2^{L-j-1} > 0, x_{L-1} = N_L, x_L = 3^L - 1 > N_L.
    The whole chain lies above every truncation at N_L: no N-independent nilpotency."""
    for L in range(L_min, L_max + 1):
        NL = 2 * 3 ** (L - 1) - 1
        xs = [3 ** j * (1 << (L - j)) - 1 for j in range(L + 1)]
        for j in range(L):
            assert T(xs[j]) == xs[j + 1]
            assert xs[j + 1] - xs[j] == 3 ** j * (1 << (L - j - 1)) > 0
        assert xs[L - 1] == NL and xs[L] == 3 ** L - 1 > NL
        yield {"family": "F-C", "L": L, "N_L": NL, "n": xs[0], "segment": xs, "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-D  the r71 terminating family
# ----------------------------------------------------------------------------

def family_D(L_max=6, L_min=1, full_orbit=True):
    """F-D (r71 s5.2): q_L = (2^{3^L}+1)/3^{L+1} is an odd integer (LTE: v3(2^{3^L}+1) = L+1),
    u_L = 2 q_L, n_j = 3^j 2^{L-j} u_L - 1 (j = 0..L) all odd, T(n_j) = n_{j+1},
    T(n_L) = 2^{3^L}, then the orbit halves to 1: long, high, all-odd, PROVABLY TERMINATING.
    First members: 3 -> 5 -> 8 (L=1) and 151 -> 227 -> 341 -> 512 (L=2).
    segment = [n_0, ..., n_L, 2^{3^L}] (+ the halving tail to 1 if full_orbit)."""
    for L in range(L_min, L_max + 1):
        e = 3 ** L
        num = (1 << e) + 1
        assert num % 3 ** (L + 1) == 0
        q = num // 3 ** (L + 1)
        assert q % 2 == 1
        u = 2 * q
        ns = [3 ** j * (1 << (L - j)) * u - 1 for j in range(L + 1)]
        assert all(x % 2 == 1 for x in ns)
        for j in range(L):
            assert T(ns[j]) == ns[j + 1]
        top = 1 << e
        assert T(ns[L]) == top
        seg = ns + [top]
        if full_orbit:
            seg = seg + [1 << (e - i) for i in range(1, e + 1)]
            assert seg[-1] == 1
        yield {"family": "F-D", "L": L, "q_L": q, "u_L": u, "n": ns[0], "n_j": ns,
               "top": top, "segment": seg, "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-E  the (1,2)^inf ray to -5 and the -5 -> -7 -> -10 cycle
# ----------------------------------------------------------------------------

def family_E(m_max=40):
    """F-E: words (1,2)^m with least realizer R_{2m} = 2^{3m+1} - 5 (r41, r60, r61):
    strictly critical, 2-adic limit -5 whose U-word is (1,2)^inf and whose shortcut
    orbit is the cycle -5 -> -7 -> -10 -> -5 with parity word (1,1,0)^inf and prefix
    coefficients 3^{s_k}/2^k >= 1 for every k (r57).  Yields one dict per m plus a
    final dict for the negative cycle."""
    for m in range(1, m_max + 1):
        w = (1, 2) * m
        R = least_rep(w)
        assert R == (1 << (3 * m + 1)) - 5, (m, R)
        assert realizes(R, w)
        assert prefix_coefficients_ok(w)
        yield {"family": "F-E", "m": m, "word": w, "n": R,
               "segment": U_orbit(R, 2 * m), "kind": "U-orbit", "map": (3, 1)}
    cyc = T_orbit(-5, 3)
    assert cyc == [-5, -7, -10, -5]
    assert word(-5, 4) == (1, 2, 1, 2)
    eps = parity_word(-5, 3)
    assert eps == (1, 1, 0)
    for k in range(1, 3 * m_max + 1):
        s, c = shortcut_affine(parity_word(-5, k))
        assert 3 ** s >= (1 << k)
    yield {"family": "F-E", "cycle": cyc, "n": -5, "segment": cyc, "parity": (1, 1, 0),
           "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-F  r51 Lemma 2 shadow blocks
# ----------------------------------------------------------------------------

def shadow_block(A, k, C):
    """r51 Lemma 2 data: P = (2^A(2^k-1)-1)/3, N = (3^{k+1}-1)/2^{C+1}; for even A >= 2,
    C >= 2 and suitable odd k the U-word of P is exactly (A, 1^{k-1}, 2, C) and
    U^{k+2}(P) = N (the word has length k+2).  Returns (P, N, wordP, ok)."""
    P_num = (1 << A) * ((1 << k) - 1) - 1
    N_num = 3 ** (k + 1) - 1
    if P_num % 3 or N_num % (1 << (C + 1)):
        return None
    P = P_num // 3
    N = N_num >> (C + 1)
    if P % 2 == 0 or N % 2 == 0:
        return None
    target = (A,) + (1,) * (k - 1) + (2, C)
    wP = word(P, k + 2)
    ok = (wP == target) and (U_iter(P, k + 2) == N)
    return P, N, wP, ok


def family_F(A=2, C=2, k_list=(5, 9, 13, 17, 21, 25, 145)):
    """F-F (r51 Lemma 2, A = C = 2): for odd k in k_list the U-word of P is exactly
    (2, 1^{k-1}, 2, 2), N = U^{k+2}(P) is in the orbit, N/P ~ (9/2^{A+C+1})(3/2)^k, and
    (agreement) at k = 145: P = N mod 2^6 and mod 3^3.  Exact periods (test_core (f'')):
    P = N mod 2^4 and 3^3 for k = 145 mod 864 (the RESULTS.md list 145,1009,...);
    P = N mod 2^6 and 3^3 only for k = 145 mod 3456 (145, 3601, 7057, ...)."""
    for k in k_list:
        res = shadow_block(A, k, C)
        assert res is not None, k
        P, N, wP, ok = res
        assert ok, (k, wP[:3], wP[-3:])
        d = {"family": "F-F", "A": A, "C": C, "k": k, "P": P, "N": N, "n": P,
             "word": wP, "segment": U_orbit(P, k + 2), "kind": "U-orbit",
             "agree_2": v2(P - N), "map": (3, 1)}
        yield d


# ----------------------------------------------------------------------------
# F-G  r54 barrier words u = (1,1,2), v = (1,2,1)
# ----------------------------------------------------------------------------

R54_U = (1, 1, 2)
R54_V = (1, 2, 1)


def family_G(max_blocks=6):
    """F-G (r54): u = (1,1,2), v = (1,2,1): length 3, total 4, C_u = 19, C_v = 23,
    16 U^3(x) = 27x + 19 resp. 27x + 23, all prefix coefficients >= 1, so every
    concatenation is a barrier word (no short contractive returns).  Least realizers
    n = 7 (u), 27 (v), 743 (u^3).  Yields every concatenation of <= max_blocks blocks."""
    assert C_carry(R54_U) == 19 and C_carry(R54_V) == 23
    assert least_rep(R54_U) == 7 and least_rep(R54_V) == 27
    assert least_rep(R54_U * 3) == 743
    from itertools import product
    for nb in range(1, max_blocks + 1):
        for choice in product((R54_U, R54_V), repeat=nb):
            w = sum(choice, ())
            assert prefix_coefficients_ok(w)
            R = least_rep(w)
            assert realizes(R, w)
            orb = U_orbit(R, len(w))
            assert all(x > R for x in orb[1:])
            yield {"family": "F-G", "blocks": "".join("u" if c == R54_U else "v" for c in choice),
                   "word": w, "n": R, "segment": orb, "kind": "U-orbit", "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-H  r58 rational pseudo-cycles
# ----------------------------------------------------------------------------

def family_H():
    """F-H (r58): w = (1^12, 9): D = 2^21 - 3^13 = 502829 (prime), C = 3^13 - 2^13 = 1586131,
    gcd 1, x = C/D is an exact positive 13-step rational cycle with every point > 3,
    p-integral for every prime < 502829.  And (1,1,3): 19/5 -> 31/5 -> 49/5 -> 19/5."""
    w = (1,) * 12 + (9,)
    x = cycle_point(w)
    assert x == Fraction(1586131, 502829)
    ws, orb = word_rational(x, 13)
    assert ws == w and orb[-1] == x and min(orb) > 3
    yield {"family": "F-H", "word": w, "x": x, "orbit": orb, "D": 502829, "C": 1586131,
           "kind": "rational-cycle", "map": (3, 1)}
    w2 = (1, 1, 3)
    x2 = cycle_point(w2)
    assert x2 == Fraction(19, 5)
    ws2, orb2 = word_rational(x2, 3)
    assert ws2 == w2 and orb2 == [Fraction(19, 5), Fraction(31, 5), Fraction(49, 5), Fraction(19, 5)]
    yield {"family": "F-H", "word": w2, "x": x2, "orbit": orb2, "D": 5, "C": 19,
           "kind": "rational-cycle", "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-I  3-adic collisions of barrier words (r43 depth 22, r60 depth 19)
# ----------------------------------------------------------------------------

R43_W1 = (1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 3, 1, 1, 2, 1, 1, 5, 1, 3)
R43_W2 = (1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 3, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1)
R60_W1 = (1,) * 15 + (2, 3, 1, 3)
R60_W2 = (1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 3)


def family_I():
    """F-I: r43: w1, w2 of length 22, total valuation 34, both strict-barrier
    (2^{A_t} < 3^t for all t), C_{w2} - C_{w1} = 4 3^22 = 125524238436 -> identical
    endpoint syndrome mod 3^22, common-endpoint seeds 22528613375 / 22528613371 (n2 = n1 - 4).
    r60: w1 = (1^15,2,3,1,3), w2 = (1,2,1,2,1,2,1,2,1,2,2,2,1,1,2,2,1,1,3), length 19,
    barrier A_k <= floor(k log2 3), B(w1) = 1183691739, B(w2) = 5832737607,
    B(w2) - B(w1) = 4 3^19, both = 21430272 mod 3^19.  Unique 3-adic coding of barrier
    words is FALSE."""
    assert len(R43_W1) == len(R43_W2) == 22 and A_total(R43_W1) == A_total(R43_W2) == 34
    assert is_barrier_word(R43_W1) and is_barrier_word(R43_W2)
    assert C_carry(R43_W2) - C_carry(R43_W1) == 4 * 3 ** 22 == 125524238436
    yield {"family": "F-I", "round": 43, "w1": R43_W1, "w2": R43_W2,
           "n1": least_rep(R43_W1), "n2": least_rep(R43_W2),
           "segment": U_orbit(least_rep(R43_W1), 22), "n": least_rep(R43_W1),
           "kind": "U-orbit", "map": (3, 1)}
    assert len(R60_W1) == len(R60_W2) == 19
    assert is_barrier_word(R60_W1) and is_barrier_word(R60_W2)
    assert B_word(R60_W1) == 1183691739 and B_word(R60_W2) == 5832737607
    assert B_word(R60_W2) - B_word(R60_W1) == 4 * 3 ** 19
    assert B_word(R60_W1) % 3 ** 19 == B_word(R60_W2) % 3 ** 19 == 21430272
    yield {"family": "F-I", "round": 60, "w1": R60_W1, "w2": R60_W2,
           "n1": least_rep(R60_W1), "n2": least_rep(R60_W2),
           "segment": U_orbit(least_rep(R60_W1), 19), "n": least_rep(R60_W1),
           "kind": "U-orbit", "map": (3, 1)}


# ----------------------------------------------------------------------------
# F-J  sign / multiplier controls
# ----------------------------------------------------------------------------

def family_J():
    """F-J: 3x-1 control 5 -> 7 -> 5 (accelerated word (1,2)) and the shortcut 5x+1
    cycle 13 -> 33 -> 83 -> 208 -> 104 -> 52 -> 26 -> 13 (parity word 1110000,
    coefficient 5^3/2^7 < 1) (r44, r50).  Any argument insensitive to the sign of the
    affine term or to the multiplier 3 is wrong."""
    assert word_gen(5, 2, 3, -1) == (1, 2) and U_gen(7, 3, -1)[0] == 5
    orb = [5]
    for _ in range(3):
        orb.append(T_gen(orb[-1], 3, -1))
    assert orb == [5, 7, 10, 5]
    yield {"family": "F-J", "control": "3x-1", "map": (3, -1), "n": 5, "segment": orb,
           "word": (1, 2)}
    orb5 = [13]
    for _ in range(7):
        orb5.append(T_gen(orb5[-1], 5, 1))
    assert orb5 == [13, 33, 83, 208, 104, 52, 26, 13]
    assert tuple(x & 1 for x in orb5[:7]) == (1, 1, 1, 0, 0, 0, 0)
    yield {"family": "F-J", "control": "5x+1", "map": (5, 1), "n": 13, "segment": orb5,
           "parity": (1, 1, 1, 0, 0, 0, 0)}


# ----------------------------------------------------------------------------
# F-K  the ordinary Collatz proper-barrier segment 47 -> 61 (marked-carry paper)
# ----------------------------------------------------------------------------

SEG_47_61_WORD = (1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1,
                  3, 1, 1, 1, 4, 2, 2, 4)


def family_K():
    """F-K (Anton's marked-carry paper): the ordinary Collatz U-orbit segment
    47 -> 61 of length r = 33 (A = 52) is a PROPER barrier segment (2^{A_k} < 3^k for
    all k <= 33, and the barrier breaks at k = 34), with h = #{a_i > 1} = 13 and
    Delta = 14 = U^33(47) - 47 (the archimedean gain start -> end).  The word is not
    1-terminal (3^33 does not divide B(w)), so r60's Delta = B/3^r - 1 = 12388269702305648
    / 5559060566555523 is not an integer here; both are recorded."""
    n = 47
    w = word(n, 33)
    assert w == SEG_47_61_WORD and A_total(w) == 52 and is_barrier_word(w)
    assert not is_barrier_word(word(n, 34))
    seg = U_orbit(n, 33)
    assert seg[-1] == 61 and h_count(w) == 13 and seg[-1] - seg[0] == 14
    D, h, one_term = terminal_delta(w)
    assert not one_term
    yield {"family": "F-K", "n": 47, "end": 61, "word": w, "segment": seg, "kind": "U-orbit",
           "h": h, "Delta_gain": 14, "Delta_r60": D, "one_terminal": one_term, "map": (3, 1)}


def all_families(**kw):
    """Iterate over all battery members (dicts) with default sizes; kw forwards
    m_max / L_max / max_blocks to the individual families where meaningful."""
    yield from family_A(kw.get("m_max", 64))
    yield from family_B(kw.get("m_max", 64))
    yield from family_C(kw.get("L_max", 40))
    yield from family_D(kw.get("LD_max", 6))
    yield from family_E(kw.get("mE_max", 40))
    yield from family_F()
    yield from family_G(kw.get("max_blocks", 6))
    yield from family_H()
    yield from family_I()
    yield from family_J()
    yield from family_K()


# ----------------------------------------------------------------------------
# run_battery
# ----------------------------------------------------------------------------

def _val(candidate, x, ctx):
    try:
        return candidate(x, ctx)
    except TypeError:
        return candidate(x)


def run_battery(candidate, kind="potential", verbose=False, **kw):
    """Evaluate a candidate on every family.  `candidate` is a callable
    candidate(n) or candidate(n, ctx) (ctx = the family dict, so map-aware candidates
    can read ctx['map'] in (3,1), (3,-1), (5,1)); it must return an exactly
    comparable value (int / Fraction / tuple).  kind:
      'potential'  : V(T n) < V(n) at EVERY shortcut step of every integer segment
                     (a Lyapunov / descent potential);
      'block'      : V(last) < V(first) over each family segment (block potential);
      'rank'       : V strictly decreases across each ODD step (odd n -> next odd, C4);
      'pi'         : candidate(n) > 0 and (P pi)(m) <= pi(m) at every point m of every
                     segment (r67 Thm 9.1 subeigenvector, F1 form).
    Rational-cycle members (F-H) are evaluated only if the candidate accepts a Fraction.
    Control members (F-J) are informational: the candidate is evaluated along the
    control cycle and flagged 'SIGN-BLIND' if it strictly decreases at every step but
    the closing one (such a candidate cannot be using the arithmetic of 3x+1).
    Returns dict: {'ok': bool, 'failures': [...], 'per_family': {name: (n_ok, n_fail)},
    'notes': [...]}."""
    failures = []
    per = {}
    notes = []
    for mem in all_families(**kw):
        fam = mem["family"]
        okc, failc = per.get(fam, (0, 0))
        seg = mem.get("segment")
        if mem.get("kind") == "rational-cycle":
            seg = mem["orbit"]
        try:
            fail = None
            if fam == "F-J":
                vals = [_val(candidate, x, mem) for x in seg]
                dec = [vals[i + 1] < vals[i] for i in range(len(vals) - 2)]
                if kind in ("potential", "rank") and all(dec):
                    notes.append(("F-J", mem["control"], "SIGN-BLIND: decreases along the control cycle", vals))
                per[fam] = (okc + 1, failc)
                continue
            if kind == "pi":
                for x in seg:
                    if not isinstance(x, int) or x < 3:
                        continue
                    px = _val(candidate, x, mem)
                    if not px > 0:
                        fail = ("pi<=0", x, px)
                        break
                    Pp = P_operator(lambda y: _val(candidate, y, mem), x)
                    if Pp > px:
                        fail = ("P pi > pi", x, Pp, px)
                        break
            elif kind == "block":
                if seg is not None and len(seg) >= 2:
                    v0, v1 = _val(candidate, seg[0], mem), _val(candidate, seg[-1], mem)
                    if not v1 < v0:
                        fail = ("no block decrease", seg[0], seg[-1], v0, v1)
            elif kind == "potential":
                vals = [_val(candidate, x, mem) for x in seg]
                for i in range(len(vals) - 1):
                    if not vals[i + 1] < vals[i]:
                        fail = ("no step decrease", seg[i], seg[i + 1], vals[i], vals[i + 1])
                        break
            elif kind == "rank":
                odd = [x for x in seg if isinstance(x, int) and x % 2 == 1]
                if mem.get("kind") != "U-orbit":
                    # consecutive odd values of the shortcut segment
                    pass
                vals = [_val(candidate, x, mem) for x in odd]
                for i in range(len(vals) - 1):
                    if not vals[i + 1] < vals[i]:
                        fail = ("no odd-step decrease", odd[i], odd[i + 1], vals[i], vals[i + 1])
                        break
            else:
                raise ValueError("unknown kind " + str(kind))
        except TypeError as e:
            if mem.get("kind") == "rational-cycle":
                notes.append((fam, "candidate does not accept Fraction; skipped", str(e)))
                per[fam] = (okc, failc)
                continue
            raise
        if fail is None:
            per[fam] = (okc + 1, failc)
        else:
            per[fam] = (okc, failc + 1)
            failures.append({"family": fam, "member": {k: v for k, v in mem.items()
                                                       if k not in ("segment", "orbit", "n_j")},
                             "failure": fail})
            if verbose:
                print("FAIL", fam, fail)
    return {"ok": not failures, "failures": failures, "per_family": per, "notes": notes}


if __name__ == "__main__":
    # smoke test: log2-type potential must fail on F-A (it does), pi = 1/n must fail P pi <= pi
    n_members = 0
    for _ in all_families():
        n_members += 1
    print("battery members:", n_members)
    rep = run_battery(lambda n: n, "potential")
    print("V(n)=n potential ok?", rep["ok"], {k: v for k, v in rep["per_family"].items()})
    rep = run_battery(lambda n: Fraction(1, n * n), "pi")
    print("pi=1/n^2 ok?", rep["ok"], rep["per_family"])
