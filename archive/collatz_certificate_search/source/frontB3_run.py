"""
frontB3_run.py -- driver for the B3b grid.  Resumable: one JSON per (mode, family) in
certificates/; existing files are skipped.  Sharded over workers.
  python frontB3_run.py --mode main  --worker 0 --nworkers 4 --timeout 600
  modes: main  (level R: orbit pool n<=10^4 + battery + F-A stopping segments L<=30)
         lfail (level R: F-A stopping segments only, L increasing -> L_fail)
         mixed (eleven-rule canonical strings, all rule applications, with/without the odd rule)
Logs: logs/frontB3-b-<mode>-w<worker>.log
"""
import sys, os, json, time, argparse
sys.path.insert(0, ".")
import frontB3_search as FS
from frontB3_search import *
from collatz_core import T
from rewrite11 import tern_word, R, val, bin_string

ap = argparse.ArgumentParser()
ap.add_argument("--mode", default="main")
ap.add_argument("--worker", type=int, default=0)
ap.add_argument("--nworkers", type=int, default=1)
ap.add_argument("--timeout", type=int, default=600, help="per SAT call, seconds")
ap.add_argument("--budget", type=int, default=3600, help="per family, seconds")
ap.add_argument("--only", default="", help="comma list of family names to run")
args = ap.parse_args()

CERT = "../certificates"
os.makedirs(CERT, exist_ok=True)
FS.LOGF = open("../logs/frontB3-b-%s-w%d.log" % (args.mode, args.worker), "a", encoding="utf-8")
log("=== start mode=%s worker=%d/%d timeout=%d budget=%d %s" % (
    args.mode, args.worker, args.nworkers, args.timeout, args.budget, time.strftime("%Y-%m-%d %H:%M:%S")))


def fa_R_stopping(L):
    """R-instances of the T-orbit of 2^L - 1 down to the first value < 2^L - 1."""
    n = (1 << L) - 1
    seg = [n]
    x = n
    while x >= n:
        x = T(x); seg.append(x)
    return R_instances_from_segment(seg)


def fa_mixed_stopping(L):
    n = (1 << L) - 1
    return pool_mixed(1, extra_seeds=[n], stop_at_value=True)


def grid(mode):
    fams = []
    if mode in ("main", "lfail"):
        for lab in ("plain", "c1", "c12", "r", "c1r"):
            for d in (1, 2, 3, 4):
                for K in (1, 2, 3):
                    if lab == "c12" and d == 4:
                        continue
                    if lab == "c1r" and d >= 3:
                        continue
                    if lab == "r" and d == 4:
                        continue
                    fams.append(Family("R", d, K, lab, Rcap=3))
    else:
        for odd in (False, True):
            for d in (1, 2, 3, 4):
                for K in (1, 2, 3):
                    f = Family("mixed", d, K, "plain")
                    f.odd = odd
                    fams.append(f)
    # order by size (variables) so cheap families come first
    fams.sort(key=lambda f: (f.nvars() * f.K, f.d))
    return fams


def fam_key(fam):
    k = fam.name()
    if fam.level == "mixed":
        k += "-odd" if fam.odd else "-noodd"
    return k


def write_cert(mode, fam, status, data, extra=None):
    out = {"mode": mode, "family": fam_key(fam), "level": fam.level, "dim": fam.d, "K": fam.K,
           "lab": fam.lab, "Rcap": fam.Rcap, "status": status, "time_s": round(data.get("time", 0), 1),
           "rounds": data.get("rounds"), "bitwidth": data.get("W"), "reason": data.get("reason")}
    if fam.level == "mixed":
        out["odd_rule_included"] = fam.odd
    if status == "UNSAT":
        out["refuting_instances"] = [[a, b] for a, b in data["instances"]]
        out["n_instances"] = len(data["instances"])
        out["max_len"] = max(len(a) for a, b in data["instances"])
        out["claim"] = ("no rank rho(w) = alpha^T M_{l1}...M_{lq} beta of this class (dimension %d, "
                        "coefficients 0..%d, letters %s) satisfies rho(w) > rho(w') on all listed instances"
                        % (fam.d, fam.K, fam.lab))
    elif status == "SAT":
        out["params"] = {repr(k): v for k, v in data["params"].items()}
        out["instances_used"] = len(data["instances"])
    if extra:
        out.update(extra)
    with open(os.path.join(CERT, "frontB3-%s-%s.json" % (mode, fam_key(fam))), "w") as f:
        json.dump(out, f, indent=1)


# ------------------------------------------------------------------ pools
if args.mode == "main":
    POOL = pool_R_orbits(10 ** 4)
    B, tags = pool_R_battery(max_len=40)
    POOL += B
    for L in range(2, 31):
        POOL += fa_R_stopping(L)
    POOL = sorted(set(POOL), key=lambda p: (len(p[0]), p[0], p[1]))
    log("main pool: %d instances, max len %d" % (len(POOL), max(len(a) for a, b in POOL)))
