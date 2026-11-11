"""
collatz_core.py -- the ONLY implementation of the basic Collatz objects for the
certificate-search lab.  Exact integer / rational arithmetic only (Python int,
fractions.Fraction).  No floats anywhere in this module.

Notation (SKILL s0, fixed for the whole lab):
  T(n)   shortcut map: n/2 (n even), (3n+1)/2 (n odd).
  U(n)   accelerated Syracuse map on odd n: (3n+1)/2^{v2(3n+1)}.
  w = (a_1,...,a_j)  valuation word of the U-orbit, A_i = a_1+...+a_i, A_0 = 0.
  C_j = sum_{i<j} 3^{j-1-i} 2^{A_i}   (carry).  Affine identity
        2^{A_j} U^j(n) = 3^j n + C_j                          (r50 P4, r55, r60 s1)
  Realizers of w: exactly one odd class r(w) mod 2^{A_j+1},
        r(w) = 3^{-j}(2^{A_j} - C_j) mod 2^{A_j+1}             (r55 Prop 1)
  Endpoint class beta_w = C 2^{-A} mod 3^j                     (r61 Thm 1)
  Canonical pair (r_2, r_3)                                    (r50 Prop 4)
  Shortcut affine data T^k(n) = (3^{s_k} n + c_k)/2^k,
        c_k = sum_{i: eps_i = 1} 2^i 3^{s_k - s_{i+1}}          (r63 s7, r69 s8)
  Parity residue R_w = -c_k 3^{-s_k} mod 2^k, R_{k+1} = R_k + t_k 2^k, t_k in {0,1}
                                                               (r63 s9)
  Jump J(n) = T^{l(n)}(n), l(n) = floor(log2 n) + 1             (r69 s7)
  Killed inverse transfer (P pi)(m) = pi(2m) + [m = 2 mod 3] pi((2m-1)/3)
                                                               (r67 Thm 9.1)
  First-crossing rescue count m(w), eq (45)                     (r63 s7)

Every function is documented with the round it comes from.  Import this module;
never re-derive these objects elsewhere (ENVIRONMENT.md).
"""

from fractions import Fraction
from math import gcd

__all__ = [
    "v2", "T", "T_iter", "T_orbit", "U", "U_iter", "U_orbit",
    "T_gen", "U_gen", "word_gen",
    "word", "A_total", "A_partial", "C_carry", "C_partial", "affine",
    "parity_word", "s_count", "shortcut_affine", "parity_residue", "parity_R_sequence",
    "prefix_coefficients_ok", "is_barrier_word",
    "realizer_class", "least_rep", "realizes", "endpoint_class", "canonical_pair",
    "R_sequence", "J", "b_jump", "tau", "sigma",
    "is_first_crossing", "rescue_count", "rescue_seeds", "coefficient_words",
    "P_operator", "cycle_point", "U_rational", "word_rational", "B_word",
    "is_one_terminal", "h_count", "terminal_delta", "barrier_words",
]


# ----------------------------------------------------------------------------
# elementary maps
# ----------------------------------------------------------------------------

def v2(n):
    """2-adic valuation of a nonzero integer."""
    if n == 0:
        raise ValueError("v2(0) undefined")
    return (n & -n).bit_length() - 1


def T(n):
    """Shortcut Collatz map (SKILL s0): n/2 if even, (3n+1)/2 if odd.  Works on all
    integers (negative included, e.g. the -5 -> -7 -> -10 cycle of r57)."""
    return n >> 1 if n % 2 == 0 else (3 * n + 1) >> 1


def T_iter(n, k):
    """T^k(n)."""
    for _ in range(k):
        n = T(n)
    return n


def T_orbit(n, k):
    """[n, T n, ..., T^k n]."""
    out = [n]
    for _ in range(k):
        n = T(n)
        out.append(n)
    return out


def U(n):
    """Accelerated Syracuse map on odd n (SKILL s0): (3n+1)/2^{v2(3n+1)}.
    Returns (U(n), a) with a = v2(3n+1) >= 1."""
    if n % 2 == 0:
        raise ValueError("U needs odd n")
    m = 3 * n + 1
    a = v2(m)
    return m >> a, a


def U_iter(n, j):
    """U^j(n) for odd n."""
    for _ in range(j):
        n, _ = U(n)
    return n


