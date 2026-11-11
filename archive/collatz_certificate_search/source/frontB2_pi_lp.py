"""
frontB2_pi_lp.py -- Front B2 (r67 Thm 9.1 explicit pi) LP search + exact Farkas certification.

Target (r67 eq 9.2/9.3, killed set A = {1,2}):
    (P pi)(m) = pi(2m) + [m = 2 mod 3] pi((2m-1)/3)  <=  pi(m)     for all m >= 3.

Finitely-presented families  pi(n) = n^{-s} h(sigma(n)),  sigma: N -> finite state set,
h > 0 an unknown table.  For each m the constraint is LINEAR in h.  Row m (normalized by m^s):

    2^{-s} h(sigma(2m)) + [m=2(3)] (3m/(2m-1))^s h(sigma((2m-1)/3)) - h(sigma(m)) <= 0.

Discovery: HiGHS on   max eps  s.t.  rows <= 0,  h_i >= eps,  sum h_i = 1.
   eps* > 0  <=>  a strictly positive table exists on [3,N].
Certification (exact): the row duals y >= 0 give  y^T A >= 0 componentwise, y^T A != 0
(Farkas/Gordan for h > 0).  We re-derive y exactly (rational nullspace refinement on the
LP support) and check y^T A >= 0 EXACTLY on the UNNORMALIZED rows (coefficients k^{-s}):
   s integer      -> Fractions;
   s = p/q        -> every coefficient is  (rational) * K^{1/q} with K q-th-power-free;
                     sums are zero iff every rational coefficient is zero (Besicovitch 1940:
                     real radicals prod p_i^{e_i/q}, 0<=e_i<q, are Q-linearly independent),
                     otherwise the sign is decided by outward-rounded interval arithmetic
                     (mpmath.iv), which terminates because the number is nonzero.
"""

import sys, os, json, time
from fractions import Fraction
from math import gcd
import numpy as np
from scipy.optimize import linprog
from scipy.sparse import coo_matrix
import mpmath

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from collatz_core import parity_word, v2, P_operator, tau, T  # noqa

LP_OPTIONS = {"primal_feasibility_tolerance": 1e-9, "dual_feasibility_tolerance": 1e-9}
LAB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CERT_DIR = os.path.join(LAB, "certificates")
LOG_DIR = os.path.join(LAB, "logs")


# ----------------------------------------------------------------------------
# exact radical arithmetic for k^{-s}, s = p/q
# ----------------------------------------------------------------------------