elif args.mode == "lfail":
    FA = {L: fa_R_stopping(L) for L in range(2, 41)}
elif args.mode == "mixed":
    POOLM = pool_mixed(2000)
    for L in range(2, 31):
        POOLM += fa_mixed_stopping(L)
    POOLM = sorted(set(POOLM), key=lambda p: (len(p[0]), p[0], p[1]))
    log("mixed pool: %d instances, max len %d" % (len(POOLM), max(len(a) for a, b in POOLM)))


def run_family(fam):
    key = fam_key(fam)
    path = os.path.join(CERT, "frontB3-%s-%s.json" % (args.mode, key))
    if os.path.exists(path):
        log("skip", key, "(done)")
        return
    log("--- family", key, "nvars", fam.nvars())
    t0 = time.time()
    if args.mode == "main":
        st, data = cegis(fam, POOL, timeout_s=args.timeout, quiet=False, budget_s=args.budget)
        extra = {}
        if st == "SAT":
            P = data["params"]
            v, cnt = exact_verify_R(fam, P, 10 ** 6)
            vb = exact_verify_battery(fam, P)
            extra = {"exact_check_n_le_1e6_first_violation": v, "n_instances_checked": cnt,
                     "battery_first_violation": vb}
            log("   SAT on pool!  exact check n<=1e6:", v, "battery:", vb)
        log("   RESULT", key, st, "rounds", data.get("rounds"), "|inst|", len(data["instances"]),
            "maxlen", max(len(a) for a, b in data["instances"]), "W", data.get("W"),
            "%.1fs" % data.get("time", 0), data.get("reason", ""))
        if st == "UNSAT":
            log("   core:", data["instances"])
        write_cert(args.mode, fam, st, data, extra)
    elif args.mode == "lfail":
        res = {}
        pool = []
        Lfail = None
        last = None
        for L in range(2, 41):
            pool = pool + FA[L]
            if time.time() - t0 > args.budget:
                res[L] = "BUDGET"; break
            st, data = cegis(fam, pool, timeout_s=args.timeout, quiet=True, budget_s=max(60, args.budget - (time.time() - t0)))
            res[L] = st
            last = (L, st, data)
            log("   L=%d %s |inst|=%d maxlen=%d rounds=%s %.1fs" % (
                L, st, len(data["instances"]), max(len(a) for a, b in data["instances"]),
                data.get("rounds"), data.get("time", 0)))
            if st == "UNSAT":
                Lfail = L
                break
            if st == "UNKNOWN":
                break
        L, st, data = last if last else (None, "BUDGET", {"instances": [], "time": 0})
        log("   RESULT", key, "L_fail =", Lfail, "history", res)
        write_cert(args.mode, fam, st, data, {"L_fail": Lfail, "history": {str(k): v for k, v in res.items()},
                                              "L_reached": L})
    elif args.mode == "mixed":
        pool = POOLM
        if not fam.odd:
            pool = [(a, b) for a, b in POOLM if not (a and a[-1] == "t" and b == a[:-1] + "2")]
        st, data = cegis(fam, pool, timeout_s=args.timeout, quiet=False, budget_s=args.budget)
        extra = {}
        if st == "SAT":
            P = data["params"]
            # exact check on all rewrites from n <= 20000 (both schedules), and F-A runs to L=40
            bigpool = pool_mixed(20000)
            for L in range(2, 41):
                bigpool += fa_mixed_stopping(L)
            if not fam.odd:
                bigpool = [(a, b) for a, b in bigpool if not (a and a[-1] == "t" and b == a[:-1] + "2")]
            v = None
            for a, b in bigpool:
                if fam.rho_int(P, a) <= fam.rho_int(P, b):
                    v = (a, b); break
            extra = {"exact_check_first_violation": v, "n_checked": len(bigpool)}
            log("   SAT on pool!  exact check on n<=20000 + F-A L<=40:", v)
        log("   RESULT", key, st, "rounds", data.get("rounds"), "|inst|", len(data["instances"]),
            "maxlen", max(len(a) for a, b in data["instances"]), "W", data.get("W"),
            "%.1fs" % data.get("time", 0), data.get("reason", ""))
        if st == "UNSAT":
            log("   core:", data["instances"])
        write_cert(args.mode, fam, st, data, extra)


fams = grid(args.mode)
if args.only:
    names = set(args.only.split(","))
    fams = [f for f in fams if fam_key(f) in names]
mine = [f for i, f in enumerate(fams) if i % args.nworkers == args.worker]
log("families for this worker:", [fam_key(f) for f in mine])
for f in mine:
    try:
        run_family(f)
    except Exception as e:
        import traceback
        log("   ERROR in", fam_key(f), repr(e), traceback.format_exc()[-500:])
log("=== done", time.strftime("%Y-%m-%d %H:%M:%S"))
