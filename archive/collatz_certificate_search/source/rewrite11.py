"""
rewrite11.py -- the eleven-rule mixed binary-ternary rewriting system of
Yolcu-Aaronson-Heule in the marked-carry paper's canonical form /u. (s2), and
round 17's collapse to the two carry transducers E, O and the pure ternary
return map R.  Exact integers only.  FRONT-B3 agent.

Semantics (marked-carry paper s2, r17 s1, r31 s1, r32 s1): a canonical string is
/u. with u a word over {f,t,0,1,2}; the value Val(/u.) is obtained by starting at 1
and applying the symbols left to right, f(x)=2x, t(x)=2x+1, d(x)=3x+d.
Delimiters are implicit: the python string holds u only.

Rules (exactly the eleven of the paper; names as in r17: D, A, B):
  D:  f. -> .        t. -> 2.
  A:  f0 -> 0f   f1 -> 0t   f2 -> 1f   t0 -> 1t   t1 -> 2f   t2 -> 2t
  B:  /0 -> /t   /1 -> /ff  /2 -> /ft
A and B preserve Val; each D-step applies the shortcut map T once.
R0 = the ten rules other than t. -> 2. (marked-carry paper Prop 2.2).

Round 17 (s2-s3): E(u) = pure ternary output of processing f u . by A u D only,
O(u) = same for t u . ; recursions (1):
  E(eps)=eps, O(eps)=2,
  E(0u)=0E(u), E(1u)=0O(u), E(2u)=1E(u), O(0u)=1O(u), O(1u)=2E(u), O(2u)=2O(u);
i.e. long division by 2 in base 3 with carry c in {0,1}: e = floor((3c+d)/2),
c' = (3c+d) mod 2 (r17 eq (2)); terminal carry 1 appends the digit 2.
Return map (3):  R(0u)=O(u), R(1u)=E(E(u)), R(2u)=E(O(u)), R(eps)=eps.
Value of a pure ternary word (4): N(w) = 3^|w| + [w]_3 (implicit leading digit 1).
Prop 1 (5): N(R(w)) = T(N(w)) if w = 0u, T^2(N(w)) if w = 1u or 2u.
Thm 2: Collatz <=> every ternary word reaches eps under R.
Thm 3: any rho with rho(eps)=0 and the three uniform inequalities (6)
  rho(O(u)) < rho(0u),  rho(E(E(u))) < rho(1u),  rho(E(O(u))) < rho(2u)
proves Collatz; (8) lifts it to the whole mixed system.
"""

import random
from collatz_core import T, U, v2

__all__ = [
    "val", "bin_string", "tern_word", "N_word", "in_S", "successors", "rules_at",
    "normalise_R0", "process_binary", "E", "O", "R", "R_value", "R_orbit_words",
    "carry_labels", "carry_labels2", "r_label", "RULE_NAMES",
]

BIN = "ft"
TER = "012"

RULE_NAMES = ["f.->.", "t.->2.", "f0->0f", "f1->0t", "f2->1f", "t0->1t", "t1->2f", "t2->2t",
              "/0->/t", "/1->/ff", "/2->/ft"]
A_RULES = {"f0": "0f", "f1": "0t", "f2": "1f", "t0": "1t", "t1": "2f", "t2": "2t"}
B_RULES = {"0": "t", "1": "ff", "2": "ft"}


def val(u):
    """Val(/u.) : start at 1, apply symbols left to right."""
    x = 1
    for ch in u:
        if ch == "f":
            x = 2 * x
        elif ch == "t":
            x = 2 * x + 1
        else:
            x = 3 * x + (ord(ch) - 48)
    return x


def bin_string(n):
    """Canonical binary string of n >= 1: binary digits after the leading 1, 0->f, 1->t."""
    if n < 1:
        raise ValueError
    return bin(n)[3:].replace("0", "f").replace("1", "t")


def tern_word(n):
    """Pure ternary word of n (requires leading base-3 digit 1, i.e. n in S): base-3
    digits after the leading 1.  Returns None if n is not representable."""
    if n < 1:
        return None
    digs = []
    m = n
    while m > 0:
        digs.append(m % 3)
        m //= 3
    digs.reverse()
    if digs[0] != 1:
        return None
    return "".join(str(d) for d in digs[1:])


def in_S(n):
    return tern_word(n) is not None


def N_word(w):
    """N(w) = 3^|w| + [w]_3  (r17 eq (4)); equals val(w)."""
    x = 1
    for ch in w:
        x = 3 * x + (ord(ch) - 48)
    return x


