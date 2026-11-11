"""
frontB3_search.py -- deliverable B3b: SMT (z3, bit-vector) search for weighted-automaton /
matrix-interpretation ranks satisfying round 17's three inequalities (6)
    rho(O(u)) < rho(0u),  rho(E(E(u))) < rho(1u),  rho(E(O(u))) < rho(2u)
on finite instance sets, in the classes round 31 does not kill:
  rho(w) = alpha^T M_{l_1} ... M_{l_q} beta,  alpha, beta in {0..K}^d, M_l in {0..K}^{d x d},
where the letter l_i of position i is
  lab='plain' : the digit d_i,
  lab='c1'    : (d_i, c_i) with c_i = first-pass carry state entering position i
                (= parity of the prefix value, exactly the transducer carry, rewrite11.carry_labels),
  lab='c12'   : (d_i, c_i, c'_i) both passes' carry states,
  lab='r'     : the digit, with a separate automaton for each word label r = min(v2(N(w)+1), Rcap)
                (round 31 s4 label), i.e. path-dependent per r31,
  lab='c1r'   : both.
Argument filtering = the letters mapped to a matrix that ignores them (allowed since 0..K includes I).
The scalar comparison alpha^T(...)beta is the most permissive way to compare a d-dimensional
interpretation on closed words, so an UNSAT here refutes every d-dimensional matrix
interpretation (AProVE order x > y iff x_1 > y_1, x >= y) with the same coefficient bound.

Level 'mixed': the same automaton family on the eleven-rule canonical strings /u. over {f,t,0,1,2}
(5 letters), required to strictly decrease under EVERY rule application at every visited string
(schedule-independent), with the option of dropping the odd rule (sanity: R0 has a matrix proof).

Method: CEGIS.  Start with the shortest instances, solve, evaluate the model exactly (python
ints) on the whole pool, add the first violated instances, repeat.  UNSAT -> the current instance
set is an exact refutation certificate for the class (written to certificates/).
SAT on the whole pool -> exact check on all R-instances of n <= 10^6 and on the full battery.
Log: logs/frontB3-b-search.log
"""
import sys, time, json, math, itertools, argparse
sys.path.insert(0, ".")
import z3
from collatz_core import T, v2, T_orbit
from battery import all_families
from rewrite11 import (val, bin_string, tern_word, N_word, in_S, rules_at, R, R_orbit_words,
                       carry_labels, carry_labels2, r_label, normalise_R0)

LOGF = None


def log(*a):
    s = " ".join(str(x) for x in a)
    print(s, flush=True)
    if LOGF:
        LOGF.write(s + "\n"); LOGF.flush()


# ----------------------------------------------------------------------------- instance pools
def R_instances_from_segment(seg):
    """Consecutive S-values of a T-orbit segment give R-instances (R = first return of T to S)."""
    out = []
    ws = [tern_word(x) for x in seg if isinstance(x, int) and x >= 1]
    ws = [w for w in ws if w is not None]
    for a, b in zip(ws, ws[1:]):
        if a != "":
            assert R(a) == b, (a, b)
            out.append((a, b))
    return out


def pool_R_orbits(N0):
    """All distinct R-instances (w, R w) on the R-orbits of n <= N0 in S."""
    seen = set()
    inst = []
    for n in range(2, N0 + 1):
        w = tern_word(n)
        if w is None:
            continue
        while w != "" and w not in seen:
            seen.add(w)
            w2 = R(w)
            inst.append((w, w2))
            w = w2
    return inst


def pool_R_FA(L, prefix_only=False):
    """F-A in the R system: R-orbit of 2^m (value 2 3^m - 1 = T^m(2^{m+1}-1)) for m <= L,
    followed until the value first drops below 2 3^m - 1 (the stopping segment).
    Returns dict m -> list of instances."""
    out = {}
    for m in range(1, L + 1):
        w = "2" * m
        n0 = N_word(w)
        words = R_orbit_words(w, stop_below=n0)
        out[m] = [(a, b) for a, b in zip(words, words[1:]) if a != ""]
    return out


