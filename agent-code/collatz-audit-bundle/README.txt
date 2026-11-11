COLLATZ ALL-DEPTH AUDIT — DELIVERABLE GUIDE
Prepared 17 August 2026

STATUS
The principal result is a computer-assisted theorem about the negative
accelerated 3x-1 target-one barrier language. It is not a proof of the
Collatz conjecture.

MAIN FILES
  Collatz_All_Depth_Audit.pdf
      29-page journal-style report, including the full mathematical proof,
      literature/provenance audit, project theorem ledger, exact remaining
      proof obligations, pseudocode, and Lean-oriented completion skeletons.

  Collatz_All_Depth_Audit.tex
      Standalone LaTeX source. Compile in the same directory as
      Collatz_Proof_Skeleton.lean using two pdflatex passes.

  Collatz_Proof_Skeleton.lean
      Lean-oriented pseudocode. It intentionally contains `sorry` and abstract
      predicates; it is a formalization blueprint, not a compiling proof.

ARCHIVES
  Collatz_All_Depth_Certificates.zip
      Only the exact proof dependencies: two independent seed scans, the
      finite shell-mass certificate and independent verifier, retained output,
      environment metadata, and SHA-256 manifest. No platform-specific binary
      is included; compile the C++ source locally.

  Collatz_All_Depth_Complete_Bundle.zip
      Main report/source/skeleton, exact proof certificates, prior finite
      certificate sources, and the recent project manuscripts audited in the
      report.

REPRODUCING THE EXACT CERTIFICATES
From the certificates directory:

  python mass_certificate.py --K 1000 --csv mass_shells_k0_1000.csv
  python verify_mass_csv.py
  python shortcut_seed_certificate.py --cap 200000 --step-cap 100000
  g++ -O2 -std=c++20 -Wall -Wextra -Werror \
      accelerated_seed_certificate.cpp -o accelerated_seed_certificate
  ./accelerated_seed_certificate 200000 100000
  sha256sum -c SHA256SUMS

REPRODUCING THE PDF
Place Collatz_All_Depth_Audit.tex and Collatz_Proof_Skeleton.lean together,
then run:

  pdflatex -interaction=nonstopmode -halt-on-error Collatz_All_Depth_Audit.tex
  pdflatex -interaction=nonstopmode -halt-on-error Collatz_All_Depth_Audit.tex

TRUST BOUNDARY
The all-depth theorem depends only on:
  (1) the symbolic shell-sparsity and analytic-tail proof in the report;
  (2) the exact k <= 1000 mass certificate and verifier; and
  (3) the two exact odd-seed scans below 200000.
The older barrier-order, charged-excursion, and d-bound programs are retained
as evidence and research history, but are not dependencies of the theorem.
