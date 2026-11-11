"""Assemble the landed Collatz campaign rounds into one LaTeX paper.

Nothing here rewrites, summarises or reorders a single word. Prompts are regenerated from
APPROACHES.md by the same slicing rule as collatz/scripts/make_approach_prompt.py and then gated
on the recorded SHA-256, so "verbatim" is proved rather than asserted. Outputs are the archived
replies with only their provenance header removed; the rest is a markdown -> LaTeX transcription.

Everything is pulled live from GitHub. No local clone is used.

    python build_paper.py [outfile]
"""
import base64
import collections
import hashlib
import io
import json
import re
import subprocess
import sys
import tarfile

REPO = "antoshashakov/Principia-Math-In-Progress"
PROBLEM = "Collatz conjecture"
MIDDOT = chr(0xB7)
CITE_OPEN, CITE_END, CITE_SEP = chr(0xE200), chr(0xE201), chr(0xE202)

BOLD_O, BOLD_C, IT_O, IT_C = "\x01", "\x02", "\x03", "\x04"
TEXT_EXT = {"md", "json", "tsv", "txt", "tex", "py", "js", "sh", "log", "toml"}


# --------------------------------------------------------------------------- fetch

def fetch_repo():
    """Whole repo, one API call. Per-file contents calls were unreliable under volume."""
    r = subprocess.run(["gh", "api", "repos/%s/tarball/main" % REPO],
                       capture_output=True, timeout=900)
    if r.returncode != 0:
        raise SystemExit("gh api failed: %s" % r.stderr.decode("utf-8", "replace")[:400])
    tf = tarfile.open(fileobj=io.BytesIO(r.stdout), mode="r:gz")
    files = {}
    for m in tf.getmembers():
        if m.isfile():
            path = m.name.split("/", 1)[1]
            if path.startswith("collatz/") and path.rsplit(".", 1)[-1] in TEXT_EXT:
                files[path] = tf.extractfile(m).read().decode("utf-8")
    return files


# --------------------------------------------------------------------------- prompts

def parse_approaches(text):
    parts = re.split(r"^### (\d+)\. (.+)$", text, flags=re.M)
    out = {}
    for i in range(1, len(parts), 3):
        body = re.split(r"^---\s*$", parts[i + 2], flags=re.M)[0]
        out[int(parts[i])] = (parts[i + 1].strip(), body.strip())
    return out


def front_of(body):
    m = re.search(r"^\*\*(.+?)\*\*\s*$", body, flags=re.M)
    tag = m.group(1) if m else ""
    right = tag.split(MIDDOT)[-1].strip() if MIDDOT in tag else ""
    if right.startswith("D") and not right.startswith("D/P"):
        return "disproof"
    return "proof"


def build_prompt(k, approaches):
    title, body = approaches[k]
    return ("Complete a full %s of the %s using the following approach:\n\n"
            "%d. %s\n\n%s\n\nTake as long as you need."
            % (front_of(body), PROBLEM, k, title, body))


def parse_ledger(text):
    rows = {}
    lines = text.strip().split("\n")
    head = lines[0].split("\t")
    for line in lines[1:]:
        cells = line.split("\t")
        row = dict(zip(head, cells))
        rows[int(row["round"])] = row
    return rows


# --------------------------------------------------------------------------- escaping