def pool_R_battery(max_len=None):
    """R-instances from every battery family's positive-integer T-orbit segments (F-A .. F-K)."""
    inst = []
    tags = []
    for mem in all_families():
        seg = mem.get("segment")
        if mem.get("kind") == "rational-cycle" or seg is None:
            continue
        if mem.get("map", (3, 1)) != (3, 1):
            continue
        seg = [x for x in seg if isinstance(x, int) and x >= 1]
        # only genuine T-orbit segments
        ok = all(T(a) == b for a, b in zip(seg, seg[1:]))
        if not ok:
            continue
        for a, b in R_instances_from_segment(seg):
            if max_len is None or len(a) <= max_len:
                inst.append((a, b)); tags.append(mem["family"])
    return inst, tags


def pool_mixed(N0, extra_seeds=(), schedules=("leftmost", "rightmost"), stop_at_value=None):
    """Level 'mixed': all one-step rewrites (s, s') from every canonical string visited along the
    given schedules from the binary string of n (n <= N0 and extra seeds), each derivation
    followed to the empty string (or until the value drops below the seed if stop_at_value)."""
    seen = set()
    inst = []
    seeds = list(range(2, N0 + 1)) + list(extra_seeds)
    for n in seeds:
        for sched in schedules:
            s = bin_string(n)
            while True:
                if s not in seen:
                    seen.add(s)
                    for nm, pos, s2 in rules_at(s):
                        inst.append((s, s2))
                if s == "":
                    break
                opts = rules_at(s)
                if sched == "leftmost":
                    nm, pos, s = min(opts, key=lambda o: o[1])
                else:
                    nm, pos, s = max(opts, key=lambda o: o[1])
                if stop_at_value and val(s) < n:
                    break
    return inst


# ----------------------------------------------------------------------------- letters
def letters(w, lab, Rcap, level):
    """List of letter keys for the positions of w, and the automaton index (word label)."""
    if level == "mixed":
        return list(w), 0
    if lab == "plain":
        return list(w), 0
    if lab == "c1":
        return list(zip(w, carry_labels(w))), 0
    if lab == "c12":
        return [(d, c[0], c[1]) for d, c in zip(w, carry_labels2(w))], 0
    if lab == "r":
        return list(w), r_label(w, Rcap)
    if lab == "c1r":
        return list(zip(w, carry_labels(w))), r_label(w, Rcap)
    raise ValueError(lab)


def all_letters(lab, level):
    if level == "mixed":
        return list("ft012")
    if lab == "plain" or lab == "r":
        return list("012")
    if lab == "c1" or lab == "c1r":
        return [(d, c) for d in "012" for c in (0, 1)]
    if lab == "c12":
        return [(d, c, e) for d in "012" for c in (0, 1) for e in (0, 1)]


