"""
frontB3_exhaust.py -- exact (exhaustive, integer) confirmation of the SAT-solver UNSAT certificates
for the small classes: enumerate EVERY parameter configuration of the class and check that each one
violates at least one instance of the certificate's refuting set.  numpy int64 (values are tiny:
words of length <= 4, coefficients <= 3, so |rho| <= (dK)^6 <= 12^6).
Usage: python frontB3_exhaust.py <certificate json> [<more>...]
Writes 'exhaustive_check' into the certificate json.  Log: logs/frontB3-c-exhaust.log
"""
import sys, json, time, itertools
sys.path.insert(0, ".")
import numpy as np
from frontB3_search import Family, letters, all_letters

LOG = open("../logs/frontB3-c-exhaust.log", "a", encoding="utf-8")


def log(*a):
    s = " ".join(str(x) for x in a)
    print(s, flush=True); LOG.write(s + "\n"); LOG.flush()


def exhaust(cert, time_cap=None):
    fam = Family(cert["level"], cert["dim"], cert["K"], cert["lab"], cert.get("Rcap", 3))
    d, K = fam.d, fam.K
    inst = [(a, b) for a, b in cert["refuting_instances"]]
    inst.sort(key=lambda p: (len(p[0]) + len(p[1]), p))
    # combined letters (automaton index, letter); per-word automaton index
    def lw(w):
        ls, a = letters(w, fam.lab, fam.Rcap, fam.level)
        return [(a, l) for l in ls], a
    lets = []
    autos = set()
    for a, b in inst:
        for w in (a, b):
            ls, ai = lw(w)
            autos.add(ai)
            for l in ls:
                if l not in lets:
                    lets.append(l)
    autos = sorted(autos)
    cands = np.array(list(itertools.product(range(K + 1), repeat=d * d)), dtype=np.int64).reshape(-1, d, d)
    ab_one = list(itertools.product(range(K + 1), repeat=2 * d))
    inst_letters = [(lw(a), lw(b)) for a, b in inst]
    total_configs = (K + 1) ** (fam.nauto * (len(fam.L) * d * d + 2 * d))
    survivors = 0
    t0 = time.time()

    def rho_vec(seq, assign, cur_letter, alpha, beta):
        v = np.broadcast_to(beta.reshape(1, d), (cands.shape[0], d)).copy()
        for l in reversed(seq):
            if l == cur_letter:
                v = np.einsum("cij,cj->ci", cands, v)
            else:
                v = v @ assign[l].T
        return v @ alpha

    def rec(k, assign, AB):
        nonlocal survivors
        if time_cap and time.time() - t0 > time_cap:
            raise TimeoutError
        if k == len(lets):
            survivors += 1
            return
        cur = lets[k]
        ok = np.ones(cands.shape[0], dtype=bool)
        known = set(lets[:k + 1])
        for ((la, aa), (lb, ab_)), (a, b) in zip(inst_letters, inst):
            if set(la) <= known and set(lb) <= known and (cur in la or cur in lb):
                ra = rho_vec(la, assign, cur, AB[aa][0], AB[aa][1])
                rb = rho_vec(lb, assign, cur, AB[ab_][0], AB[ab_][1])
                ok &= (ra > rb)
                if not ok.any():
                    break
        idx = np.nonzero(ok)[0]
        for i in idx:
            assign[cur] = cands[i]
            rec(k + 1, assign, AB)
        if cur in assign:
            del assign[cur]

    try:
        for combo in itertools.product(ab_one, repeat=len(autos)):
            AB = {}
            for ai, c in zip(autos, combo):
                AB[ai] = (np.array(c[:d], dtype=np.int64), np.array(c[d:], dtype=np.int64))
            # instances whose words are both empty-letter: rho = alpha.beta comparisons
            okc = True
            for ((la, aa), (lb, ab_)), (a, b) in zip(inst_letters, inst):
                if not la and not lb:
                    if not (AB[aa][0] @ AB[aa][1] > AB[ab_][0] @ AB[ab_][1]):
                        okc = False; break
            if not okc:
                continue
            rec(0, {}, AB)
    except TimeoutError:
        return {"exhaustive_check": "TIMEOUT", "time_s": round(time.time() - t0, 1)}
    res = {"exhaustive_check": "PASS" if survivors == 0 else "FAIL",
           "surviving_configs": survivors, "letters_used": [str(l) for l in lets],
           "automata_used": autos, "class_size": total_configs,
           "time_s": round(time.time() - t0, 1)}
    return res


if __name__ == "__main__":
    for path in sys.argv[1:]:
        cert = json.load(open(path))
        if cert["status"] != "UNSAT":
            log(path, "not UNSAT, skip"); continue
        res = exhaust(cert, time_cap=float(sys.argv[1]) if False else None)
        log(path, res)
        if res and res.get("exhaustive_check") != "TIMEOUT":
            cert.update(res)
            json.dump(cert, open(path, "w"), indent=1)