UNICODE_MAP = {
    "\u2014": r"\textemdash{}", "\u2013": r"\textendash{}", "\u2012": r"\textendash{}",
    "\u2011": r"\nobreakdash-", "\u2010": "-", "\u2212": r"\ensuremath{-}",
    "\u201c": "``", "\u201d": "''", "\u2018": "`", "\u2019": "'",
    "\u2026": r"\ldots{}", "\u00a0": "~", "\u00b7": r"\textperiodcentered{}",
    "\u220e": r"\ensuremath{\blacksquare}", "\u00d7": r"\ensuremath{\times}",
    "\u2192": r"\ensuremath{\rightarrow}", "\u2194": r"\ensuremath{\leftrightarrow}",
    "\u21a6": r"\ensuremath{\mapsto}", "\u2261": r"\ensuremath{\equiv}",
    "\u2264": r"\ensuremath{\leq}", "\u2265": r"\ensuremath{\geq}",
    "\u2260": r"\ensuremath{\neq}", "\u2248": r"\ensuremath{\approx}",
    "\u221e": r"\ensuremath{\infty}", "\u2229": r"\ensuremath{\cap}",
    "\u222a": r"\ensuremath{\cup}", "\u2208": r"\ensuremath{\in}",
    "\u2286": r"\ensuremath{\subseteq}", "\u2282": r"\ensuremath{\subset}",
    "\u2211": r"\ensuremath{\sum}", "\u220f": r"\ensuremath{\prod}",
    "\u221a": r"\ensuremath{\sqrt{}}", "\u00b1": r"\ensuremath{\pm}",
    "\u00bd": r"\ensuremath{\tfrac12}", "\u2032": r"\ensuremath{'}",
    "\u03b1": r"\ensuremath{\alpha}", "\u03b2": r"\ensuremath{\beta}",
    "\u03b3": r"\ensuremath{\gamma}", "\u03b4": r"\ensuremath{\delta}",
    "\u03b5": r"\ensuremath{\varepsilon}", "\u03b8": r"\ensuremath{\theta}",
    "\u03bb": r"\ensuremath{\lambda}", "\u03bc": r"\ensuremath{\mu}",
    "\u03bd": r"\ensuremath{\nu}", "\u03c0": r"\ensuremath{\pi}",
    "\u03c1": r"\ensuremath{\rho}", "\u03c3": r"\ensuremath{\sigma}",
    "\u03c4": r"\ensuremath{\tau}", "\u03c6": r"\ensuremath{\varphi}",
    "\u03c7": r"\ensuremath{\chi}", "\u03c8": r"\ensuremath{\psi}",
    "\u03c9": r"\ensuremath{\omega}", "\u0393": r"\ensuremath{\Gamma}",
    "\u0394": r"\ensuremath{\Delta}", "\u039b": r"\ensuremath{\Lambda}",
    "\u03a3": r"\ensuremath{\Sigma}", "\u03a9": r"\ensuremath{\Omega}",
    "\u2115": r"\ensuremath{\mathbb{N}}", "\u2124": r"\ensuremath{\mathbb{Z}}",
    "\u211a": r"\ensuremath{\mathbb{Q}}", "\u211d": r"\ensuremath{\mathbb{R}}",
    "\u00e9": r"\'e", "\u00e8": r"\`e", "\u00ea": r"\^e", "\u00eb": r'\"e',
    "\u00e1": r"\'a", "\u00e0": r"\`a", "\u00e2": r"\^a", "\u00e4": r'\"a',
    "\u00e5": r"\aa{}", "\u00f3": r"\'o", "\u00f2": r"\`o", "\u00f4": r"\^o",
    "\u00f6": r'\"o', "\u00f8": r"\o{}", "\u00fa": r"\'u", "\u00fc": r'\"u',
    "\u00fd": r"\'y", "\u00ed": r"\'i", "\u00ef": r'\"i', "\u00f1": r"\~n",
    "\u00e7": r"\c{c}", "\u0107": r"\'c", "\u010d": r"\v{c}", "\u010c": r"\v{C}",
    "\u0161": r"\v{s}", "\u0160": r"\v{S}", "\u015b": r"\'s", "\u017e": r"\v{z}",
    "\u017c": r"\.z", "\u017a": r"\'z", "\u0141": r"\L{}", "\u0142": r"\l{}",
    "\u00df": r"\ss{}", "\u0151": r"\H{o}", "\u0171": r"\H{u}", "\u00c9": r"\'E",
    "\u00d6": r'\"O', "\u00dc": r'\"U', "\u00c5": r"\AA{}", "\u0130": r"\.I",
}

SENTINEL = "\x00"
_SPECIALS = [("&", r"\&"), ("%", r"\%"), ("$", r"\$"), ("#", r"\#"),
             ("_", r"\_"), ("{", r"\{"), ("}", r"\}"),
             ("~", r"\textasciitilde{}"), ("^", r"\textasciicircum{}")]