def U_orbit(n, j):
    """[n, U n, ..., U^j n]."""
    out = [n]
    for _ in range(j):
        n, _ = U(n)
        out.append(n)
    return out


def T_gen(n, mult=3, add=1):
    """Generalised shortcut map n -> n/2 (even), (mult*n + add)/2 (odd).
    Controls of the battery (r44, r50, F-J): (3,-1) is 3x-1, (5,1) is 5x+1."""
    return n >> 1 if n % 2 == 0 else (mult * n + add) >> 1


def U_gen(n, mult=3, add=1):
    """Generalised accelerated map on odd n; returns (image, valuation)."""
    if n % 2 == 0:
        raise ValueError("U_gen needs odd n")
    m = mult * n + add
    a = v2(m)
    return m >> a, a


def word_gen(n, j, mult=3, add=1):
    """Valuation word of length j of odd n under the generalised map."""
    out = []
    for _ in range(j):
        n, a = U_gen(n, mult, add)
        out.append(a)
    return tuple(out)


# ----------------------------------------------------------------------------
# valuation words and the affine identity (r50 P4, r55 P1, r60 s1)
# ----------------------------------------------------------------------------

def word(n, j):
    """Valuation word (a_1,...,a_j) of the U-orbit of odd n (SKILL s0)."""
    if n % 2 == 0:
        raise ValueError("word needs odd n")
    out = []
    for _ in range(j):
        n, a = U(n)
        out.append(a)
    return tuple(out)


def A_total(w):
    """A(w) = a_1 + ... + a_j."""
    return sum(w)


def A_partial(w):
    """[A_0, A_1, ..., A_j] with A_0 = 0."""
    out = [0]
    for a in w:
        out.append(out[-1] + a)
    return out


def C_carry(w):
    """Carry C(w) = sum_{i<j} 3^{j-1-i} 2^{A_i}, A_0 = 0 (SKILL s0; r43, r55, r60).
    Equivalently C_0 = 0, C_{k+1} = 3 C_k + 2^{A_k} (r60 s1)."""
    c = 0
    Ak = 0
    for a in w:
        c = 3 * c + (1 << Ak)
        Ak += a
    return c


def C_partial(w):
    """[C_0, C_1, ..., C_j] along the prefixes."""
    out = [0]
    Ak = 0
    for a in w:
        out.append(3 * out[-1] + (1 << Ak))
        Ak += a
    return out


def affine(w):
    """(3^j, C_w, 2^A) with 2^A U^j(n) = 3^j n + C_w for every odd realizer n
    (affine identity, r50 P4 / r55 / r60 s1)."""
    j = len(w)
    return 3 ** j, C_carry(w), 1 << A_total(w)


def B_word(w):
    """B(w) = C(w) + 2^{A(w)} (r60 s1: B_k = C_k + Q_k).  Terminal condition of
    r60 is 3^r | B_r; the depth-19 collision of r60 is stated in B."""
    return C_carry(w) + (1 << A_total(w))


def prefix_coefficients_ok(w):
    """True iff every prefix coefficient 3^i / 2^{A_i} >= 1 (i = 1..j), i.e. the
    U-word never descends coefficient-wise (r54 barrier words u, v)."""
    Ai = 0
    for i, a in enumerate(w, 1):
        Ai += a
        if 3 ** i < (1 << Ai):
            return False
    return True


def is_barrier_word(w):
    """Strict barrier of r43 / r60: 2^{A_t} < 3^t for all 1 <= t <= |w|
    (equivalently A_t <= floor(t log2 3)).  Note the r43/r60 barrier is strict,
    while prefix_coefficients_ok allows equality (never attained for t >= 1)."""
    Ai = 0
    for i, a in enumerate(w, 1):
        Ai += a
        if (1 << Ai) >= 3 ** i:
            return False
    return True


# ----------------------------------------------------------------------------
# realizers (r55 Prop 1), endpoint class (r61 Thm 1), canonical pair (r50 Prop 4)
# ----------------------------------------------------------------------------