# ----------------------------------------------------------------------------- automaton family
class Family:
    def __init__(self, level, dim, K, lab="plain", Rcap=3):
        self.level, self.d, self.K, self.lab, self.Rcap = level, dim, K, lab, Rcap
        self.nauto = (Rcap + 1) if lab in ("r", "c1r") else 1
        self.L = all_letters(lab, level)

    def name(self):
        return "%s-d%d-K%d-%s%s" % (self.level, self.d, self.K, self.lab,
                                     ("R%d" % self.Rcap) if self.nauto > 1 else "")

    def nvars(self):
        return self.nauto * (len(self.L) * self.d * self.d + 2 * self.d)

    # symbolic
    def make_vars(self, W):
        """Coefficient variables: bK = ceil(log2(K+1)) named z3 Bools per coefficient, assembled
        into a bK-bit vector and zero-extended to width W inside products, so every
        multiplication is (small) x (wide) and SAT models map back to coefficients by name."""
        d = self.d
        self.W = W
        self.bK = max(1, int(math.ceil(math.log2(self.K + 1))))
        self.bools = {}
        V = {}

        def mk(name):
            bs = [z3.Bool(name + "_b%d" % i) for i in range(self.bK)]
            self.bools[name] = bs
            bits = [z3.If(b, z3.BitVecVal(1, 1), z3.BitVecVal(0, 1)) for b in bs]
            x = bits[-1]
            for bb in reversed(bits[:-1]):
                x = z3.Concat(x, bb)
            return x if self.bK > 1 else bits[0]
        for a in range(self.nauto):
            V[("alpha", a)] = [mk("al_%d_%d" % (a, i)) for i in range(d)]
            V[("beta", a)] = [mk("be_%d_%d" % (a, i)) for i in range(d)]
            for li, l in enumerate(self.L):
                V[("M", a, l)] = [[mk("M_%d_%d_%d_%d" % (a, li, i, j)) for j in range(d)]
                                  for i in range(d)]
        self.Vnames = {}
        for a in range(self.nauto):
            self.Vnames[("alpha", a)] = ["al_%d_%d" % (a, i) for i in range(d)]
            self.Vnames[("beta", a)] = ["be_%d_%d" % (a, i) for i in range(d)]
            for li, l in enumerate(self.L):
                self.Vnames[("M", a, l)] = [["M_%d_%d_%d_%d" % (a, li, i, j) for j in range(d)]
                                            for i in range(d)]
        return V

    def _ext(self, x):
        return z3.ZeroExt(self.W - self.bK, x)

    def rho_sym(self, V, w):
        ls, a = letters(w, self.lab, self.Rcap, self.level)
        d = self.d
        vec = [self._ext(x) for x in V[("beta", a)]]
        for l in reversed(ls):
            M = V[("M", a, l)]
            vec = [z3.Sum([self._ext(M[i][j]) * vec[j] for j in range(d)]) if d > 1
                   else self._ext(M[i][0]) * vec[0] for i in range(d)]
        al = V[("alpha", a)]
        return z3.Sum([self._ext(al[i]) * vec[i] for i in range(d)]) if d > 1 else self._ext(al[0]) * vec[0]

    # exact
    def rho_int(self, P, w):
        ls, a = letters(w, self.lab, self.Rcap, self.level)
        d = self.d
        vec = P[("beta", a)]
        for l in reversed(ls):
            M = P[("M", a, l)]
            vec = [sum(M[i][j] * vec[j] for j in range(d)) for i in range(d)]
        al = P[("alpha", a)]
        return sum(al[i] * vec[i] for i in range(d))

    def extract(self, truth, V):
        """truth: dict name -> bool for the bit Bools; returns integer parameters."""
        def valof(name):
            return sum((1 << i) for i in range(self.bK) if truth.get(name + "_b%d" % i, False))
        P = {}
        for k, v in self.Vnames.items():
            if k[0] == "M":
                P[k] = [[valof(x) for x in row] for row in v]
            else:
                P[k] = [valof(x) for x in v]
        return P

    def to_json(self, P):
        out = {"level": self.level, "dim": self.d, "K": self.K, "lab": self.lab, "Rcap": self.Rcap,
               "params": {}}
        for k, v in P.items():
            out["params"][repr(k)] = v
        return out


def width_for(fam, qmax):
    # |rho(w)| <= (d K)^{q+2}
    return int(math.ceil((qmax + 2) * math.log2(max(2, fam.d * fam.K)))) + 3


def sat_check(goal, timeout_s=300):
    """Bit-blast a z3 Goal to CNF, solve with CaDiCaL (pysat), and convert the model back.
    Returns (status, z3 model or None) with status in {'sat','unsat','unknown'}."""
    tac = z3.Then("simplify", "propagate-values", "solve-eqs", "bit-blast", "tseitin-cnf")
    sg = tac(goal)
    assert len(sg) == 1
    sub = sg[0]
    dim = sub.dimacs(include_names=True)
    clauses = []
    names = {}
    for line in dim.splitlines():
        if line.startswith("p"):
            continue
        if line.startswith("c"):
            parts = line.split()
            if len(parts) == 3:
                names[parts[2]] = int(parts[1])
            continue
        lits = [int(x) for x in line.split()]
        if lits and lits[-1] == 0:
            lits.pop()
        if lits:
            clauses.append(lits)
        elif line.strip() == "0":
            return "unsat", None  # empty clause
    if not clauses:
        return "sat", {}
    # solve in a subprocess so that the timeout is a hard kill (pysat's interrupt does not stop CaDiCaL)
    import subprocess, tempfile, os
    fd, path = tempfile.mkstemp(suffix=".cnf", dir=os.environ.get("TMP") or None)
    os.close(fd)
    with open(path, "w") as f:
        f.write("p cnf %d %d\n" % (max(abs(l) for c in clauses for l in c), len(clauses)))
        for c in clauses:
            f.write(" ".join(str(l) for l in c) + " 0\n")
    try:
        out = subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "sat_worker.py"), path],
                             capture_output=True, text=True, timeout=timeout_s)
        res = out.stdout.strip()
    except subprocess.TimeoutExpired:
        os.unlink(path)
        return "unknown", None
    os.unlink(path)
    if res.startswith("UNSAT"):
        return "unsat", None
    if not res.startswith("SAT"):
        raise RuntimeError("sat_worker failed: " + out.stderr[-500:])
    model = [int(x) for x in res.split()[1:]]
    pos = set(l for l in model if l > 0)
    truth = {name: (idx in pos) for name, idx in names.items()}
    return "sat", truth


