"""Integrity gate for a harvested round .tex.

A round is only committed if this passes. It is aimed at exactly the failure modes that
destroyed mathematics in the earlier markdown-harvest pipeline: eaten \\[ \\] delimiters,
setext scars from a reparsed rule, truncation, and unproved theorem statements.

    python check_tex.py ../rounds/round-1.tex
"""
import re
import sys
import unicodedata

# Findings quote the offending characters, which are non-ascii by definition; the Windows console
# is cp1252 and would raise UnicodeEncodeError while reporting them, turning a caught problem into
# a crash. Degrade those characters in the report rather than losing the report.
try:
    sys.stdout.reconfigure(errors="backslashreplace")
except AttributeError:
    pass

STATEMENTS = ("theorem", "lemma", "proposition", "corollary")
UNICODE_MATH = "≤≥≠∈∉⊂⊆∑∏∫√∞αβγδεθλμνπρσφχψωΓΔΘΛΞΠΣΦΨΩ→←⇒⇔∀∃¬∧∨≈≡⌊⌋⌈⌉"


def check(path):
    raw = open(path, encoding="utf-8").read()
    fails, warns = [], []

    body = raw.lstrip("\ufeff").strip()
    if not body.startswith("\\documentclass"):
        fails.append("does not begin with \\documentclass (harvest lost the preamble)")
    if "\\end{document}" not in body:
        fails.append("no \\end{document} -- the answer is truncated")
    elif body.splitlines()[-1].strip() != "\\end{document}":
        warns.append("trailing content after \\end{document}")

    if "```" in raw:
        fails.append("stray triple-backtick -- the code fence leaked into the file")

    for pat, why in (
        (r"^\s*={4,}\s*$", "setext scar (====) -- markdown reparsed a rule; harvest was rendered, not raw"),
        (r"^\s*-{4,}\s*$", "setext scar (----) -- same cause"),
    ):
        if re.search(pat, raw, re.M):
            fails.append(why)

    # the mangled-delimiter signature: a display that lost its \[ \] and now sits as a bare
    # bracketed line containing TeX control sequences.
    for m in re.finditer(r"^\s*\[[^\]\n]*\\[a-zA-Z]+[^\]\n]*\]\s*$", raw, re.M):
        fails.append("bare [ ... ] display line with TeX macros -- eaten \\[ \\] delimiters: %r"
                     % m.group(0)[:60])
        break

    if re.search(r"\\\(|\\\)", raw) is None and re.search(r"\$", raw) is None:
        warns.append("no inline math at all -- suspicious for a research round")

    envs = {}
    for kind, name in re.findall(r"\\(begin|end)\{([A-Za-z*]+)\}", raw):
        envs.setdefault(name, [0, 0])[0 if kind == "begin" else 1] += 1
    for name, (b, e) in sorted(envs.items()):
        if b != e:
            fails.append("environment %s unbalanced: %d begin, %d end" % (name, b, e))

    n_stat = sum(envs.get(s, [0, 0])[0] for s in STATEMENTS)
    n_proof = envs.get("proof", [0, 0])[0]
    if n_stat and n_proof < n_stat:
        warns.append("%d statements but only %d proofs -- check each uncovered statement is "
                     "explicitly conditional (output-contract violation otherwise)" % (n_stat, n_proof))

    for phrase in ("we omit the details", "standard argument", "similar to the above",
                   "one checks easily", "left to the reader", "as in the previous round"):
        if phrase in raw.lower():
            warns.append("proof-skipping phrase present: %r" % phrase)

    if not re.search(r"[Nn]ext-round directive", raw):
        fails.append("no Next-round directive section -- the self-driving loop has no next prompt")

    if "\u2028" in raw or "\u2029" in raw:
        fails.append("U+2028/U+2029 line separators present")
    bad = sorted({c for c in raw if c in UNICODE_MATH})
    if bad:
        warns.append("unicode mathematics present (%s) -- will not compile reliably"
                     % " ".join("%s=U+%04X" % (c, ord(c)) for c in bad[:8]))
    other = sorted({c for c in raw if ord(c) > 127 and c not in UNICODE_MATH
                    and unicodedata.category(c) not in ("Zs",)})
    if other:
        warns.append("other non-ascii: %s" % " ".join(repr(c) for c in other[:10]))

    print("FILE     %s  (%d chars, %d lines)" % (path, len(raw), raw.count("\n") + 1))
    print("COUNTS   statements=%d proofs=%d displays=%d"
          % (n_stat, n_proof, len(re.findall(r"\\\[", raw)) + envs.get("align", [0, 0])[0]
             + envs.get("align*", [0, 0])[0] + envs.get("equation", [0, 0])[0]))
    for w in warns:
        print("WARN     " + w)
    for f in fails:
        print("FAIL     " + f)
    print("VERDICT  " + ("PASS" if not fails else "FAIL"))
    return 0 if not fails else 1


if __name__ == "__main__":
    sys.exit(max(check(p) for p in sys.argv[1:]))