def escape(text, unmapped):
    text = text.replace("\\", SENTINEL)
    for a, b in _SPECIALS:
        text = text.replace(a, b)
    text = text.replace(SENTINEL, r"\textbackslash{}")
    out = []
    for ch in text:
        if ord(ch) < 128 or ch in (BOLD_O, BOLD_C, IT_O, IT_C):
            out.append(ch)
        elif ch in UNICODE_MAP:
            out.append(UNICODE_MAP[ch])
        else:
            unmapped[ch] += 1
            out.append(ch)
    return "".join(out)


# --------------------------------------------------------------------------- inline

CODE_RE = re.compile(r"`([^`\n]+)`")
BOLD_RE = re.compile(r"\*\*(.+?)\*\*", re.S)
IT_STAR_RE = re.compile(r"(?<![\*\w])\*([^\*\n]+?)\*(?![\*\w])")
IT_US_RE = re.compile(r"(?<![A-Za-z0-9\\_])_([^_\n]+?)_(?![A-Za-z0-9_])")


def inline(text, store, unmapped):
    def code_sub(m):
        return store.put(r"\texttt{%s}" % escape(m.group(1), unmapped))
    text = CODE_RE.sub(code_sub, text)
    text = BOLD_RE.sub(lambda m: BOLD_O + m.group(1) + BOLD_C, text)
    text = IT_STAR_RE.sub(lambda m: IT_O + m.group(1) + IT_C, text)
    text = IT_US_RE.sub(lambda m: IT_O + m.group(1) + IT_C, text)
    text = escape(text, unmapped)
    text = text.replace(BOLD_O, r"\textbf{").replace(BOLD_C, "}")
    text = text.replace(IT_O, r"\emph{").replace(IT_C, "}")
    return text


class Store(object):
    """Placeholders survive escaping because they are pure alphanumerics."""

    def __init__(self, tag):
        self.tag = tag
        self.items = []

    def put(self, latex):
        self.items.append(latex)
        return "ZQZ%sZ%dZQZ" % (self.tag, len(self.items) - 1)

    def restore(self, text):
        for i, latex in enumerate(self.items):
            text = text.replace("ZQZ%sZ%dZQZ" % (self.tag, i), latex)
        return text


# --------------------------------------------------------------------------- blocks

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
ITEM_RE = re.compile(r"^(\s*)(?:([-*+])|(\d+)[.)])\s+(.*)$")
RULE_RE = re.compile(r"^\s*(?:-{3,}|\*{3,}|_{3,})\s*$")
TABLE_SEP_RE = re.compile(r"^\s*\|[\s:|-]*-[\s:|-]*\|?\s*$")
SECTION = {1: "subsection", 2: "subsubsection", 3: "paragraph", 4: "subparagraph",
           5: "subparagraph", 6: "subparagraph"}


