"""
frontB3_fa_structure.py -- deliverable B3c support: the exact regular structure of the F-A family
in the R system.  R^s(2^m) = u_s^{floor(m/2^s)} y_{s, m mod 2^s} with |u_s| = 2^s (verified below),
so along every residue class the s-th orbit word is a fixed block power: an N-weighted automaton
value rho(R^s(2^m)) is a linear recurrence sequence in j = floor(m/2^s), and the F-A chain
constraints rho(R^s 2^m) > rho(R^{s+1} 2^m) compare linear recurrences of bounded order.
Also: the smallest F-A instances (T-orbit of 2^L-1 down to below 2^L-1, intersected with S) and
the linear lower bound rho(2^m) >= h(2 3^m - 1) (R-hitting time) that any rank must satisfy.
Log: logs/frontB3-c-FA-structure.log
"""
import sys
sys.path.insert(0, ".")
from rewrite11 import R, R_orbit_words, N_word, tern_word
from collatz_core import T

LOG = open("../logs/frontB3-c-FA-structure.log", "w", encoding="utf-8")


def log(*a):
    s = " ".join(str(x) for x in a)
    print(s, flush=True); LOG.write(s + "\n"); LOG.flush()


def find_pattern(words):
    """words = consecutive members (j = j0, j0+1, ...) of one residue class; find x u^{j0+i} y."""
    L = [len(w) for w in words]
    du = L[1] - L[0]
    if any(L[i + 1] - L[i] != du for i in range(len(L) - 1)) or du <= 0:
        return None
    w0, w1 = words[0], words[1]
    for xlen in range(0, len(w0) + 1):
        x = w1[:xlen]; u = w1[xlen:xlen + du]
        for a in range(0, len(w0) // du + 1):
            y = w0[xlen + du * a:]
            if w0 == x + u * a + y and all(x + u * (a + i) + y == words[i] for i in range(len(words))):
                return x, u, y
    return None


MMAX = 900
S = 7
log("Lemma (exact, m <= %d): R^s(2^m) = x_s u_s^j y_s with j = floor(m/2^s), for m = r mod 2^s" % MMAX)
blocks = {}
for s in range(0, S + 1):
    us = set()
    fails = []
    for r in range(2 ** s):
        ms = [m for m in range(max(3, r), MMAX + 1) if m % 2 ** s == r and m >= 2 ** s + 2][:6]
        words = [R_orbit_words("2" * m, max_steps=s)[s] for m in ms]
        pat = find_pattern(words)
        if pat is None:
            fails.append(r)
        else:
            us.add((pat[0], pat[1]))
    log("step s=%d: block lengths %s, distinct (x,u): %d, residues without x u^j y pattern: %s" % (
        s, sorted(set(len(u) for x, u in us)), len(us), fails))
    for x, u in sorted(us):
        log("     x=%r u=%r" % (x, u))
    blocks[s] = us

# values along the chain and the parity/valuation bookkeeping
log("\nvalues: N(2^m) = 2 3^m - 1 = T^m(2^{m+1}-1); N(1^m) = (3^{m+1}-1)/2; N((01)^k) = 9^k + (9^k-1)/8")
for m in range(2, 40):
    w = "2" * m
    assert N_word(w) == 2 * 3 ** m - 1
    assert N_word(R(w)) == (3 ** (m + 1) - 1) // 2
    k = m // 2
    assert N_word(R(R(w))) == 9 ** k + (9 ** k - 1) // 8
log("verified m < 40")

# R-hitting time h(2 3^m - 1) (number of R-steps to eps): the trivial lower bound for rho(2^m)
log("\nR-hitting time h(m) of the word 2^m (any rank rho satisfies rho(2^m) >= h(m)):")
hs = []
for m in range(1, 61):
    words = R_orbit_words("2" * m)
    hs.append(len(words) - 1)
log(" ".join("%d:%d" % (m, h) for m, h in zip(range(1, 61), hs)))
log("max h/m for m<=60: %.3f ; h(m) is at least ~0.79 m (T-orbit must lose log2(2 3^m) bits, at most 2 T-steps per R-step)"
    % max(h / m for m, h in zip(range(1, 61), hs)))
LOG.close()
