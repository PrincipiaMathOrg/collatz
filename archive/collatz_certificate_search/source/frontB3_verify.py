"""
frontB3_verify.py -- deliverable B3a: exact verification of the eleven-rule system,
Prop 2.2 (marked-carry paper), and round 17's collapse to the ternary return map R.
Log: logs/frontB3-a-verify.log
"""
import sys, time, random, itertools
sys.path.insert(0, ".")
from collatz_core import T, U, v2, T_orbit, U_orbit
from rewrite11 import *
from rewrite11 import _transduce, B_RULES, BIN

LOG = open("../logs/frontB3-a-verify.log", "w", encoding="utf-8")


def log(*a):
    s = " ".join(str(x) for x in a)
    print(s)
    LOG.write(s + "\n")
    LOG.flush()


t0 = time.time()
fails = 0

# (i) string value semantics: every A/B rule application preserves Val, every D-step
#     applies T, on ALL canonical strings of length <= 7 (5^7 = 78125) and 20000 random of length <= 40.
cnt = {nm: 0 for nm in RULE_NAMES}
bad = []
def check_string(u):
    global fails
    v = val(u)
    for nm, pos, s in rules_at(u):
        cnt[nm] += 1
        v2_ = val(s)
        if nm in ("f.->.", "t.->2."):
            ok = (v2_ == T(v))
        else:
            ok = (v2_ == v)
        if not ok:
            bad.append((u, nm, s, v, v2_))
for L in range(0, 8):
    for tup in itertools.product("ft012", repeat=L):
        check_string("".join(tup))
rng = random.Random(1)
for _ in range(20000):
    L = rng.randint(8, 40)
    check_string("".join(rng.choice("ft012") for _ in range(L)))
log("(i) value semantics: rule applications checked per rule:", cnt, "| violations:", len(bad), bad[:3])
fails += len(bad)

# (i') the value of a canonical string is any positive integer; binary string bijection
assert all(val(bin_string(n)) == n for n in range(1, 100001))
log("(i') val(bin_string(n)) == n for n <= 10^5")

# (ii) Prop 2.2: normalising the binary string of odd n after one t.->2. step gives the
#      binary string of U_+(n); f-erasures + 1 = v2(3n+1); schedule-independent.
bad2 = []
for n in range(1, 100001, 2):
    u = bin_string(n)
    assert u == "" or u[-1] == "t"
    u2 = u[:-1] + "2" if u else "2"  # t.->2. ; for n=1 the string is empty: /. is 1, no t
    if n == 1:
        continue
    nf, fer, steps = normalise_R0(u2, "leftmost")
    Un, a = U(n)
    if nf != bin_string(Un) or fer + 1 != a:
        bad2.append((n, nf, fer, Un, a))
    if n <= 3001:
        for sched in ("rightmost", "random", "random", "random"):
            nf2, fer2, _ = normalise_R0(u2, sched, rng)
            if nf2 != nf or fer2 != fer:
                bad2.append((n, sched, nf2, fer2))
log("(ii) Prop 2.2 (U_+ realised, f-erasures = v2(3n+1)-1, schedule-independent) odd n <= 10^5,"
    " random/rightmost schedules n <= 3001 | violations:", len(bad2), bad2[:3])
fails += len(bad2)

# (iii) round 17: transducers E,O agree with A u D processing of f u . / t u . ; recursions (1);
#       R agrees with (3); Prop 1 (5); the specific transitions (12)-(15).
bad3 = []
for L in range(0, 9):
    for tup in itertools.product("012", repeat=L):
        u = "".join(tup)
        pe, de = process_binary("f" + u)
        po, do = process_binary("t" + u)
        if pe != E(u) or po != O(u) or de != 1 or do != 1:
            bad3.append(("EO", u, pe, E(u), po, O(u)))
        # recursions (1)
        for d in "012":
            if E(d + u) != {"0": "0" + E(u), "1": "0" + O(u), "2": "1" + E(u)}[d]:
                bad3.append(("recE", d, u))
            if O(d + u) != {"0": "1" + O(u), "1": "2" + E(u), "2": "2" + O(u)}[d]:
                bad3.append(("recO", d, u))
        # R via the eleven-rule system: apply the B rule then process all binary symbols
        for d in "012":
            w = d + u
            s = B_RULES[d] + u
            pr, dr = process_binary(s)
            if pr != R(w):
                bad3.append(("R", w, pr, R(w)))
            if dr != (1 if d == "0" else 2):
                bad3.append(("Rsteps", w, dr))
log("(iii-a) E,O = A u D processing of fu./tu., recursions (1), R = B-rule + processing, "
    "T-step counts 1/2/2, all words |u| <= 8 | violations:", len(bad3), bad3[:3])
fails += len(bad3)

# Prop 1 (5) on every word with N(w) <= 10^5 and the explicit map R_value on n <= 10^5
bad4 = []
nS = 0
for n in range(1, 100001):
    w = tern_word(n)
    if w is None:
        continue
    nS += 1
    assert N_word(w) == n
    Rw = R(w)
    expect = T(n) if (w != "" and w[0] == "0") else (T(T(n)) if w != "" else 1)
    if N_word(Rw) != expect or R_value(n) != expect:
        bad4.append((n, w, Rw, N_word(Rw), expect))
    # explicit interval form: q = |w|; digit 0 <=> n < 4 3^{q-1}
    q = len(w)
    if q >= 1 and ((w[0] == "0") != (n < 4 * 3 ** (q - 1))):
        bad4.append(("interval", n, w))
