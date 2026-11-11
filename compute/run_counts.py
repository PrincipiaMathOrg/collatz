"""Round 3 interround compute, item (b): exact N(k,L) for the twelve cells round 2 asked for.

Round 2 wants counts, not existence, because the pinned fibre C_{k,L}(0) = N(k,L)+1 is the object
its target is about -- l_k only records whether N is zero, which throws away exactly the quantity
the pinned-carry statement predicts. Cells are run cheapest first (cost is 3^(m-15) with the
streaming split) so the table fills in progressively and a kill costs only the tail of the list.

Records per cell, as directed: count, C_{k,L}(0), a witness when positive, the split h, elapsed
wall-clock and peak memory where available.
"""
import gc
import hashlib
import json
import os
import sys
import time

from zt_mitm_deep import count_paths, confirm_witness

CELLS = [(20, 7), (20, 8), (21, 7), (21, 8), (22, 7), (22, 8),
         (23, 7), (23, 8), (24, 7), (24, 8), (25, 8), (25, 9)]

# keep the tail at 3^15 (~780 MB here) and stream the head; h = m-15 once m-15 >= L
def split_for(k, L):
    m = k + L
    h = m - 15
    return max(h, L) if m - max(h, L) <= 15 else h


def peak_mb():
    try:
        import psutil
        return psutil.Process().memory_info().rss / 1e6
    except Exception:
        return -1.0


def main():
    # Resumable: a run that was killed (or OOMed) keeps every cell it already finished, because
    # counts_table.json is rewritten after each one. Reload it and skip what is done.
    here = os.path.dirname(__file__)
    done_path = os.path.join(here, "counts_table.json")
    out = []
    if os.path.exists(done_path):
        try:
            out = json.load(open(done_path))
        except Exception:
            out = []
    have = {(c["k"], c["L"]) for c in out}
    todo = [c for c in CELLS if c not in have]
    print("resuming: %d cell(s) already done, %d to go -> %s" % (len(have), len(todo), todo))

    src = open(os.path.join(os.path.dirname(__file__), "zt_mitm_deep.py"), "rb").read()
    print("zt_mitm_deep.py SHA-256: %s" % hashlib.sha256(src).hexdigest())
    print("Python %s" % sys.version.split()[0])
    print()
    print("  k   L    m    h        N(k,L)   C_{k,L}(0)   secs   witness ok")
    sys.stdout.flush()
    for k, L in todo:
        h = split_for(k, L)
        t0 = time.time()
        r = count_paths(k, L, h=h)
        dt = time.time() - t0
        # count_paths and tail_gammas each define a self-referential inner dfs, so the frame
        # holding the 3^15-element gamma list sits in a reference cycle and is NOT freed on
        # return -- only the cycle collector can reclaim it. Without this the process grew past
        # 5 GB by the (24,8) cell and would have risked an OOM on (25,8)/(25,9). Collect
        # explicitly between cells; it costs milliseconds against runs of minutes to hours.
        gc.collect()
        wok = "-"
        wit = None
        if r["witnesses"]:
            wit = r["witnesses"][0]
            good, _ = confirm_witness(wit, k, L)
            wok = "PASS" if good else "FAIL"
        print("%3d %3d %4d %4d %13d %12d %6.1f   %s"
              % (k, L, k + L, r["h"], r["N"], r["C0"], dt, wok))
        sys.stdout.flush()
        out.append({"k": k, "L": L, "m": k + L, "h": r["h"], "N": r["N"], "C0": r["C0"],
                    "secs": round(dt, 1), "witness": str(wit) if wit else None,
                    "witness_check": wok, "peak_rss_mb": round(peak_mb(), 1)})
        with open(os.path.join(os.path.dirname(__file__), "counts_table.json"), "w") as f:
            json.dump(out, f, indent=1)
    return 0


if __name__ == "__main__":
    sys.exit(main())
