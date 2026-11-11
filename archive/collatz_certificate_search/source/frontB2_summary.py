"""frontB2_summary.py -- aggregate certificates/pi_farkas_*.json into a table (stdout + logs/frontB2-summary.log)."""
import os, json, glob, sys
from fractions import Fraction
LAB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rows = []
for f in sorted(glob.glob(os.path.join(LAB, "certificates", "pi_farkas_*.json"))):
    if "v2exp" in f:
        continue
    r = json.load(open(f))
    fk = r.get("farkas", {})
    bat = r.get("battery") or {}
    ff = bat.get("first_failure")
    ffs = "-" if ff is None else ("%s m=%s" % (ff["family"], ff["failure"][1]) if isinstance(ff, dict) else str(ff))
    if bat.get("skipped"):
        ffs = "n/a"
    rows.append((r["family"], r.get("K_states"), r["s"], r.get("N_fail"), fk.get("ok"), fk.get("n_rows"), fk.get("max_row"),
                 r.get("exact_feasible_below"), (r.get("analytic_single_row") or {}).get("m"),
                 (r.get("analytic_single_row") or {}).get("exact_ok"), ffs, os.path.basename(f)))


def skey(x):
    fam = x[0]
    return (fam.split("_")[0].rstrip("0123456789"), x[1] or 0, fam, float(Fraction(x[2])))


rows.sort(key=skey)
lines = []
hdr = "%-14s %6s %5s %7s %6s %6s %7s %7s %9s %6s %-16s %s" % ("family", "K", "s", "N_fail", "cert", "rows", "maxrow", "exact<", "analytic", "an_ok", "battery1st", "file")
lines.append(hdr)
for r in rows:
    lines.append("%-14s %6s %5s %7s %6s %6s %7s %7s %9s %6s %-16s %s" % r)
# growth law for mod family
lines.append("")
lines.append("N_fail / M for family (i):")
byM = {}
for r in rows:
    if r[0].startswith("mod"):
        M = int(r[0][3:])
        byM.setdefault(M, {})[r[2]] = r[3]
S = ["0", "3/4", "1", "3/2", "2", "3"]
lines.append("%6s " % "M" + " ".join("%12s" % ("s=" + s) for s in S))
for M in sorted(byM):
    lines.append("%6d " % M + " ".join("%12s" % ("%d (%.2f)" % (byM[M][s], byM[M][s] / M) if s in byM[M] else "-") for s in S))
out = "\n".join(lines)
print(out)
open(os.path.join(LAB, "logs", "frontB2-summary.log"), "w").write(out + "\n")