log("(iii-b) Prop 1: N(R(w)) = T(N w) [second digit 0, i.e. n in [3^q, 4 3^{q-1})] or T^2(N w) "
    "for all", nS, "words with N(w) <= 10^5 | violations:", len(bad4), bad4[:3])
fails += len(bad4)

# comparison with U_+ : for odd n <= 10^5 in S, the odd values of the R-orbit are a subsequence
# of the U_+ orbit, the R-orbit values are a subsequence of the T-orbit, and R terminates
bad5 = []
tot_steps = 0
max_len = 0
for n in range(1, 100001):
    w = tern_word(n)
    if w is None:
        continue
    words = R_orbit_words(w)
    if words[-1] != "":
        bad5.append(("noterm", n)); continue
    tot_steps += len(words) - 1
    vals = [N_word(x) for x in words]
    max_len = max(max_len, max(len(x) for x in words))
    # subsequence of T-orbit
    torb = T_orbit(n, 3 * len(vals) + 10)
    j = 0
    for v in vals:
        while j < len(torb) and torb[j] != v:
            j += 1
        if j >= len(torb):
            bad5.append(("notsub", n, v)); break
    if n % 2 == 1:
        uorb = U_orbit(n, len(vals) + 5)
        odds = [v for v in vals if v % 2 == 1]
        j = 0
        for v in odds:
            while j < len(uorb) and uorb[j] != v:
                j += 1
            if j >= len(uorb):
                bad5.append(("notUsub", n, v)); break
log("(iii-c) R-orbits of all", nS, "n <= 10^5 in S reach eps; values are a subsequence of the T-orbit,"
    " odd values a subsequence of the U_+ orbit | total R-steps", tot_steps, "max word length", max_len,
    "| violations:", len(bad5), bad5[:3])
fails += len(bad5)

# r17's explicit transitions (12)-(15)
ex = {"0": "2", "2": "1", "11": "01", "20": "022", "120": "012", "212": "102", "0012": "121",
      "0202": "2122", "1021": "00122", "1222": "0202"}
bad6 = [(k, R(k), v) for k, v in ex.items() if R(k) != v]
if R(R("2220")) != "002222" or R("2220") != "11022":
    bad6.append(("2220", R("2220"), R(R("2220"))))
log("(iii-d) r17 transitions (12)-(15) and 2220 -> 11022 -> 002222 | violations:", bad6)
fails += len(bad6)

# F-A in the R system: 2^m -> 1^m -> (01)^{floor(m/2)}; values 2 3^m - 1 = T^m(2^{m+1}-1)
bad7 = []
for m in range(1, 41):
    w = "2" * m
    if N_word(w) != 2 * 3 ** m - 1 or N_word(w) != T_orbit((1 << (m + 1)) - 1, m)[-1]:
        bad7.append(("val", m))
    if R(w) != "1" * m or R("1" * m) != "01" * (m // 2):
        bad7.append(("chain", m, R(w), R("1" * m)))
    # the eleven-rule system: /t^m. processes to /2^m. in m + m(m-1)/2 = m(m+1)/2 A u D steps
    s = "t" * m
    steps = 0
    while any(ch in BIN for ch in s):
        opts = [(nm, pos, x) for nm, pos, x in rules_at(s) if not nm.startswith("/")]
        nm, pos, x = max(opts, key=lambda o: o[1])
        s = x; steps += 1
    if s != "2" * m or steps != m * (m + 1) // 2:
        bad7.append(("bin", m, s, steps))
log("(iii-e) F-A in the R system: N(2^m) = 2 3^m - 1 = T^m(2^{m+1}-1), R(2^m) = 1^m, R(1^m) = (01)^{m//2},"
    " /t^m. -> /2^m. in m(m+1)/2 A u D steps, m <= 40 | violations:", bad7)
fails += len(bad7)


# (iii-f) R is the first-return map of T to S: for n in S, T(n) or T^2(n) is in S and the
# skipped value (if any) is not in S; for n not in S, T(n) is in S.  n <= 10^6.
bad8 = []
for n in range(1, 1000001):
    w = tern_word(n)
    if w is None:
        if not in_S(T(n)):
            bad8.append(("outS", n))
    elif w != "":
        if w[0] == "0":
            if not in_S(T(n)):
                bad8.append(("digit0", n))
        else:
            if in_S(T(n)) or not in_S(T(T(n))):
                bad8.append(("digit12", n))
log("(iii-f) R = first-return map of T to S = {leading base-3 digit 1}: from n not in S, T(n) in S;"
    " from n in S the skipped value is not in S; n <= 10^6 | violations:", len(bad8), bad8[:3])
fails += len(bad8)

log("B3a TOTAL violations:", fails, "| time %.1fs" % (time.time() - t0))
LOG.close()
