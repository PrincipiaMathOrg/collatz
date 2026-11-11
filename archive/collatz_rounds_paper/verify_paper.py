"""Prove the paper is a faithful copy: compare word-for-word against the live source.

For every round, the words of the generated Prompt and Response are compared with the words of
the regenerated prompt and the archived reply. Both sides are reduced the same way -- LaTeX and
markdown control tokens deleted, accents folded -- so anything left over is a real difference in
wording, which is exactly what must never happen here.
"""
import collections
import difflib
import re
import sys
import unicodedata

import build_paper as bp

WORD = re.compile(r"[A-Za-z]+")
ACC_BRACE = re.compile(r"\\[vcHurd=.^'`\"~]\{([A-Za-z])\}")
COLSPEC = re.compile(r"p\{[0-9.]+\\linewidth\}|@\{\}")
LINKLABEL = re.compile(r"\\(?:hyperlink|hypertarget)\{[^}]*\}")
FENCE_INFO = re.compile(r"^```[A-Za-z0-9]*", re.M)
ENV = re.compile(r"\\(?:begin|end)\{[A-Za-z*]+\}")
CMD = re.compile(r"\\[A-Za-z]+")
ACCENT_DROP = re.compile(r"\\(['\"`^~.=])")   # \'e -> e, matching the source's e-acute
ACCENT = re.compile(r"\\([^A-Za-z])")         # \_ -> _, \[ -> [ : the character is real


def words(text, drop_cites=False):
    if drop_cites:
        text = bp.CITE_RE.sub(" ", text)
    text = FENCE_INFO.sub("```", text)  # ```text is a language tag, not prose
    text = COLSPEC.sub(" ", text)       # tabular column specs are mine, not the author's
    text = LINKLABEL.sub(" ", text)     # drop the link target, keep the linked text
    text = ACC_BRACE.sub(r"\1", text)   # \v{s} -> s, matching the source's s-caron
    text = ENV.sub(" ", text)           # environment names are structure, not words
    text = ACCENT_DROP.sub("", text)    # do this before \v{s}-style leftovers are lost
    text = CMD.sub(" ", text)           # \textbf, \frac, \sum ... identical on both sides
    text = ACCENT.sub(r"\1", text)      # \_ stays an underscore
    text = text.replace("{", "").replace("}", "")
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    return WORD.findall(text)


def main():
    tex = open("collatz_rounds.tex", encoding="utf-8").read()
    files = bp.fetch_repo()
    approaches = bp.parse_approaches(files["collatz/APPROACHES.md"])
    ledger = bp.parse_ledger(files["collatz/rounds/LEDGER.tsv"])
    landed = sorted(r for r, row in ledger.items()
                    if row["status"] == "DONE"
                    and "collatz/rounds/round-%d-output.md" % r in files)

    sections = re.split(r"\n\\clearpage\n\\section\{Round (\d+): approach \d+ --- ", tex)
    got = {}
    for i in range(1, len(sections), 2):
        got[int(sections[i])] = sections[i + 1]
    print("sections found: %d" % len(got))

    bad = 0
    for rnd in landed:
        body = got[rnd]
        m = re.search(r"\\subsection\*\{Prompt\}\n\\begin\{quote\}\n(.*?)\n\\end\{quote\}",
                      body, re.S)
        gen_prompt = m.group(1) if m else ""
        m = re.search(r"\\subsection\*\{Response\}\n(.*?)"
                      r"(?=\\subsection\*\{References\}|\n\\end\{document\}|\Z)", body, re.S)
        gen_resp = m.group(1) if m else ""

        src_prompt = bp.build_prompt(int(ledger[rnd]["approach"]), approaches)
        src_resp = bp.strip_header(files["collatz/rounds/round-%d-output.md" % rnd])

        for label, a, b in (("prompt", words(src_prompt), words(gen_prompt)),
                            ("response", words(src_resp, True), words(gen_resp))):
            if a != b:
                bad += 1
                sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
                print("\nROUND %d %s DIFFERS (%d source words vs %d in paper)"
                      % (rnd, label, len(a), len(b)))
                shown = 0
                for op, i1, i2, j1, j2 in sm.get_opcodes():
                    if op != "equal" and shown < 5:
                        print("   %-7s source%-28s paper%s"
                              % (op, a[i1:i2][:6], b[j1:j2][:6]))
                        shown += 1

    total = len(landed) * 2
    print("\nword-for-word identical: %d/%d comparisons" % (total - bad, total))

    refs = collections.Counter(re.findall(r"\\hyperlink\{cit:[^}]*\}\{\\texttt\{([^}]*)\}\}", tex))
    links = len(re.findall(r"\\hyperlink\{ref:", tex))
    anchors = len(re.findall(r"\\hypertarget\{ref:", tex))
    if links < anchors or anchors != len(refs):
        print("LINK WIRING BROKEN: %d inline links, %d anchors, %d entries"
              % (links, anchors, len(refs)))
        return 1
    print("clickable citations: %d inline links -> %d reference entries, all resolved"
          % (links, anchors))
    src_cites = 0
    for rnd in landed:
        src_cites += len(bp.CITE_RE.findall(files["collatz/rounds/round-%d-output.md" % rnd]))
    print("citation markers in source: %d | distinct references listed: %d"
          % (src_cites, len(refs)))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
