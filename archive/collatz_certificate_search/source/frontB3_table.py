"""frontB3_table.py -- summarise certificates/frontB3-*.json as a markdown table (stdout)."""
import json, glob, os, sys
sys.path.insert(0, ".")
rows = []
for f in sorted(glob.glob("../certificates/frontB3-*.json")):
    d = json.load(open(f))
    mode = d["mode"]
    fam = d["family"]
    st = d["status"]
    n = d.get("n_instances") or d.get("instances_used")
    ml = d.get("max_len")
    lf = d.get("L_fail")
    ex = d.get("exhaustive_check", "")
    reason = d.get("reason") or ""
    t = d.get("time_s")
    extra = ""
    if st == "SAT":
        extra = "exact check: %s" % (d.get("exact_check_n_le_1e6_first_violation") or d.get("exact_check_first_violation") or "no violation")
    rows.append((mode, fam, st, n, ml, lf, ex, reason, t, extra, os.path.basename(f)))
print("| mode | class (level-dim-K-labels) | result | #instances in refutation | max word length | L_fail | exhaustive | note | time s | file |")
print("|---|---|---|---|---|---|---|---|---|---|")
for r in rows:
    print("| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s |" % (
        r[0], r[1], r[2], r[3], r[4], r[5] if r[5] is not None else "", r[6], (r[7] + " " + r[9]).strip(), r[8], r[10]))
