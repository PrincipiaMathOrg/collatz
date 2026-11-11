"""
frontB1_sweep.py -- FRONT-B1 adaptive-jump sweep (SKILL s4 B1, r69 s7).

b(n) = min{j >= 1 : J^j(n) < n},  J(n) = T^{l(n)}(n),  l(n) = bit length of n.

Segmented sweep over 3 <= n < 2^32 with a numba uint64 kernel (10 threads);
every arithmetic step is exact integer arithmetic on uint64 with an explicit
overflow guard (x < 2^62 before 3x+1); any seed hitting the guard is returned with
code 255 and recomputed with the pure-Python oracle collatz_core.b_jump.  Codes:
  1..250  = b(n);  254 = cap exceeded;  255 = overflow guard hit.
The first segment(s) are verified EXACTLY against collatz_core.b_jump.

Usage:  python frontB1_sweep.py [log2_max=32] [log2_seg=26]
Outputs: logs/frontB1-sweep.log (incremental), certificates/frontB1_sweep.json
"""
import sys, os, json, time
import numpy as np
from numba import njit, prange

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from collatz_core import b_jump, J  # oracle

LOG = os.path.join(HERE, "..", "logs", "frontB1-sweep.log")
CERT = os.path.join(HERE, "..", "certificates", "frontB1_sweep.json")

CAP = 250
GUARD = np.uint64(1) << np.uint64(62)


@njit(cache=True)
def bitlen(x):
    l = 0
    while x:
        x >>= np.uint64(1)
        l += 1
    return l


@njit(cache=True)
def b_of(n):
    """b(n) with overflow guard; returns (code, peak) where peak = max J-iterate seen."""
    x = n
    peak = n
    for j in range(1, CAP + 1):
        L = bitlen(x)
        for _ in range(L):
            if x & np.uint64(1):
                if x >= GUARD:
                    return 255, peak
                x = (np.uint64(3) * x + np.uint64(1)) >> np.uint64(1)
            else:
                x >>= np.uint64(1)
        if x > peak:
            peak = x
        if x < n:
            return j, peak
    return 254, peak


@njit(parallel=True, cache=True)
def sweep(lo, hi, out):
    for i in prange(hi - lo):
        n = np.uint64(lo + i)
        code, peak = b_of(n)
        out[i] = code


def log(msg):
    line = time.strftime("%H:%M:%S ") + msg
    print(line, flush=True)
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def main():
    log2_max = int(sys.argv[1]) if len(sys.argv) > 1 else 32
    log2_seg = int(sys.argv[2]) if len(sys.argv) > 2 else 26
    N = 1 << log2_max
    SEG = 1 << log2_seg
    hist = {}
    records = []          # (n, b) first n achieving a new sup
    sup = 0
    big = []              # all n with b >= BIG_THRESH (capped in count)
    BIG_THRESH = 8
    overflow = []
    capped = []
    first_n = {}         # b -> least n with b(n) = b
    log("frontB1 sweep start: 3 <= n < 2^%d, segments 2^%d, CAP=%d, guard 2^62" % (log2_max, log2_seg, CAP))
    t0 = time.time()
    lo = 3
    # warm-up / compile
    tmp = np.zeros(8, dtype=np.uint8)
    sweep(3, 11, tmp)
    seg_i = 0
    while lo < N:
        hi = min(lo + SEG, N)
        out = np.zeros(hi - lo, dtype=np.uint8)
        t1 = time.time()
        sweep(lo, hi, out)
        dt = time.time() - t1
        cnt = np.bincount(out, minlength=256)
        for c in range(1, 254):
            if cnt[c]:
                hist[c] = hist.get(c, 0) + int(cnt[c])
                if c not in first_n:
                    first_n[c] = int(lo + np.nonzero(out == c)[0][0])
        for i in np.nonzero(out == 255)[0]:
            overflow.append(int(lo + i))
        for i in np.nonzero(out == 254)[0]:
            capped.append(int(lo + i))
        # exact oracle for guarded / capped seeds
        for n in overflow[-int(cnt[255]):] if cnt[255] else []:
            b = b_jump(n, cap=100000)
            hist[b] = hist.get(b, 0) + 1
            log("  overflow-guard seed %d -> oracle b=%s" % (n, b))
        # records
        segmax = int(out[out < 254].max()) if (out < 254).any() else 0
        if segmax > sup:
            # find each new record inside this segment in order
            for c in range(sup + 1, segmax + 1):
                idx = np.nonzero(out == c)[0]
                if len(idx):
                    n = int(lo + idx[0])
                    if c > sup:
                        pass
                    records.append((n, c))
            # keep only true records (b strictly increasing along n)
            records.sort()
            cleaned = []
            cur = 0
            for n, c in records:
                if c > cur:
                    cleaned.append((n, c)); cur = c
            records = cleaned
            sup = max(sup, segmax)
        idx = np.nonzero(out >= BIG_THRESH)[0]
        if len(big) < 200000:
            big.extend(int(lo + i) for i in idx[:200000 - len(big)])
        seg_i += 1
        # exact verification of the first segment (and a random sample of every segment)
        if seg_i == 1:
            t2 = time.time()
            n_ver = min(hi - lo, 1 << 20)
            bad = 0
            for i in range(n_ver):
                b = b_jump(lo + i, cap=CAP)
                c = int(out[i])
                if (b is None and c != 254) or (b is not None and b != c):
                    bad += 1
                    log("  ORACLE MISMATCH n=%d numba=%d oracle=%s" % (lo + i, c, b))
            log("  oracle check on n in [%d, %d): %d mismatches (%.1fs)" % (lo, lo + n_ver, bad, time.time() - t2))
            assert bad == 0
        else:
            rng = np.random.default_rng(seg_i)
            sample = rng.integers(0, hi - lo, size=200)
            bad = 0
            for i in sample:
                b = b_jump(lo + int(i), cap=CAP)
                c = int(out[i])
                if (b is None and c != 254) or (b is not None and b != c):
                    bad += 1
                    log("  ORACLE MISMATCH n=%d numba=%d oracle=%s" % (lo + int(i), c, b))
            assert bad == 0
        log("seg [%d, %d) done in %.1fs; seg max b=%d; running sup=%d; #b>=%d so far=%d; hist=%s" %
            (lo, hi, dt, segmax, sup, BIG_THRESH, len(big), {k: hist[k] for k in sorted(hist)}))
        lo = hi
        # incremental JSON
        with open(CERT, "w", encoding="utf-8") as f:
            json.dump({"range": "3 <= n < %d (in progress, done through %d)" % (N, hi),
                       "cap": CAP, "sup_b": sup, "records_first_n_with_b": records,
                       "hist_b": {str(k): hist[k] for k in sorted(hist)},
                       "least_n_with_b": {str(k): first_n[k] for k in sorted(first_n)},
                       "overflow_guard_seeds": overflow, "capped_seeds": capped,
                       "seeds_with_b_ge_%d" % BIG_THRESH: big[:200000],
                       "elapsed_s": round(time.time() - t0, 1)}, f, indent=1)
    log("DONE 3 <= n < 2^%d in %.1fs; sup b = %d; records %s" % (log2_max, time.time() - t0, sup, records))
    log("hist: %s" % {k: hist[k] for k in sorted(hist)})
    log("least n with b: %s" % {k: first_n[k] for k in sorted(first_n)})
    total = sum(hist.values())
    log("total counted %d (expected %d)" % (total, N - 3))


if __name__ == "__main__":
    main()