def rules_at(u):
    """All one-step rewrites of the canonical string u: list of (rule_name, position, u')."""
    out = []
    n = len(u)
    if n > 0:
        if u[-1] == "f":
            out.append(("f.->.", n - 1, u[:-1]))
        elif u[-1] == "t":
            out.append(("t.->2.", n - 1, u[:-1] + "2"))
        c = u[0]
        if c in B_RULES:
            out.append(("/" + c + "->/" + B_RULES[c], 0, B_RULES[c] + u[1:]))
    for i in range(n - 1):
        pair = u[i:i + 2]
        if pair in A_RULES:
            out.append((pair + "->" + A_RULES[pair], i, u[:i] + A_RULES[pair] + u[i + 2:]))
    return out


def successors(u):
    return [s for _, _, s in rules_at(u)]


def normalise_R0(u, schedule="leftmost", rng=None, count=True):
    """Normal form of u under the ten rules R0 (everything except t.->2.).
    schedule in {'leftmost','rightmost','random'}.  Returns (nf, n_f_erasures, n_steps)."""
    f_er = 0
    steps = 0
    while True:
        opts = [(nm, pos, s) for nm, pos, s in rules_at(u) if nm != "t.->2."]
        if not opts:
            return u, f_er, steps
        if schedule == "leftmost":
            nm, pos, s = min(opts, key=lambda o: o[1])
        elif schedule == "rightmost":
            nm, pos, s = max(opts, key=lambda o: o[1])
        else:
            nm, pos, s = (rng or random).choice(opts)
        if nm == "f.->.":
            f_er += 1
        u = s
        steps += 1


def process_binary(u):
    """r17 canonical processing: apply A and D rules only (no B rule) until no binary
    symbol remains.  Returns (pure ternary word, number of D-steps)."""
    d_steps = 0
    while True:
        opts = [(nm, pos, s) for nm, pos, s in rules_at(u) if not nm.startswith("/")]
        if not opts:
            assert all(ch in TER for ch in u)
            return u, d_steps
        # rightmost redex first (the rightmost binary symbol is processed first)
        nm, pos, s = max(opts, key=lambda o: o[1])
        if nm in ("f.->.", "t.->2."):
            d_steps += 1
        u = s


def _transduce(u, c):
    """Long division by 2 in base 3 with initial carry c (r17 eq (2))."""
    out = []
    for ch in u:
        d = ord(ch) - 48
        s = 3 * c + d
        out.append(str(s >> 1))
        c = s & 1
    if c == 1:
        out.append("2")
    return "".join(out)


def E(u):
    """E(u): output of processing f u . (carry 0)."""
    return _transduce(u, 0)


def O(u):
    """O(u): output of processing t u . (carry 1)."""
    return _transduce(u, 1)


def R(w):
    """Round 17 return map (3)."""
    if w == "":
        return ""
    if w[0] == "0":
        return O(w[1:])
    if w[0] == "1":
        return E(E(w[1:]))
    return E(O(w[1:]))


def R_value(n):
    """The deterministic map on S = {n : leading base-3 digit 1} induced by R:
    T(n) if the second base-3 digit is 0 (n in [3^q, 4 3^{q-1})), else T^2(n)."""
    w = tern_word(n)
    if w is None:
        raise ValueError("n not in S")
    if w == "":
        return 1
    if w[0] == "0":
        return T(n)
    return T(T(n))


def R_orbit_words(w, max_steps=10 ** 6, stop_below=None):
    """[w, R w, R^2 w, ...] until eps (or max_steps, or value < stop_below)."""
    out = [w]
    for _ in range(max_steps):
        if w == "":
            break
        w = R(w)
        out.append(w)
        if stop_below is not None and N_word(w) < stop_below:
            break
    return out


def carry_labels(w):
    """First-pass carry state entering each position i (1-based) of w = d_1..d_q:
    c_i = (1 + d_1 + ... + d_{i-1}) mod 2 = parity of the value of the prefix
    /d_1..d_{i-1}. ; this is exactly the carry of the first transducer pass in each
    of the three cases R(0u)=O(u) (carry 1 into u), R(1u)=E(E(u)) (carry 0 into u),
    R(2u)=E(O(u)) (carry 1 into u).  Returns tuple of 0/1 of length |w|."""
    c = 1
    out = []
    for ch in w:
        out.append(c)
        c = (c + (ord(ch) - 48)) & 1
    return tuple(out)


def carry_labels2(w):
    """Two-pass carry state (c1, c2) at each position: c1 as above; c2 = carry of the
    second pass (E on the first-pass output) entering the position that consumes the
    first-pass output digit produced at this position.  Second-pass carry starts at 0."""
    c1 = 1
    c2 = 0
    out = []
    for ch in w:
        d = ord(ch) - 48
        out.append((c1, c2))
        s = 3 * c1 + d
        e = s >> 1
        c1 = s & 1
        s2 = 3 * c2 + e
        c2 = s2 & 1
    return tuple(out)


def r_label(w, cap):
    """r = v2(N(w)+1) capped at cap (r31 s4 semantic label)."""
    return min(v2(N_word(w) + 1), cap)