def realizer_class(w):
    """r55 Prop 1: the odd realizers of a positive exponent word w of length j are
    exactly n = r(w) + t 2^{A_j+1}, t in Z, with
        r(w) = 3^{-j} (2^{A_j} - C_j)  mod 2^{A_j+1}.
    Returns (r, M) with M = 2^{A_j+1} and 1 <= r < M odd."""
    j = len(w)
    A = A_total(w)
    M = 1 << (A + 1)
    inv3j = pow(3, -j, M)
    r = (inv3j * ((1 << A) - C_carry(w))) % M
    return r, M


def least_rep(w):
    """R(w) = least positive realizer of w, i.e. r(w) in [1, 2^{A+1}) (r55 / r63)."""
    return realizer_class(w)[0]


def realizes(n, w):
    """True iff the odd integer n has valuation word exactly w (any sign of n)."""
    if n % 2 == 0:
        return False
    for a in w:
        m = 3 * n + 1
        if m == 0 or v2(m) != a:
            return False
        n = m >> a
    return True


def endpoint_class(w):
    """r61 Thm 1: beta_w = C 2^{-A} mod 3^j, the class of U^j(n) mod 3^j for every
    realizer n of w.  Returns beta in [0, 3^j)."""
    j = len(w)
    mod = 3 ** j
    return (C_carry(w) * pow(2, -A_total(w), mod)) % mod


def canonical_pair(w):
    """r50 Prop 4: r_3(w) odd in [1, 2*3^j) with 2^A r_3 = C_w mod 3^j, and
    r_2(w) = (2^A r_3 - C_w)/3^j.  Then r_2 is a positive odd integer < 2^{A+1}
    realizing w with endpoint U^j(r_2) = r_3, and all positive realizations are
    r_2 + t 2^{A+1} <-> r_3 + t 2 3^j.  Asserts these clauses.  Returns (r_2, r_3)."""
    j = len(w)
    A = A_total(w)
    C = C_carry(w)
    mod = 3 ** j
    x = (C * pow(2, -A, mod)) % mod          # 2^A x = C mod 3^j, x in [0, 3^j)
    r3 = x if x % 2 == 1 else x + mod         # odd representative in [1, 2*3^j)
    num = (1 << A) * r3 - C
    assert num % mod == 0
    r2 = num // mod
    assert r2 > 0 and r2 % 2 == 1 and r2 < (1 << (A + 1)), (w, r2)
    assert realizes(r2, w), (w, r2)
    assert U_iter(r2, j) == r3, (w, r2, r3)
    return r2, r3


def R_sequence(w):
    """r55 s5 / r63 s9: least representatives R_1..R_j of the prefixes of w and the
    lift digits t_1..t_{j-1} with R_{i+1} = R_i + t_i 2^{A_i+1}, 0 <= t_i < 2^{a_{i+1}}
    (r55 eq (15); the SKILL's 't in {0,1}' is the parity-word version, see
    parity_R_sequence).  Returns (R_list, t_list)."""
    Rs = []
    ts = []
    Ai = 0
    for i in range(1, len(w) + 1):
        R = least_rep(w[:i])
        if Rs:
            diff = R - Rs[-1]
            step = 1 << (Ai + 1)
            assert diff >= 0 and diff % step == 0
            t = diff // step
            assert 0 <= t < (1 << w[i - 1]), (w, i, t)
            ts.append(t)
        Rs.append(R)
        Ai += w[i - 1]
    return Rs, ts


# ----------------------------------------------------------------------------
# shortcut parity words and the shortcut affine data (r63 s7, r69 s8)
# ----------------------------------------------------------------------------

def parity_word(n, k):
    """(eps_0, ..., eps_{k-1}) with eps_i = T^i(n) mod 2 (shortcut map T)."""
    out = []
    for _ in range(k):
        e = n & 1
        out.append(e)
        n = (3 * n + 1) >> 1 if e else n >> 1
    return tuple(out)


def s_count(eps):
    """s_k = number of odd steps in the parity word."""
    return sum(eps)


def shortcut_affine(eps):
    """(s_k, c_k) with T^k(n) = (3^{s_k} n + c_k)/2^k for every n realizing eps
    (r63 s7 eq (39)-(41), r69 s8: c_k = sum_{i: eps_i=1} 2^i 3^{s_k - s_{i+1}}).
    Computed by the recursion (s, c) -> (s+1, 3c + 2^i) on an odd step, unchanged
    on an even step."""
    s = 0
    c = 0
    for i, e in enumerate(eps):
        if e:
            c = 3 * c + (1 << i)
            s += 1
    return s, c


