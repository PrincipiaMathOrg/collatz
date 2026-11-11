"""sat_worker.py -- run CaDiCaL on a DIMACS file, print 'SAT <model literals>' or 'UNSAT'."""
import sys
from pysat.formula import CNF
from pysat.solvers import Cadical153
cnf = CNF(from_file=sys.argv[1])
with Cadical153(bootstrap_with=cnf.clauses) as s:
    if s.solve():
        print("SAT " + " ".join(str(l) for l in s.get_model()))
    else:
        print("UNSAT")
