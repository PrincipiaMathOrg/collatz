"""List statements in a .tex that are not followed by a proof environment.

Used to audit the two unverified single-shot writeups that predate the campaign, so the map
records exactly which of their claims are unproved rather than calling the whole file
"unaudited".

    python audit_statements.py ../collatz_compression_framework.tex
"""
import re
import sys

STMT = r"\\(begin|end)\{(theorem|lemma|proposition|corollary|conjecture|proof)\}"


def audit(path):
    s = open(path, encoding="utf-8").read()
    toks = [(m.start(), m.group(1), m.group(2)) for m in re.finditer(STMT, s)]
    pending = None
    unproved = []
    for pos, kind, name in toks:
        if kind != "begin":
            continue
        if name == "proof":
            pending = None
        elif name == "conjecture":
            pending = None                      # a conjecture is not expected to have a proof
        else:
            if pending:
                unproved.append(pending)
            pending = (pos, name)
    if pending:
        unproved.append(pending)

    print("==== %s" % path)
    for pos, name in unproved:
        line = s[:pos].count("\n") + 1
        excerpt = re.sub(r"\s+", " ", s[pos:pos + 200])
        print("  UNPROVED  %-12s line %-5d %s" % (name, line, excerpt[:150]))
    print("  %d statement(s) without a proof environment" % len(unproved))
    return len(unproved)


if __name__ == "__main__":
    for p in sys.argv[1:]:
        audit(p)
