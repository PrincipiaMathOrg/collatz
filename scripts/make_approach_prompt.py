"""Build one round's prompt by EXTRACTING the approach from APPROACHES.md -- never by retyping.

The run-approach-campaign skill's hardest rule is that each approach reaches ChatGPT character
for character as Anton wrote it: no paraphrase, no tidying, no expansion, no merging or
splitting, because a reformulated approach is a different experiment and the round is wasted.

Retyping an approach into a prompt is exactly the step where that rule silently breaks. So this
script slices approach k straight out of the stored verbatim file and assembles the skill's fixed
prompt template around it. Nothing is rewritten; the only added text is the template itself.

Front selection follows the skill: the approach's own tag decides. "D" -> disproof, otherwise
proof (the skill says to default to proof when the approach does not say).

    python make_approach_prompt.py 1 <outfile>
"""
import re
import sys
import os

HERE = os.path.dirname(os.path.abspath(__file__))
APPROACHES = os.path.join(HERE, "..", "campaign", "APPROACHES.md")
PROBLEM = "Collatz conjecture"


def load():
    with open(APPROACHES, encoding="utf-8") as f:
        text = f.read()
    # split on the numbered headings; keep the heading with its body
    parts = re.split(r"^### (\d+)\. (.+)$", text, flags=re.M)
    out = {}
    for i in range(1, len(parts), 3):
        num = int(parts[i])
        title = parts[i + 1]
        body = parts[i + 2]
        # cut the body at the next tier heading or horizontal rule that ends the section
        body = re.split(r"^---\s*$", body, flags=re.M)[0]
        out[num] = (title.strip(), body.strip())
    return out


def front_of(body):
    """proof unless the approach's own tag says D (disproof)."""
    m = re.search(r"^\*\*(.+?)\*\*\s*$", body, flags=re.M)
    tag = m.group(1) if m else ""
    # the tag looks like "Hybrid · B" / "Established · D" / "Established · D/P for cycles"
    right = tag.split("·")[-1].strip() if "·" in tag else ""
    if right.startswith("D") and not right.startswith("D/P"):
        return "disproof"
    return "proof"


def build(k):
    approaches = load()
    if k not in approaches:
        raise SystemExit("no approach %d" % k)
    title, body = approaches[k]
    front = front_of(body)
    approach_text = "%s. %s\n\n%s" % (k, title, body)
    prompt = (
        "Complete a full %s of the %s using the following approach:\n\n%s\n\nTake as long as you need."
        % (front, PROBLEM, approach_text)
    )
    return front, title, prompt


if __name__ == "__main__":
    k = int(sys.argv[1])
    out = sys.argv[2]
    front, title, prompt = build(k)
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(prompt)
    import hashlib

    print("approach %d: %s" % (k, title))
    print("front:      %s" % front)
    print("chars:      %d" % len(prompt))
    print("sha256:     %s" % hashlib.sha256(prompt.encode()).hexdigest())