def split_row(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [c.strip() for c in line.split("|")]


def convert_body(text, store, unmapped):
    lines = text.split("\n")
    out = []
    stack = []
    n = len(lines)

    def close_all():
        while stack:
            out.append(r"\end{itemize}" if stack.pop()[1] == "ul" else r"\end{enumerate}")

    def close_to(indent):
        while stack and stack[-1][0] > indent:
            out.append(r"\end{itemize}" if stack.pop()[1] == "ul" else r"\end{enumerate}")

    i = 0
    while i < n:
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            j = i + 1
            while j < n and not lines[j].strip():
                j += 1
            if stack:
                keeps = False
                if j < n:
                    m = ITEM_RE.match(lines[j])
                    if m and len(m.group(1)) >= stack[0][0]:
                        keeps = True
                    elif lines[j].startswith("   "):
                        keeps = True
                if not keeps:
                    close_all()
            out.append("")
            i += 1
            continue

        m = HEADING_RE.match(line)
        if m:
            close_all()
            level = len(m.group(1))
            out.append("")
            out.append(r"\%s*{%s}" % (SECTION[level], inline(m.group(2), store, unmapped)))
            out.append("")
            i += 1
            continue

        if RULE_RE.match(line) and not stack:
            out.append("")
            out.append(r"\bigskip")
            out.append("")
            i += 1
            continue

        if stripped.startswith("|") and i + 1 < n and TABLE_SEP_RE.match(lines[i + 1]):
            close_all()
            header = split_row(line)
            rows = []
            j = i + 2
            while j < n and lines[j].strip().startswith("|"):
                rows.append(split_row(lines[j]))
                j += 1
            ncol = max([len(header)] + [len(r) for r in rows])
            width = 0.94 / ncol
            spec = "".join([r"p{%.3f\linewidth}" % width] * ncol)
            out.append("")
            out.append(r"\begin{center}")
            out.append(r"\begin{tabular}{@{}%s@{}}" % spec)
            out.append(r"\hline")
            out.append(" & ".join(inline(c, store, unmapped) for c in header) + r" \\")
            out.append(r"\hline")
            for row in rows:
                row = row + [""] * (ncol - len(row))
                out.append(" & ".join(inline(c, store, unmapped) for c in row) + r" \\")
            out.append(r"\hline")
            out.append(r"\end{tabular}")
            out.append(r"\end{center}")
            out.append("")
            i = j
            continue

        if stripped.startswith(">"):
            close_all()
            quoted = []
            while i < n and (lines[i].strip().startswith(">") or
                             (quoted and lines[i].strip() and not ITEM_RE.match(lines[i])
                              and not HEADING_RE.match(lines[i]))):
                if not lines[i].strip().startswith(">"):
                    break
                quoted.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append("")
            out.append(r"\begin{quote}")
            for para in re.split(r"\n\s*\n", "\n".join(quoted)):
                if para.strip():
                    out.append(inline(" ".join(para.split("\n")).strip(), store, unmapped))
                    out.append("")
            out.append(r"\end{quote}")
            out.append("")
            continue

        m = ITEM_RE.match(line)
        if m:
            indent = len(m.group(1))
            kind = "ul" if m.group(2) else "ol"
            close_to(indent)
            if not stack or stack[-1][0] < indent:
                out.append(r"\begin{itemize}" if kind == "ul" else r"\begin{enumerate}")
                stack.append((indent, kind))
            elif stack[-1][1] != kind:
                out.append(r"\end{itemize}" if stack.pop()[1] == "ul" else r"\end{enumerate}")
                out.append(r"\begin{itemize}" if kind == "ul" else r"\begin{enumerate}")
                stack.append((indent, kind))
            chunk = [m.group(4)]
            j = i + 1
            while j < n and lines[j].strip() and not ITEM_RE.match(lines[j]) \
                    and not HEADING_RE.match(lines[j]) and not RULE_RE.match(lines[j]):
                chunk.append(lines[j].strip())
                j += 1
            out.append(r"\item " + inline(" ".join(chunk), store, unmapped))
            i = j
            continue

        chunk = [stripped]
        j = i + 1
        while j < n and lines[j].strip() and not HEADING_RE.match(lines[j]) \
                and not ITEM_RE.match(lines[j]) and not RULE_RE.match(lines[j]) \
                and not lines[j].strip().startswith(">") \
                and not lines[j].strip().startswith("|"):
            chunk.append(lines[j].strip())
            j += 1
        if stack:
            close_all()
        out.append(inline(" ".join(chunk), store, unmapped))
        i = j

    close_all()
    return "\n".join(out)


# --------------------------------------------------------------------------- rounds

MATH_DISPLAY_RE = re.compile(r"\\\[.*?\\\]", re.S)
MATH_INLINE_RE = re.compile(r"\\\(.*?\\\)", re.S)
MATH_ENV_RE = re.compile(r"\\begin\{(equation\*?|align\*?|gather\*?|aligned|array|cases|"
                         r"pmatrix|bmatrix|vmatrix|gathered|minipage)\}.*?"
                         r"\\end\{\1\}", re.S)
FENCE_RE = re.compile(r"^```[^\n]*\n(.*?)^```[ \t]*$", re.S | re.M)
CITE_RE = re.compile(re.escape(CITE_OPEN) + r"([A-Za-z]*)" + re.escape(CITE_SEP) + r"?" +
                     r"(.*?)" + re.escape(CITE_END), re.S)


TAG_RE = re.compile(r"\\tag\{[^{}]*\}")


def relocate_tag(block):
    """amsmath forbids \\tag inside aligned/cases/array; move it onto the outer display.

    The equation number and every symbol are untouched -- only the position of the \\tag
    within the same display moves, which is what lets these five displays typeset at all.
    """
    if "\\begin{" not in block:
        return block
    inner_end = block.rfind("\\end{")
    tags = [m for m in TAG_RE.finditer(block) if m.start() < inner_end]
    if not tags:
        return block
    for m in reversed(tags):
        block = block[:m.start()] + block[m.end():]
    # a tag sitting alone on its line leaves a blank line behind, and a blank line
    # inside display math is a paragraph break, which is a hard TeX error
    block = re.sub(r"\n[ \t]*\n+", "\n", block)
    close = block.rfind("\\]")
    return block[:close] + "".join(m.group(0) for m in tags) + "\n" + block[close:]


def strip_header(text):
    lines = text.split("\n")
    for idx, line in enumerate(lines[:25]):
        if re.match(r"^---\s*$", line):
            return "\n".join(lines[idx + 1:]).lstrip("\n")
    for idx, line in enumerate(lines):
        if line.startswith("#"):
            return "\n".join(lines[idx:])
    return text


def convert(text, store, unmapped, refs, tag="X", anchored=None):
    """refs is the per-round ordered citation registry.

    Each inline number is a hyperlink to that round's reference entry, and the entry links
    back to the first place it was cited. The tokens are ChatGPT-internal identifiers with no
    URL recorded anywhere in the archive, so an internal link is the only honest target.
    """
    if anchored is None:
        anchored = set()

    def cite_sub(m):
        kind, payload = m.group(1), m.group(2)
        parts = [p.strip() for p in payload.split(CITE_SEP) if p.strip()]
        # a "cite" carries independent sources; a "filecite" is one source plus its line range
        items = parts if kind == "cite" else [" ".join(parts)]
        pieces = []
        for it in items:
            it = it.strip()
            if it not in refs:
                refs[it] = len(refs) + 1
            num = refs[it]
            anchor = ""
            if num not in anchored:
                anchored.add(num)
                anchor = r"\hypertarget{cit:%s:%d}{}" % (tag, num)
            pieces.append(r"%s\hyperlink{ref:%s:%d}{%d}" % (anchor, tag, num, num))
        return store.put("[%s]" % ", ".join(pieces))

    text = CITE_RE.sub(cite_sub, text)
    text = FENCE_RE.sub(
        lambda m: "\n" + store.put("\\begin{verbatim}\n%s\\end{verbatim}" % m.group(1)) + "\n",
        text)
    text = MATH_DISPLAY_RE.sub(lambda m: store.put(relocate_tag(m.group(0))), text)
    text = MATH_ENV_RE.sub(lambda m: store.put(m.group(0)), text)
    text = MATH_INLINE_RE.sub(lambda m: store.put(m.group(0)), text)
    body = convert_body(text, store, unmapped)
    return store.restore(body)


PREAMBLE = r"""\documentclass[10pt]{article}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[margin=1in]{geometry}
\usepackage{amsmath,amssymb,amsthm,mathtools}
\usepackage{mathrsfs}
\usepackage{bm}
\usepackage{centernot}
\usepackage{enumitem}
\usepackage{newunicodechar}
\usepackage{xcolor}
\definecolor{linkblue}{RGB}{20,70,140}
\usepackage[colorlinks=true,linkcolor=linkblue,urlcolor=linkblue,citecolor=linkblue,
            pdfencoding=auto,psdextra]{hyperref}

\setlength{\parindent}{0pt}
\setlength{\parskip}{0.5em}
\setlist{topsep=0.3em,itemsep=0.2em,parsep=0pt,leftmargin=1.4em}
\allowdisplaybreaks
\sloppy
\emergencystretch=3em
\hbadness=10000
\vbadness=10000

\title{Collatz Approach Campaign\\[0.3em]\large Rounds 6--72}
\date{}

\begin{document}
\maketitle
\tableofcontents
\newpage
"""


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else "collatz_rounds.tex"
    print("fetching %s ..." % REPO)
    files = fetch_repo()
    approaches = parse_approaches(files["collatz/APPROACHES.md"])
    digests = {d["approach"]: d for d in json.loads(files["collatz/rounds/PROMPT_DIGESTS.json"])}
    ledger = parse_ledger(files["collatz/rounds/LEDGER.tsv"])

    landed = sorted(r for r, row in ledger.items()
                    if row["status"] == "DONE"
                    and "collatz/rounds/round-%d-output.md" % r in files)
    print("landed rounds: %d (%d..%d)" % (len(landed), landed[0], landed[-1]))

    unmapped = collections.Counter()
    chunks = [PREAMBLE]
    verified = 0

    for rnd in landed:
        row = ledger[rnd]
        k = int(row["approach"])
        prompt = build_prompt(k, approaches)
        digest = digests[k]
        if hashlib.sha256(prompt.encode()).hexdigest() != digest["sha256"] \
                or len(prompt) != digest["chars"]:
            raise SystemExit("PROMPT MISMATCH round %d approach %d" % (rnd, k))
        verified += 1

        refs = collections.OrderedDict()
        store = Store("R%d" % rnd)
        body = convert(strip_header(files["collatz/rounds/round-%d-output.md" % rnd]),
                       store, unmapped, refs, tag="R%d" % rnd)
        pstore = Store("P%d" % rnd)
        pbody = convert(prompt, pstore, unmapped, collections.OrderedDict(),
                        tag="P%d" % rnd)

        title = escape(row["title"], unmapped)
        chunks.append("\n\\clearpage\n\\section{Round %d: approach %d --- %s}\n" % (rnd, k, title))
        chunks.append("\\subsection*{Prompt}\n\\begin{quote}\n%s\n\\end{quote}\n" % pbody)
        chunks.append("\\subsection*{Response}\n%s\n" % body)
        if refs:
            items = "\n".join(
                r"\item \hypertarget{ref:R%d:%d}{}\hyperlink{cit:R%d:%d}{\texttt{%s}}"
                % (rnd, refs[t], rnd, refs[t], escape(t, unmapped)) for t in refs)
            chunks.append("\\subsection*{References}\n\\begin{enumerate}[leftmargin=2.2em]\n"
                          + items + "\n\\end{enumerate}\n")

    chunks.append("\n\\end{document}\n")
    tex = "".join(chunks)

    used = sorted({c for c in tex if ord(c) > 127})
    decls = "".join("\\newunicodechar{%s}{%s}\n" % (c, UNICODE_MAP[c])
                    for c in used if c in UNICODE_MAP)
    tex = tex.replace("\\begin{document}", decls + "\n\\begin{document}", 1)

    # --- gates -------------------------------------------------------------
    print("prompts verified %d/%d" % (verified, len(landed)))
    pua = [c for c in tex if 0xE000 <= ord(c) <= 0xF8FF]
    if pua:
        raise SystemExit("private-use characters survived: %d" % len(pua))
    opened = collections.Counter(re.findall(r"\\begin\{([A-Za-z*]+)\}", tex))
    closed = collections.Counter(re.findall(r"\\end\{([A-Za-z*]+)\}", tex))
    if opened != closed:
        raise SystemExit("unbalanced environments: %s"
                         % {k: (opened[k], closed[k]) for k in set(opened) | set(closed)
                            if opened[k] != closed[k]})
    nsec = len(re.findall(r"^\\section\{Round ", tex, flags=re.M))
    if nsec != len(landed):
        raise SystemExit("emitted %d sections, expected %d" % (nsec, len(landed)))
    if unmapped:
        print("WARNING unmapped non-ASCII: %s"
              % {"U+%04X" % ord(c): v for c, v in unmapped.most_common()})

    with io.open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(tex)
    print("sections %d | environments balanced | no private-use chars" % nsec)
    print("wrote %s (%.2f MB, %d lines)" % (out_path, len(tex) / 1048576.0, tex.count("\n")))


if __name__ == "__main__":
    main()
