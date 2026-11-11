"""
frontB2_run.py -- driver for the Front B2 sweep.  Usage:
    python frontB2_run.py mod        (family i)
    python frontB2_run.py word       (family ii)
    python frontB2_run.py v2         (family iii automata + explicit q^{v2(n+1)})
Writes certificates/pi_farkas_*.json and appends to logs/frontB2-<family>.log.
"""
import sys, os, json, time
from fractions import Fraction
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from frontB2_pi_lp import *          # noqa
from battery import run_battery
from collatz_core import parity_word, v2

S_LIST = [Fraction(0), Fraction(3, 4), Fraction(1), Fraction(3, 2), Fraction(2), Fraction(3)]


def logger(fname):
    path = os.path.join(LOG_DIR, fname)
    os.makedirs(LOG_DIR, exist_ok=True)

    def log(msg):
        line = time.strftime("%H:%M:%S ") + msg
        print(line, flush=True)
        with open(path, "a") as fh:
            fh.write(line + "\n")
    return log


def analytic_row_check(sig, s, m):
    """Exact check that the SINGLE row m is a Gordan certificate (y = 1 on row m)."""
    ok, comb = check_farkas_lo(sig, s, {m: Fraction(1)})
    ok2, detail = check_farkas(sig, s, {m: Fraction(1)})
    return ok and ok2, {str(k): [v.numerator, v.denominator] for k, v in comb.items()}


def battery_check(sig, s, table, name):
    """run_battery kind='pi' on pi(n) = n^{-s} h(sigma(n)) (integer s only, exact)."""
    s = Fraction(s)
    if s.denominator != 1:
        return {"skipped": "non-integer s (battery needs exact comparable values)"}
    e = s.numerator

    def pi(n):
        if not isinstance(n, int):
            raise TypeError("integer only")
        st = sig(n)
        if st not in table:
            return Fraction(1, 10 ** 30)      # unseen state: tiny positive value
        return table[st] * Fraction(1, n ** e) if e else table[st]
    rep = run_battery(pi, kind="pi")
    first = rep["failures"][0] if rep["failures"] else None
    return {"ok": rep["ok"], "per_family": {k: list(v) for k, v in rep["per_family"].items()},
            "first_failure": first}


def sweep(fam, configs, cert_prefix, log):
    results = []
    for cfg in configs:
        sig, K, name, s, N_hi, extra = cfg
        t0 = time.time()
        r = run_config(sig, K, name, s, N_hi)
        fk = r.get("farkas", {})
        # analytic single-row certificate
        m_an = extra.get("analytic_row")
        if m_an is not None:
            ok_an, comb_an = analytic_row_check(sig, s, m_an)
            r["analytic_single_row"] = {"m": m_an, "exact_ok": ok_an, "components": comb_an}
        # battery on the exact table below N_fail (if any)
        if r.get("table_below"):
            tab = {}
            for k, v in r["table_below"].items():
                tab[k] = Fraction(v[0], v[1])
            # rebuild table keyed by real states
            states_all = {}
            for m in range(3, r["N_fail"]):
                for kk, _ in row_terms(m):
                    st = sig(kk)
                    states_all[str(st)] = st
            tab2 = {states_all[k]: v for k, v in tab.items() if k in states_all}
            r["battery"] = battery_check(sig, s, tab2, name)
        r.update(extra)
        results.append(r)
        log("%s s=%s K=%d N_fail=%s cert=%s rows=%s maxrow=%s exact_below=%s analytic=%s battery=%s (%.1fs)" % (
            name, s, K, r.get("N_fail"), fk.get("ok"), fk.get("n_rows"), fk.get("max_row"),
            r.get("exact_feasible_below"), r.get("analytic_single_row", {}).get("exact_ok"),
            (r.get("battery") or {}).get("first_failure", (r.get("battery") or {}).get("skipped")), time.time() - t0))
        save_cert("%s_%s_s%s.json" % (cert_prefix, name, str(s).replace("/", "over")), r)
    return results


if __name__ == "__main__":
    which = sys.argv[1]
    if which == "mod":
        log = logger("frontB2-mod.log")
        Ms = [2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 27, 32, 36, 48, 54, 64, 72, 96, 108, 144, 216, 288, 432, 864]
        extraM = [128, 256, 512, 1000, 1024, 1296, 1728, 2048] if len(sys.argv) < 3 else [int(x) for x in sys.argv[2:]]
        if len(sys.argv) >= 3:
            Ms = []
        cfgs = []
        for M in Ms + extraM:
            for s in S_LIST:
                sig, K, name = sigma_mod(M)
                cfgs.append((sig, K, name, s, 3 * M - 1, {"M": M, "analytic_row": 3 * M - 1}))
        sweep("mod", cfgs, "pi_farkas", log)
    elif which == "word":
        log = logger("frontB2-word.log")
        Ls = [int(x) for x in sys.argv[2].split(",")] if len(sys.argv) > 2 else list(range(2, 11))
        bs = [int(x) for x in sys.argv[3].split(",")] if len(sys.argv) > 3 else [0, 1, 2, 3]
        cfgs = []
        for b in bs:
            for L in Ls:
                for s in S_LIST:
                    sig, K, name = sigma_word(L, b)
                    m_an = 3 ** (b + 1) * 2 ** L - 1
                    cfgs.append((sig, K, name, s, m_an, {"L": L, "b": b, "analytic_row": m_an}))
        sweep("word", cfgs, "pi_farkas", log)
    elif which == "v2":
        log = logger("frontB2-v2.log")
        cfgs = []
        for K1 in range(1, 9):
            for s in S_LIST:
                sig, K, name = sigma_v2(K1)
                m_an = 3 * 2 ** K1 - 1
                cfgs.append((sig, K, name, s, m_an, {"K1": K1, "analytic_row": m_an}))
        for K1 in range(1, 7):
            for K2 in range(1, 5):
                for s in S_LIST:
                    sig, K, name = sigma_v2(K1, K2)
                    m_an = 3 * 2 ** (K1 + 1) - 1
                    cfgs.append((sig, K, name, s, m_an, {"K1": K1, "K2": K2, "analytic_row": m_an}))
        sweep("v2", cfgs, "pi_farkas", log)
        # explicit pi(n) = n^{-s} q^{v2(n+1)}: single row m = 2^L - 1
        out = []
        for q in [Fraction(1, 2), Fraction(2, 3), Fraction(3, 4), Fraction(9, 10), Fraction(99, 100)]:
            for s in S_LIST:
                s = Fraction(s)
                # violation iff 2^{-s} > q^L  <=>  2^{-p} > q^{L q_den} (all rational)
                p, qd = s.numerator, s.denominator
                L = 2                      # m = 2^L - 1 >= 3
                while not (Fraction(1, 2 ** p) > q ** (L * qd)):
                    L += 1
                m = 2 ** L - 1
                # exact row check with pi values: pi(2m) = (2m)^{-s} q^0, pi(m) = m^{-s} q^L, odd pred term >= 0
                # (2m)^{-s} > m^{-s} q^L  <=>  2^{-s} > q^L  (checked above)
                out.append({"q": str(q), "s": str(s), "L_fail": L, "row_m": m, "N_fail_upper": m,
                            "check": "2^{-s} > q^L exactly: (1/2)^p > q^(L*qden)", "ok": True})
                log("explicit q^{v2(n+1)}: q=%s s=%s dies at row m=2^%d-1=%d" % (q, s, L, m))
        save_cert("pi_farkas_v2exp_qpow.json", out)
