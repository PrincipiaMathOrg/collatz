"""Path-length spectrum of the zero-trace graph, as input to designing a search past k=19.

Round 1's directive asks for depths 20 to 30 by enumerating ternary words of length k+L_k. That
enumeration is 3^(k+L) and is hopeless here: 3^20 alone is 3.5e9. This script measures the object
that decides whether a smarter search is possible -- for each depth k and each L, the number of
vertices of Z_k from which a path of length at least L starts.

The heuristic to test. A vertex x of Z_k continues for L more steps exactly when F^k(x) survives L
further steps, which is a condition on F^k(x) modulo 64^L satisfied by 3^L of the 64^L residues.
If F^k is equidistributed modulo 64^L, then

    #{x in S_k : path length >= L}  ~  3^k (3/64)^L.

At k=19, L=6 that predicts about 16 surviving vertices out of 1.16e9 -- a target set small enough
that a search which reaches it WITHOUT enumerating all 3^k vertices would settle depths past 19
cheaply. Measuring the constant is the point: it tells the next round whether to invest in such a
search and what count to expect.

    python zt_pathspectrum.py 13
"""
import sys

from zt_independent import F, walk

def spectrum(kmax):
    pow64 = [64 ** n for n in range(kmax + 2)]
    pow81 = [81 ** n for n in range(kmax + 2)]
    counts = {k: {} for k in range(1, kmax + 1)}          # k -> {path length -> how many vertices}

    def dfs(n, R, Q):
        if n and R:
            length = walk(R, Q, pow64[n])
            counts[n][length] = counts[n].get(length, 0) + 1
        if n == kmax:
            return
        from zt_independent import STEP
        for t in range(64):
            mid = Q + t * pow81[n]
            e = STEP.get(mid & 63)
            if e is None:
                continue
            dfs(n + 1, R + t * pow64[n], (81 * mid + e) // 64)

    sys.setrecursionlimit(10000)
    dfs(0, 0, 0)
    return counts


def main():
    kmax = int(sys.argv[1]) if len(sys.argv) > 1 else 13
    counts = spectrum(kmax)
    print("For each depth k: N(L) = number of nonzero vertices whose path has length >= L,")
    print("against the equidistribution prediction 3^k (3/64)^L.\n")
    print("  k   L   N(L)        predicted   ratio")
    for k in range(1, kmax + 1):
        dist = counts[k]
        total = sum(dist.values())
        maxlen = max(dist)
        for L in range(1, maxlen + 1):
            n = sum(c for length, c in dist.items() if length >= L)
            pred = 3 ** k * (3 / 64) ** L
            print("%3d %3d %10d %12.3f %8.2f" % (k, L, n, pred, (n / pred) if pred else 0))
        print("      depth %d: %d nonzero vertices, longest path %d" % (k, total, maxlen))
    return 0


if __name__ == "__main__":
    sys.exit(main())
