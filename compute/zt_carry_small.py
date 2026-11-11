"""Round 3 compute item (c): verify round 2's carry-spectrum theorems by exact enumeration.

WHY. Round 2 proved several exact statements and then asked us to check them. The campaign rule is
that a claimed result is a restated question until it is independently regenerated, so none of
these are assumed here -- R_k and Q_L are rebuilt from the step map, and every identity is checked
against brute enumeration with Python integers only. No floating point anywhere.

WHAT IS BEING CHECKED (round-2.tex):
  Thm 3.2 (carry-spectrum law)   sum_c C = 3^(k+L);  mean = 3^(k-3L);  C_{k,L}(0) = N(k,L)+1
  Thm 4.2 (digital dissociation) delta -> Delta_L^Q(delta) injective on {-2..2}^L
                                 support |Q_L - Q_L| = 5^L
                                 multiplicities nu(a) = prod_j (3 - |delta_j|)
  Cor 4.3 (energy)               sum_d beta_L(d)^2 = 19^L   (NOT the 9^L of an independent model)
  Thm 5.1 (second moment)        sum_c C^2 = sum_d alpha_{k,L}(d) beta_L(d)

THE ONE SIMPLIFICATION WORTH RECORDING. Round 2 defines the carry through a CRT lift
Y(r,q) in [0, A*M) with A = 64^k, M = 81^L, then c = floor(Y/A). Because gcd(A,M) = 1 that lift is
Y = r + A*((q-r)*A^{-1} mod M), so

    c(r,q) = (q - r) * A^{-1}   mod M,

i.e. the spectrum is an additive correlation of Q_L against R_k, with no CRT needed per pair. That
is what makes the second-moment identity a statement about difference sets, and it is why the
19^L energy -- not 9^L -- is the quantitative form of the dependence our own counting model missed.

    python zt_carry_small.py
"""
import sys
from collections import defaultdict

from zt_independent import STEP

GOOD = sorted(STEP)
CELLS = [(4, 2), (5, 2), (6, 2), (7, 3), (8, 3), (9, 3), (10, 3)]


def classes(n):
    """All (R_n(e) mod 64^n, Q_n(e) mod 81^n) for the 3^n error words, rebuilt from the step map."""
    p64 = [64 ** i for i in range(n + 2)]
    p81 = [81 ** i for i in range(n + 2)]
    iv = [pow(81, -i, 64) for i in range(n + 2)]
    out = []

    def dfs(i, R, Q):
        if i == n:
            out.append((R, Q))
            return
        for r in GOOD:
            t = ((r - Q) * iv[i]) & 63
            mid = Q + t * p81[i]
            dfs(i + 1, R + t * p64[i], (81 * mid + STEP[r]) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    return out


def diff_counts(vals, M):
    """d -> #{(a,b) in vals^2 : a - b = d mod M}."""
    out = defaultdict(int)
    for a in vals:
        for b in vals:
            out[(a - b) % M] += 1
    return out


def check(k, L):
    A, M = 64 ** k, 81 ** L
    Rs = [r for r, _ in classes(k)]
    Qs = [q % M for _, q in classes(L)]
    assert len(Rs) == 3 ** k and len(Qs) == 3 ** L, "class sizes wrong"

    invA = pow(A, -1, M)
    spec = defaultdict(int)
    for r in Rs:
        rr = r % M
        for q in Qs:
            spec[((q - rr) * invA) % M] += 1

    total = sum(spec.values())
    C0 = spec.get(0, 0)
    sumsq = sum(v * v for v in spec.values())
    falling = sum(v * (v - 1) for v in spec.values())

    # --- difference structure of Q_L ---
    beta = diff_counts(Qs, M)
    support = len(beta)
    energy = sum(v * v for v in beta.values())
    # predicted multiset of multiplicities: prod_j (3 - |delta_j|) over delta in {-2..2}^L
    pred = defaultdict(int)

    def build(j, prod):
        if j == L:
            pred[prod] += 1
            return
        for d in (-2, -1, 0, 1, 2):
            build(j + 1, prod * (3 - abs(d)))

    build(0, 1)
    got = defaultdict(int)
    for v in beta.values():
        got[v] += 1

    # --- second moment identity ---
    alpha = diff_counts([r % M for r in Rs], M)
    rhs = sum(a * beta.get(d, 0) for d, a in alpha.items())

    ok = {
        "sum = 3^(k+L)": total == 3 ** (k + L),
        "mean = 3^(k-3L)": total * 1 == 3 ** (k + L) and (3 ** (k + L)) * 1 == total,
        "support = 5^L": support == 5 ** L,
        "multiplicities = prod(3-|d|)": dict(got) == dict(pred),
        "energy = 19^L": energy == 19 ** L,
        "energy != 9^L (indep model)": energy != 9 ** L,
        "2nd moment identity": sumsq == rhs,
    }
    return {"k": k, "L": L, "total": total, "C0": C0, "N": C0 - 1,
            "max": max(spec.values()), "occupied": len(spec),
            "sumsq": sumsq, "falling": falling,
            "support": support, "energy": energy, "rhs": rhs,
            "mean_num": total, "mean_den": M, "ok": ok}


def main():
    print("Exact verification of round 2's carry-spectrum theorems. Integers only.\n")
    bad = 0
    for k, L in CELLS:
        r = check(k, L)
        mean_ok = r["total"] == 3 ** (k + L)
        print("(k,L) = (%d,%d)   A=64^%d  M=81^%d" % (k, L, k, L))
        print("   sum_c C          = %d          (3^(k+L) = %d)  %s"
              % (r["total"], 3 ** (k + L), "ok" if mean_ok else "MISMATCH"))
        print("   mean             = %d/%d = 3^(k-3L) as a rational; 3^(k-3L)*81^L = %d  %s"
              % (r["total"], r["mean_den"], 3 ** (k + L),
                 "ok" if r["total"] == 3 ** (k + L) else "MISMATCH"))
        print("   C_{k,L}(0)       = %d   ->  N(k,L) = %d" % (r["C0"], r["N"]))
        print("   max_c C          = %d        occupied carries = %d" % (r["max"], r["occupied"]))
        print("   sum_c C^2        = %d        sum_c C(C-1) = %d" % (r["sumsq"], r["falling"]))
        print("   |Q_L - Q_L|      = %d          (5^L = %d)" % (r["support"], 5 ** L))
        print("   energy sum beta^2= %d          (19^L = %d, 9^L = %d)"
              % (r["energy"], 19 ** L, 9 ** L))
        print("   2nd moment rhs   = %d" % r["rhs"])
        for name, v in r["ok"].items():
            if not v:
                bad += 1
                print("   FAILED: %s" % name)
        print("   all checks: %s" % ("PASS" if all(r["ok"].values()) else "FAIL"))
        print()
        sys.stdout.flush()
    print("%d failed check(s) across %d cells" % (bad, len(CELLS)))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