def cegis(fam, pool, init_len=2, timeout_s=300, max_rounds=400, add_per_round=3, quiet=False,
          extra_constraints=None, budget_s=None):
    """Returns (status, data): ('UNSAT', instances) | ('SAT', params) | ('UNKNOWN', info)."""
    pool = sorted(set(pool), key=lambda p: (len(p[0]), p[0], p[1]))
    cur = [p for p in pool if len(p[0]) <= init_len]
    if not cur:
        cur = pool[:1]
    t0 = time.time()
    for rnd in range(max_rounds):
        if budget_s is not None and time.time() - t0 > budget_s:
            return "UNKNOWN", {"instances": cur, "rounds": rnd, "time": time.time() - t0, "reason": "budget"}
        qmax = max(max(len(a), len(b)) for a, b in cur)
        W = width_for(fam, qmax)
        V = fam.make_vars(W)
        goal = z3.Goal()
        if (fam.K + 1) & fam.K:  # K+1 not a power of two: bound explicitly
            for k, v in V.items():
                for x in (itertools.chain(*v) if k[0] == "M" else v):
                    goal.add(z3.ULE(x, fam.K))
        if extra_constraints:
            extra_constraints(fam, V, goal)
        for a, b in cur:
            goal.add(z3.UGT(fam.rho_sym(V, a), fam.rho_sym(V, b)))
        st, model = sat_check(goal, timeout_s)
        if st == "unsat":
            return "UNSAT", {"instances": cur, "rounds": rnd + 1, "time": time.time() - t0, "W": W}
        if st == "unknown":
            return "UNKNOWN", {"instances": cur, "rounds": rnd + 1, "time": time.time() - t0, "W": W,
                               "reason": "timeout"}
        P = fam.extract(model, V)
        # sanity: the model satisfies the current instances exactly
        for a, b in cur:
            assert fam.rho_int(P, a) > fam.rho_int(P, b), ("model mismatch", a, b)
        viol = []
        for a, b in pool:
            if fam.rho_int(P, a) <= fam.rho_int(P, b):
                viol.append((a, b))
                if len(viol) >= add_per_round:
                    break
        if not viol:
            return "SAT", {"params": P, "instances": cur, "rounds": rnd + 1, "time": time.time() - t0, "W": W}
        cur.extend(viol)
        if not quiet:
            log("   round %d: |cur|=%d added %s (%.1fs)" % (rnd + 1, len(cur), viol[:1], time.time() - t0))
    return "UNKNOWN", {"instances": cur, "rounds": max_rounds, "time": time.time() - t0, "reason": "max_rounds"}


def exact_verify_R(fam, P, N0, log_every=None):
    """Exact check of rho(R w) < rho(w) on all R-instances of n <= N0 in S; returns first violation."""
    seen = set()
    cnt = 0
    for n in range(2, N0 + 1):
        w = tern_word(n)
        if w is None:
            continue
        while w != "" and w not in seen:
            seen.add(w)
            w2 = R(w)
            cnt += 1
            if fam.rho_int(P, w) <= fam.rho_int(P, w2):
                return (n, w, w2, fam.rho_int(P, w), fam.rho_int(P, w2)), cnt
            w = w2
    return None, cnt


def exact_verify_battery(fam, P):
    inst, tags = pool_R_battery()
    for (a, b), tg in zip(inst, tags):
        if fam.rho_int(P, a) <= fam.rho_int(P, b):
            return (tg, a[:60], b[:60], len(a), len(b))
    return None
