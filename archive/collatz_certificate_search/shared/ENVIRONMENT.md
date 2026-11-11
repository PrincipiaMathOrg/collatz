# ENVIRONMENT

Lab root: `C:\Users\anton\Desktop\collatz_certificate_search\`
- `source/`        shared code. `collatz_core.py` (oracle) and `battery.py` (countermodels) are the ONLY
                   implementations of the basic objects; import them, never re-derive.
- `logs/`          incremental logs, one file per agent run: `logs/<agent>-<topic>.log`
- `certificates/`  JSON/text certificates: exact rationals only. Farkas duals, enumerations, proofs of tables.
- `shared/`        STATE.md (live map), RESULTS.md (campaign digest), this file.
- `writeup/`       final README.md.

Compute: Python 3.12, numpy 2.4, scipy 1.17 (`linprog(method="highs")`), sympy 1.14, gmpy2, highspy,
python-flint (Arb), mpmath. 10 cores. Use `PYTHONIOENCODING=utf-8`. Bash tool is Git Bash; paths as
`/c/Users/anton/...`. Long jobs: log incrementally.

Rigor rule (non-negotiable): every claimed inequality, identity, count or infeasibility is established
in exact integer/rational arithmetic (`int`, `fractions.Fraction`, `gmpy2.mpz/mpq`, `sympy.Rational`) or
outward-rounded intervals (`mpmath.iv`, `flint.arb`). Float / LP output is a lead only.

Skill spec (constraints C1-C13, battery F-A..F-J, fronts A/B, roster):
`C:\Users\anton\.claude\skills\collatz-certificate-search\SKILL.md` -- read it first.
Campaign digest: `shared/RESULTS.md`. Verbatim rounds: `C:\Users\anton\Desktop\collatz_rounds_paper\collatz_rounds.tex`.