def _qth_power_split(K, q):
    """K = t^q * K' with K' q-th-power-free.  Returns (t, K')."""
    if q == 1:
        return K, 1
    t = 1
    Kp = K
    # trial division; K is small (k^r with r<q, k <= ~1e6)
    d = 2
    n = Kp
    while d * d <= n:
        if n % d == 0:
            e = 0
            while n % d == 0:
                n //= d
                e += 1
            t *= d ** (e // q)
            Kp = Kp // d ** e * d ** (e % q)
        d += 1
    return t, Kp


def coeff(k, s):
    """k^{-s} exactly as (Fraction c, int rad):  value = c * rad^{1/q}, s = Fraction(p,q)."""
    s = Fraction(s)
    p, q = s.numerator, s.denominator
    a = -(-p // q)               # ceil(p/q)
    r = a * q - p                # 0 <= r < q
    K = k ** r
    t, Kp = _qth_power_split(K, q)
    return Fraction(t, k ** a), Kp


class RadSum:
    """sum_d c_d d^{1/q}, c_d rational, d q-th-power-free positive integers."""
    __slots__ = ("q", "c")

    def __init__(self, q, c=None):
        self.q = q
        self.c = dict(c) if c else {}

    def add(self, frac, rad):
        if frac == 0:
            return
        v = self.c.get(rad, Fraction(0)) + frac
        if v == 0:
            self.c.pop(rad, None)
        else:
            self.c[rad] = v

    def is_zero(self):
        return not self.c

    def sign(self, dps0=30, dps_max=2000):
        if self.is_zero():
            return 0
        if all(v > 0 for v in self.c.values()):
            return 1
        if all(v < 0 for v in self.c.values()):
            return -1
        dps = dps0
        while dps <= dps_max:
            mpmath.iv.dps = dps
            mpmath.mp.dps = dps
            tot = mpmath.iv.mpf(0)
            for d, v in self.c.items():
                term = mpmath.iv.mpf(d) ** (mpmath.iv.mpf(1) / self.q)
                tot += mpmath.iv.mpf([v.numerator, v.numerator]) / mpmath.iv.mpf([v.denominator, v.denominator]) * term
            if tot.a > 0:
                return 1
            if tot.b < 0:
                return -1
            dps *= 2
        raise RuntimeError("could not decide sign of nonzero radical sum")

    def to_json(self):
        return {str(d): [v.numerator, v.denominator] for d, v in self.c.items()}

    def float(self):
        return float(sum(float(v) * d ** (1.0 / self.q) for d, v in self.c.items()))


# ----------------------------------------------------------------------------
# state functions (families)
# ----------------------------------------------------------------------------

def sigma_mod(M):
    return (lambda n: n % M), M, "mod%d" % M


def sigma_word(L, b=0):
    def f(n):
        w = parity_word(n, L)
        return (w, n % 3 ** b) if b else w
    return f, (2 ** L) * (3 ** b), "word%d%s" % (L, ("_mod3^%d" % b) if b else "")


def sigma_v2(K1, K2=None):
    """states (min(v2(n+1),K1)) or (min(v2(n+1),K1), min(v2(3n+1),K2))."""
    if K2 is None:
        return (lambda n: min(v2(n + 1), K1)), K1 + 1, "v2cap%d" % K1
    return (lambda n: (min(v2(n + 1), K1), min(v2(3 * n + 1), K2))), (K1 + 1) * (K2 + 1), "v2pair%d_%d" % (K1, K2)


# ----------------------------------------------------------------------------
# rows
# ----------------------------------------------------------------------------

def row_terms(m):
    """[(k, sign)] : the unnormalized row  sum sign * k^{-s} h(sigma(k)) <= 0."""
    terms = [(2 * m, +1), (m, -1)]
    if m % 3 == 2:
        terms.append(((2 * m - 1) // 3, +1))
    return terms


def build_lp(sig, s, N, m_lo=3):
    """Normalized rows m in [m_lo, N].  Returns (states list, index dict, A (csr), rows list m)."""
    sf = float(s)
    idx = {}
    states = []
    data, ri, ci = [], [], []
    rows = []
    for r, m in enumerate(range(m_lo, N + 1)):
        rows.append(m)
        for k, sgn in row_terms(m):
            st = sig(k)
            if st not in idx:
                idx[st] = len(states)
                states.append(st)
            j = idx[st]
            val = sgn * (m / k) ** sf     # k^{-s} / m^{-s}
            data.append(val); ri.append(r); ci.append(j)
    A = coo_matrix((data, (ri, ci)), shape=(len(rows), len(states))).tocsr()
    return states, idx, A, rows


def solve_lp(A):
    """max eps s.t. A h <= 0, h_i >= eps, sum h = 1.  Returns (eps*, h, y_rows, status)."""
    nr, K = A.shape
    # variables: h_1..h_K, eps
    from scipy.sparse import hstack, vstack, csr_matrix, identity
    A1 = hstack([A, csr_matrix((nr, 1))])                       # A h + 0 eps <= 0
    A2 = hstack([-identity(K, format="csr"), csr_matrix(np.ones((K, 1)))])   # -h_i + eps <= 0
    Aub = vstack([A1, A2]).tocsr()
    bub = np.zeros(nr + K)
    c = np.zeros(K + 1); c[-1] = -1.0
    # h_i <= 1 (scale), eps free: always feasible (h=0, eps=0); eps*>0 iff a positive table exists.
    # Dual at eps*=0: y^T A = z >= 0, sum z = 1  -> Farkas/Gordan certificate.
    bounds = [(None, 1.0)] * K + [(None, 1.0)]
    res = linprog(c, A_ub=Aub, b_ub=bub, bounds=bounds, method="highs", options=LP_OPTIONS)
    if res.status != 0:
        return None, None, None, res
    eps = -res.fun
    h = res.x[:K]
    y = -res.ineqlin.marginals[:nr]     # duals of A h <= 0 (nonneg for max problem in scipy sign convention)
    y = np.maximum(y, 0.0)
    return eps, h, y, res


def strict_lp(A):
    """max eps s.t. (A h)_r + eps*[row r nonzero] <= 0, h_i >= eps, h_i <= 1.
    eps* > 0 gives a table with uniform slack in every nontrivial row (robust to rationalization)."""
    from scipy.sparse import hstack, vstack, csr_matrix, identity
    nr, K = A.shape
    rownz = (np.abs(A).sum(axis=1).A1 > 1e-15).astype(float)
    A1 = hstack([A, csr_matrix(rownz[:, None])])
    A2 = hstack([-identity(K, format="csr"), csr_matrix(np.ones((K, 1)))])
    Aub = vstack([A1, A2]).tocsr()
    bub = np.zeros(nr + K)
    c = np.zeros(K + 1); c[-1] = -1.0
    bounds = [(None, 1.0)] * K + [(None, 1.0)]
    res = linprog(c, A_ub=Aub, b_ub=bub, bounds=bounds, method="highs")
    if res.status != 0:
        return None, None
    return -res.fun, res.x[:K]


# ----------------------------------------------------------------------------
# exact certification
# ----------------------------------------------------------------------------

def exact_combination(sig, s, rows_y, states_idx=None):
    """rows_y: dict m -> Fraction multiplier (>=0).  Returns dict state -> RadSum of y^T A
    (UNNORMALIZED rows: coefficients sign * k^{-s})."""
    s = Fraction(s)
    q = s.denominator
    comb = {}
    for m, ym in rows_y.items():
        if ym == 0:
            continue
        for k, sgn in row_terms(m):
            st = sig(k)
            c, rad = coeff(k, s)
            comb.setdefault(st, RadSum(q)).add(sgn * ym * c, rad)
    return comb


def check_farkas(sig, s, rows_y):
    """Exact Gordan check: all components >= 0 and at least one > 0.  Returns (ok, detail)."""
    comb = exact_combination(sig, s, rows_y)
    pos = 0
    detail = {}
    for st, rs in comb.items():
        sg = rs.sign()
        detail[str(st)] = sg
        if sg < 0:
            return False, detail
        if sg > 0:
            pos += 1
    return pos > 0, detail


def check_farkas_k(sig, s, rows_y, dps_max=4000):
    """Exact Gordan check grouping by (state, k): coefficients of the SAME k^{-s} cancel as rationals
    (no factoring needed); a residual with mixed signs is decided by outward-rounded intervals.
    Returns (ok, detail) with detail[state] in {-1, 0, 1, 'undecided'}."""
    s = Fraction(s)
    if s.denominator == 1:
        return check_farkas_lo(sig, s, rows_y)      # exact rationals
    comb = {}
    for m, ym in rows_y.items():
        if ym == 0:
            continue
        for k, sgn in row_terms(m):
            st = sig(k)
            d = comb.setdefault(st, {})
            d[k] = d.get(k, Fraction(0)) + sgn * ym
    detail = {}
    pos = 0
    ok = True
    for st, d in comb.items():
        d = {k: v for k, v in d.items() if v != 0}
        if not d:
            detail[str(st)] = 0
            continue
        if all(v > 0 for v in d.values()):
            detail[str(st)] = 1; pos += 1; continue
        if all(v < 0 for v in d.values()):
            detail[str(st)] = -1; ok = False; continue
        dps = 40
        sg = "undecided"
        while dps <= dps_max:
            mpmath.iv.dps = dps
            tot = mpmath.iv.mpf(0)
            for k, v in d.items():
                term = mpmath.iv.mpf(k) ** (-mpmath.iv.mpf(s.numerator) / s.denominator)
                tot += mpmath.iv.mpf([v.numerator, v.numerator]) / mpmath.iv.mpf([v.denominator, v.denominator]) * term
            if tot.a > 0:
                sg = 1; break
            if tot.b < 0:
                sg = -1; break
            dps *= 2
        detail[str(st)] = sg
        if sg == 1:
            pos += 1
        else:
            ok = False
    return ok and pos > 0, detail


def rational_nullspace(rows_of_fracs, ncols):
    """Nullspace basis over Q of the matrix given as list of rows (lists of Fractions).
    Returns list of basis vectors (lists of Fractions)."""
    M = [list(r) for r in rows_of_fracs]
    nrow = len(M)
    piv_cols = []
    r = 0
    for c in range(ncols):
        pr = None
        for i in range(r, nrow):
            if M[i][c] != 0:
                pr = i
                break
        if pr is None:
            continue
        M[r], M[pr] = M[pr], M[r]
        pv = M[r][c]
        M[r] = [x / pv for x in M[r]]
        for i in range(nrow):
            if i != r and M[i][c] != 0:
                fac = M[i][c]
                M[i] = [a - fac * b for a, b in zip(M[i], M[r])]
        piv_cols.append(c)
        r += 1
        if r == nrow:
            break
    free = [c for c in range(ncols) if c not in piv_cols]
    basis = []
    for fc in free:
        v = [Fraction(0)] * ncols
        v[fc] = Fraction(1)
        for i, pc in enumerate(piv_cols):
            v[pc] = -M[i][fc]
        basis.append(v)
    return basis


def _frac_of_mpf(x):
    """exact Fraction of an mpmath mpf (dyadic)."""
    if hasattr(x, "_mpi_"):        # ivmpf endpoint: take the (equal) endpoints
        a, b = x._mpi_
        assert a == b
        sign, man, exp, bc = a
    else:
        sign, man, exp, bc = x._mpf_
    if man == 0:
        return Fraction(0)
    v = Fraction(man) * (Fraction(2) ** exp)
    return -v if sign else v


_pow_cache = {}


def coeff_bounds(k, s, dps=30):
    """Rational (lo, hi) with lo <= k^{-s} <= hi.  Exact (lo=hi) for integer s."""
    s = Fraction(s)
    key = (k, s)
    if key in _pow_cache:
        return _pow_cache[key]
    if s.denominator == 1:
        v = Fraction(1, k ** s.numerator)
        out = (v, v)
    else:
        mpmath.iv.dps = dps
        x = mpmath.iv.mpf(k) ** (-mpmath.iv.mpf(s.numerator) / s.denominator)
        lo, hi = _frac_of_mpf(x.a), _frac_of_mpf(x.b)
        assert lo <= hi
        out = (lo, hi)
    _pow_cache[key] = out
    return out


def exact_row_lo(sig, s, m):
    """UNNORMALIZED row m with every coefficient replaced by a rational LOWER bound
    (positive terms: lower bound of k^{-s}; negative term: -(upper bound of m^{-s})).
    y >= 0 and y^T A_lo >= 0  ==>  y^T A >= 0.  Returns dict state -> Fraction."""
    d = {}
    for k, sgn in row_terms(m):
        st = sig(k)
        lo, hi = coeff_bounds(k, s)
        c = lo if sgn > 0 else -hi
        d[st] = d.get(st, Fraction(0)) + c
    return {st: v for st, v in d.items() if v != 0}


def sparse_nullspace(eqs, ncols, time_limit=300.0):
    """Nullspace basis over Q of a sparse system.  eqs: list of dict col->Fraction.
    Min-count pivoting on columns; returns list of basis vectors (dict col->Fraction) or None on timeout."""
    t0 = time.time()
    rows = [{c: v for c, v in e.items() if v != 0} for e in eqs]
    rows = [r for r in rows if r]
    piv = {}          # pivot col -> row dict (normalized, pivot coeff 1), rows are kept reduced w.r.t. later pivots
    col_rows = {}     # col -> set of row ids currently containing col
    active = {i: r for i, r in enumerate(rows)}
    for i, r in active.items():
        for c in r:
            col_rows.setdefault(c, set()).add(i)
    pivot_order = []
    while active:
        if time.time() - t0 > time_limit:
            return None
        # choose the column with fewest active rows (>=1) then the shortest row in it
        best = None
        for c, rs in col_rows.items():
            if rs and (best is None or len(rs) < best[0]):
                best = (len(rs), c)
                if len(rs) == 1:
                    break
        if best is None:
            break
        _, c = best
        rid = min(col_rows[c], key=lambda i: len(active[i]))
        prow = active.pop(rid)
        for cc in prow:
            col_rows[cc].discard(rid)
        pv = prow[c]
        prow = {cc: v / pv for cc, v in prow.items()}
        # eliminate c from all other active rows containing c
        for oid in list(col_rows[c]):
            orow = active[oid]
            f = orow[c]
            for cc, v in prow.items():
                nv = orow.get(cc, Fraction(0)) - f * v
                if nv == 0:
                    if cc in orow:
                        del orow[cc]
                        col_rows[cc].discard(oid)
                else:
                    if cc not in orow:
                        col_rows.setdefault(cc, set()).add(oid)
                    orow[cc] = nv
            if not orow:
                del active[oid]
        col_rows[c] = set()
        piv[c] = prow
        pivot_order.append(c)
    # back-substitute: express pivot columns in terms of free columns
    free = [c for c in range(ncols) if c not in piv]
    # process pivots in reverse order so that each pivot row only refers to free cols after substitution
    solved = {}   # pivot col -> dict free col -> coeff  (x_c = sum coeff * x_free)
    for c in reversed(pivot_order):
        prow = piv[c]
        expr = {}
        for cc, v in prow.items():
            if cc == c:
                continue
            if cc in solved:
                for fc, w in solved[cc].items():
                    expr[fc] = expr.get(fc, Fraction(0)) - v * w
            else:
                expr[cc] = expr.get(cc, Fraction(0)) - v
        solved[c] = {k: v for k, v in expr.items() if v != 0}
    basis = []
    for fc in free:
        vec = {fc: Fraction(1)}
        for c, expr in solved.items():
            if fc in expr:
                vec[c] = expr[fc]
        basis.append(vec)
    return basis


def refine_farkas(sig, s, support, y_float, zero_tol=1e-7, time_limit=300.0):
    """Given support rows and float multipliers (unnormalized-row scale), return an exact rational
    y >= 0 certifying y^T A >= 0, != 0, or None.
    integer s : equations = numerically-zero states, exact rational coefficients k^{-s}.
    other s   : equations = (state, k) pairs whose SAME-k^{-s} rational coefficient is numerically
                zero (structural cancellation only; integer coefficients).  Verified by check_farkas_k."""
    s = Fraction(s)
    support = list(support)
    n = len(support)
    integer = (s.denominator == 1)
    # per-row exact key maps: state -> rational coefficient of A_lo (exact when s is an integer)
    per_row = [exact_row_lo(sig, s, m) for m in support]
    keys = {}
    for d in per_row:
        for kk in d:
            keys.setdefault(kk, [0.0, 0.0])
    for d, ym in zip(per_row, y_float):
        for kk, c in d.items():
            val = ym * float(c)
            keys[kk][0] += val
            keys[kk][1] += abs(val)
    zero_keys = [kk for kk, (v, mag) in keys.items() if abs(v) <= zero_tol * max(mag, 1e-300)]
    checker = check_farkas_lo
    cands = []
    if not zero_keys:
        cands.append({m: Fraction(v).limit_denominator(10 ** 9) for m, v in zip(support, y_float)})
    else:
        col_of = {m: i for i, m in enumerate(support)}
        eqs = []
        for kk in zero_keys:
            e = {}
            for i, d in enumerate(per_row):
                if kk in d:
                    e[i] = d[kk]
            eqs.append(e)
        basis = sparse_nullspace(eqs, n, time_limit=time_limit)
        if basis:
            if len(basis) == 1:
                v = basis[0]
                if all(x <= 0 for x in v.values()):
                    v = {k: -x for k, x in v.items()}
                if all(x >= 0 for x in v.values()):
                    cands.append({support[i]: x for i, x in v.items()})
            else:
                B = np.zeros((n, len(basis)))
                for j, b in enumerate(basis):
                    for i, x in b.items():
                        B[i, j] = float(x)
                coef, *_ = np.linalg.lstsq(B, np.array(y_float, dtype=float), rcond=None)
                for den in (10 ** 6, 10 ** 12, 10 ** 18):
                    v = {}
                    for cval, b in zip(coef, basis):
                        cf = Fraction(float(cval)).limit_denominator(den)
                        if cf == 0:
                            continue
                        for i, x in b.items():
                            v[i] = v.get(i, Fraction(0)) + cf * x
                    if all(x >= 0 for x in v.values()) and any(x > 0 for x in v.values()):
                        cands.append({support[i]: x for i, x in v.items() if x != 0})
        cands.append({m: Fraction(v).limit_denominator(10 ** 12) for m, v in zip(support, y_float)})
    for ry in cands:
        if all(v >= 0 for v in ry.values()) and any(v > 0 for v in ry.values()):
            ok, _ = checker(sig, s, ry)
            if ok:
                return ry
    return None


def check_farkas_lo(sig, s, rows_y):
    """Exact rational Gordan check on A_lo: all components >= 0, at least one > 0."""
    comb = {}
    for m, ym in rows_y.items():
        if ym == 0:
            continue
        for st, c in exact_row_lo(sig, s, m).items():
            comb[st] = comb.get(st, Fraction(0)) + ym * c
    if any(v < 0 for v in comb.values()):
        return False, comb
    return any(v > 0 for v in comb.values()), comb


def interior_dual(A, Z_idx=()):
    """max t s.t. (A^T y)_i >= t (i not in Z), >= 0 (i in Z), sum_{i not in Z} (A^T y)_i = 1, y >= 0.
    Feasible iff a Gordan certificate with a positive component outside Z exists.  Returns (t*, y)."""
    from scipy.sparse import hstack, csr_matrix
    nr, K = A.shape
    AT = A.T.tocsr()                       # K x nr
    notZ = np.ones(K); notZ[list(Z_idx)] = 0.0
    Aub = hstack([-AT, csr_matrix(notZ[:, None])]).tocsr()      # -(A^T y) + t*notZ <= 0
    bub = np.zeros(K)
    Aeq = hstack([csr_matrix(notZ[None, :]) @ AT, csr_matrix((1, 1))]).tocsr()
    beq = np.array([1.0])
    c = np.zeros(nr + 1); c[-1] = -1.0
    bounds = [(0, None)] * nr + [(None, 1.0)]
    res = linprog(c, A_ub=Aub, b_ub=bub, A_eq=Aeq, b_eq=beq, bounds=bounds, method="highs")
    if res.status != 0:
        return None, None
    return -res.fun, res.x[:nr]


def spread_dual(A):
    """max sum_i sigma_i s.t. sigma_i <= (A^T y)_i, 0 <= sigma_i <= 1, A^T y >= 0, sum y = 1, y >= 0.
    Pushes as many components as possible strictly positive.  Returns y."""
    from scipy.sparse import hstack, vstack, csr_matrix, identity
    nr, K = A.shape
    AT = A.T.tocsr()
    Aub1 = hstack([-AT, identity(K, format="csr")])          # sigma - A^T y <= 0
    Aub2 = hstack([-AT, csr_matrix((K, K))])                # -A^T y <= 0
    Aub = vstack([Aub1, Aub2]).tocsr()
    bub = np.zeros(2 * K)
    Aeq = csr_matrix(np.concatenate([np.ones(nr), np.zeros(K)])[None, :])
    c = np.concatenate([np.zeros(nr), -np.ones(K)])
    bounds = [(0, None)] * nr + [(0, 1.0)] * K
    res = linprog(c, A_ub=Aub, b_ub=bub, A_eq=Aeq, b_eq=[1.0], bounds=bounds, method="highs")
    if res.status != 0:
        return None
    return res.x[:nr]


def certify_infeasible(sig, s, states, A, rows, y, log=None):
    """Exact Gordan certificate for 'no h > 0 with A h <= 0' on the given rows.
    Candidates for the multiplier vector: (a) vertex duals of the primal LP, (b) spread dual
    (max number of positive components), (c) interior dual with Z = zero set of (b).
    Each candidate is refined to an exact rational y on A_lo (nullspace of the numerically-zero
    components) and checked exactly; the first success is returned."""
    sf = float(s)
    cands = []
    if y is not None and len(y) and y.max() > 0:
        cands.append(("vertex", y))
    ys = spread_dual(A)
    t = None
    if ys is not None and ys.max() > 0:
        cands.append(("spread", ys))
        comp = A.T @ ys
        Z = set(int(i) for i in np.where(comp <= 1e-9 * max(1.0, np.abs(comp).max()))[0])
        t, yi = interior_dual(A, Z)
        if yi is not None and yi.max() > 0:
            cands.append(("interior", yi))
    tried = []
    for lab, yy in cands:
        ymax = yy.max()
        supp_idx = [i for i in range(len(rows)) if yy[i] > 1e-10 * ymax]
        support = [rows[i] for i in supp_idx]
        yf_un = [yy[i] / ymax * (rows[i] ** sf) for i in supp_idx]      # normalized -> unnormalized rows
        mx = max(yf_un)
        yf_un = [v / mx for v in yf_un]
        ry = refine_farkas(sig, s, support, yf_un)
        tried.append((lab, len(support), ry is not None))
        if ry is None:
            continue
        if Fraction(s).denominator == 1:
            ok_lo, comb = check_farkas_lo(sig, s, ry)          # exact rationals
            ok_true, detail = ok_lo, {str(k): (1 if v > 0 else 0) for k, v in comb.items()}
        else:
            ok_lo, comb = check_farkas_lo(sig, s, ry)          # rigorous: A_lo <= A entrywise
            ok_true, detail = check_farkas_k(sig, s, ry)       # independent: same-k cancellation + intervals
        if ok_lo and ok_true:
            ry = {m: v for m, v in ry.items() if v != 0}
            return {"ok": True, "ok_lo": ok_lo, "ok_true_rows": ok_true, "source": lab,
                    "support": sorted(ry), "n_rows": len(ry), "max_row": max(ry), "t_interior": t,
                    "y": {str(m): [v.numerator, v.denominator] for m, v in ry.items()},
                    "components_sign": detail}
    return {"ok": False, "reason": "refinement failed for all candidates", "tried": tried, "t_interior": t}


def verify_table_exact(sig, s, h_by_state, N, m_lo=3):
    """Exact check of P pi <= pi on [m_lo, N] for pi(n) = n^{-s} h(sigma(n)).  Integer s: Fractions.
    Non-integer s: RadSum sign.  Returns first violating m or None."""
    s = Fraction(s)
    q = s.denominator
    for m in range(m_lo, N + 1):
        rs = RadSum(q)
        for k, sgn in row_terms(m):
            c, rad = coeff(k, s)
            rs.add(sgn * h_by_state[sig(k)] * c, rad)
        if rs.sign() > 0:
            return m
    return None


# ----------------------------------------------------------------------------
# N_fail search
# ----------------------------------------------------------------------------

def feasible_at(sig, s, N, eps_tol=1e-9):
    states, idx, A, rows = build_lp(sig, s, N)
    eps, h, y, res = solve_lp(A)
    return eps is not None and eps > eps_tol, (states, idx, A, rows, eps, h, y)


def find_N_fail(sig, s, N_hi, N_lo=3, log=None):
    """Smallest N in [N_lo, N_hi] with LP infeasible (assumes monotone; N_hi known infeasible)."""
    lo, hi = N_lo - 1, N_hi     # invariant: lo feasible (or lo < N_lo), hi infeasible
    while hi - lo > 1:
        mid = (lo + hi) // 2
        ok, _ = feasible_at(sig, s, mid)
        if log:
            log("  N=%d %s" % (mid, "feasible" if ok else "INFEASIBLE"))
        if ok:
            lo = mid
        else:
            hi = mid
    return hi


def run_config(sig, K, name, s, N_hi, log=print, extra=None):
    t0 = time.time()
    ok_hi, pack = feasible_at(sig, s, N_hi)
    if ok_hi:
        return {"family": name, "s": str(s), "N_hi": N_hi, "status": "FEASIBLE at N_hi", "time": time.time() - t0}
    N_fail = find_N_fail(sig, s, N_hi, log=None)
    ok, (states, idx, A, rows, eps, h, y) = feasible_at(sig, s, N_fail)
    assert not ok
    cert = certify_infeasible(sig, s, states, A, rows, y)
    # feasibility at N_fail-1: strict-margin LP, rationalize, EXACT check of the table
    okm, (st2, idx2, A2, rows2, eps2, h2, y2) = feasible_at(sig, s, N_fail - 1)
    exact_feas = None
    table_below = None
    if okm:
        eps_s, h_s = strict_lp(A2)
        cands = []
        if eps_s is not None and eps_s > 1e-9:
            cands.append(h_s)
        cands.append(h2)                       # plain max-eps table (tight rows often rationalize exactly)
        for hh in cands:
            for den in (10 ** 12, 10 ** 6, 10 ** 18):
                hb = {stt: Fraction(float(v)).limit_denominator(den) for stt, v in zip(st2, hh)}
                if all(v > 0 for v in hb.values()):
                    viol = verify_table_exact(sig, s, hb, N_fail - 1)
                    if viol is None:
                        exact_feas = True
                        table_below = {str(k): [v.numerator, v.denominator] for k, v in hb.items()}
                        break
            if exact_feas:
                break
        if exact_feas is None:
            # relative-slack LP: inflate positive coefficients by (1+rel); any solution has relative slack
            for rel in (1e-6, 1e-8):
                A3 = A2.copy().tocsr()
                A3.data = np.where(A3.data > 0, A3.data * (1 + rel), A3.data)
                e3, h3, y3, res3 = solve_lp(A3)
                if e3 is None or e3 <= 1e-12:
                    continue
                for den in (10 ** 30, 10 ** 60):
                    hb = {stt: Fraction(float(v)).limit_denominator(den) for stt, v in zip(st2, h3)}
                    if all(v > 0 for v in hb.values()) and verify_table_exact(sig, s, hb, N_fail - 1) is None:
                        exact_feas = True
                        table_below = {str(k): [v.numerator, v.denominator] for k, v in hb.items()}
                        break
                if exact_feas:
                    break
        if exact_feas is None:
            exact_feas = False
    out = {"family": name, "K_states": K, "s": str(s), "N_hi": N_hi, "N_fail": N_fail,
           "eps_at_Nfail": eps, "eps_at_Nfail_minus_1": eps2 if okm else None,
           "exact_feasible_below": exact_feas, "table_below": table_below,
           "farkas": cert, "time": time.time() - t0}
    if extra:
        out.update(extra)
    return out


def save_cert(fname, obj):
    os.makedirs(CERT_DIR, exist_ok=True)
    with open(os.path.join(CERT_DIR, fname), "w") as fh:
        json.dump(obj, fh, indent=1, default=str)