def parity_residue(eps):
    """The unique class mod 2^k realizing the parity word eps (Terras):
    R = -c_k 3^{-s_k} mod 2^k (r63 s1), returned in [0, 2^k)."""
    k = len(eps)
    s, c = shortcut_affine(eps)
    M = 1 << k
    return (-c * pow(3, -s, M)) % M


def parity_R_sequence(eps):
    """r63 s9: R_1..R_k least nonnegative parity residues of the prefixes and the lift
    digits t_i in {0,1} with R_{i+1} = R_i + t_i 2^i."""
    Rs = []
    ts = []
    for i in range(1, len(eps) + 1):
        R = parity_residue(eps[:i])
        if Rs:
            d = R - Rs[-1]
            assert d in (0, 1 << (i - 1))
            ts.append(1 if d else 0)
        Rs.append(R)
    return Rs, ts


# ----------------------------------------------------------------------------
# adaptive jump (r69 s7), stopping times
# ----------------------------------------------------------------------------

def J(n):
    """r69 s7: J(n) = T^{l(n)}(n) with l(n) = floor(log2 n) + 1 = bit length of n.
    J(2^L - 1) = 3^L - 1 collapses the whole 2^L - 1 chain into one jump."""
    if n < 1:
        raise ValueError("J needs n >= 1")
    return T_iter(n, n.bit_length())


def b_jump(n, cap=1000):
    """r69 / SKILL B1: b(n) = min{j >= 1 : J^j(n) < n}; None if not reached within cap."""
    m = n
    for j in range(1, cap + 1):
        m = J(m)
        if m < n:
            return j
    return None


def tau(n, cap=None):
    """r67 s8: hitting time tau(n) = min{k >= 1 : T^k(n) in {1,2}} of the trivial
    cycle A = {1,2}.  tau(1) = tau(2) = 1.  Returns None if cap iterations exceeded."""
    if n < 1:
        raise ValueError("tau needs n >= 1")
    k = 0
    while True:
        n = T(n)
        k += 1
        if n == 1 or n == 2:
            return k
        if cap is not None and k >= cap:
            return None


def sigma(n, cap=None):
    """Shortcut stopping time sigma(n) = min{j >= 1 : T^j(n) < n}; None if not
    reached within cap (sigma(1) is None: the orbit of 1 never drops below 1)."""
    m = n
    j = 0
    while True:
        m = T(m)
        j += 1
        if m < n:
            return j
        if cap is not None and j >= cap:
            return None
        if n == 1 and m == 1:
            return None


# ----------------------------------------------------------------------------
# first coefficient crossing and the exact rescue count (r63 s7)
# ----------------------------------------------------------------------------

def is_first_crossing(eps):
    """r63 eq (37): the shortcut parity word eps of length k is a first-crossing
    word iff 3^{s_j} >= 2^j for 0 <= j < k and 3^{s_k} < 2^k.  (Then eps_{k-1} = 0
    and 2^{k-1} <= 3^{s_k} < 2^k, eq (38).)"""
    k = len(eps)
    if k == 0:
        return False
    s = 0
    for j in range(k):
        if 3 ** s < (1 << j):
            return False
        s += eps[j]
    return 3 ** s < (1 << k)


def rescue_count(eps):
    """r63 eq (45): for a first-crossing word of length k with s odd steps,
    d = 2^k - 3^s, c = c_k:
        m(w) = #{ y in Z : 0 <= y < s/2, c > 2^k y, d | c - 2^k y }.
    Each such y gives the unique positive seed n = (c - 2^k y)/d realizing w with
    T^k(n) = n + y (y = 0 is an exact return / cycle)."""
    return len(rescue_seeds(eps))


def rescue_seeds(eps):
    """The rescued seeds [(n, y), ...] of r63 eq (43)-(44) for a first-crossing word."""
    k = len(eps)
    s, c = shortcut_affine(eps)
    d = (1 << k) - 3 ** s
    if d <= 0:
        raise ValueError("not a crossing word")
    out = []
    y = 0
    while 2 * y < s:
        num = c - (1 << k) * y
        if num > 0 and num % d == 0:
            out.append((num // d, y))
        y += 1
    return out


def coefficient_words(k):
    """Generator of all parity words eps of length k with 3^{s_j} >= 2^j for every
    1 <= j <= k (coefficient-nondescending; a superset of the words of B_k of r57/r63)."""
    stack = [((), 0)]
    while stack:
        eps, s = stack.pop()
        j = len(eps)
        if j == k:
            yield eps
            continue
        for e in (1, 0):
            s2 = s + e
            if 3 ** s2 >= (1 << (j + 1)):
                stack.append((eps + (e,), s2))


# ----------------------------------------------------------------------------
# 1-terminal words, Delta and h (r60 s1 eqs (2)-(5); marked-carry paper)
# ----------------------------------------------------------------------------

def is_one_terminal(w):
    """r60 eq (2): w of length r is 1-terminal iff 3^r | B(w) = C(w) + 2^{A(w)}
    (the 3x-1 trajectory of the word ends at 1; the endpoint class of the 3x+1
    orbit is beta_w = -1 mod 3^r ... equivalently U^r(n) = -1 mod 3^r)."""
    return B_word(w) % 3 ** len(w) == 0


def h_count(w):
    """h = #{i : a_i > 1} (r60 eq (5))."""
    return sum(1 for a in w if a > 1)


def terminal_delta(w):
    """Delta = (C_r + 2^{A_r} - 3^r)/3^r = B(w)/3^r - 1 as an exact Fraction (r60:
    m_0 = B_r/3^r = 1 + Delta for a 1-terminal word; the activation identity gives
    0 < Delta < h for the shortest nontrivial 1-terminal barrier word).  Returns
    (Delta, h, one_terminal)."""
    r = len(w)
    B = B_word(w)
    return Fraction(B - 3 ** r, 3 ** r), h_count(w), B % 3 ** r == 0


def barrier_words(r):
    """Generator of all valuation words of length r (a_i >= 1) with the strict barrier
    2^{A_k} < 3^k for all 1 <= k <= r (r43 / r60)."""
    stack = [((), 0)]
    while stack:
        w, Ak = stack.pop()
        k = len(w)
        if k == r:
            yield w
            continue
        a = 1
        while (1 << (Ak + a)) < 3 ** (k + 1):
            stack.append((w + (a,), Ak + a))
            a += 1


# ----------------------------------------------------------------------------
# killed inverse-transfer operator (r67 Thm 9.1)
# ----------------------------------------------------------------------------

def P_operator(pi, m, killed=(1, 2)):
    """r67 eq (9.2): (P pi)(m) = pi(2m) + 1_{m = 2 mod 3} pi((2m-1)/3), where pi is
    zero on the killed set A = {1,2} (X = N \\ A).  pi may be a callable or a
    dict/sequence (missing keys count as 0).  Exact: returns whatever pi returns
    (int / Fraction) summed."""
    def val(x):
        if x in killed:
            return 0
        if callable(pi):
            return pi(x)
        try:
            return pi[x]
        except (KeyError, IndexError):
            return 0
    total = val(2 * m)
    if m % 3 == 2:
        total += val((2 * m - 1) // 3)
    return total


# ----------------------------------------------------------------------------
# rational cycles (r58)
# ----------------------------------------------------------------------------

def cycle_point(w):
    """r58: the exact fixed point x_w = C_w / (2^A - 3^j) of the affine map of w
    (Fraction; negative for coefficient-nondescending words, r44/r63)."""
    j = len(w)
    D = (1 << A_total(w)) - 3 ** j
    return Fraction(C_carry(w), D)


def U_rational(x):
    """U on a rational x = p/q with q odd: valuation a = v2(3p + q), image (3x+1)/2^a."""
    x = Fraction(x)
    p, q = x.numerator, x.denominator
    if q % 2 == 0:
        raise ValueError("odd denominator required")
    m = 3 * p + q
    if m == 0:
        raise ValueError("3x+1 = 0")
    a = v2(m)
    return Fraction(m, q * (1 << a)), a


def word_rational(x, j):
    """Valuation word of length j of a rational x with odd denominator; returns
    (word, orbit) with orbit = [x, U x, ..., U^j x]."""
    x = Fraction(x)
    orb = [x]
    ws = []
    for _ in range(j):
        x, a = U_rational(x)
        ws.append(a)
        orb.append(x)
    return tuple(ws), orb
