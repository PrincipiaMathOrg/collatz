#!/usr/bin/env python3
"""Independent verifier for mass_shells_k0_1000.csv.

This verifier recomputes Pascal rows incrementally, checks every minimizing
threshold and upward-rounded summand recorded in the CSV, and verifies the
final scaled sum.  All proof-relevant arithmetic is integral.
"""
from __future__ import annotations
import csv
from pathlib import Path

SCALE=10**15
EXPECTED=10_788_901_977_820_654


def ceil_div(a:int,b:int)->int:
    return (a+b-1)//b


def main()->None:
    path=Path(__file__).with_name('mass_shells_k0_1000.csv')
    rows=list(csv.DictReader(path.open(encoding='utf-8')))
    if len(rows)!=1001:
        raise AssertionError(f'row count {len(rows)} != 1001')
    pascal=[1]
    scaled=0
    for k,row in enumerate(rows):
        if int(row['k'])!=k:
            raise AssertionError(f'bad k at row {k}')
        if k>0:
            nxt=[1]*(k+1)
            for j in range(1,k):
                nxt[j]=pascal[j-1]+pascal[j]
            pascal=nxt
        suffix=[0]*(k+2)
        for j in range(k,-1,-1):
            suffix[j]=suffix[j+1]+pascal[j]
        best=None
        minimizer=None
        geom=0
        p3=1
        for t in range(k+1):
            geom += p3
            p3 *= 3
            candidate=suffix[t+1]+geom
            if best is None or candidate<best:
                best=candidate
                minimizer=t
        assert best is not None and minimizer is not None
        numerator=min(1<<k,best+k)
        denominator=3*(1<<k)-1
        rounded=ceil_div(SCALE*numerator,denominator)
        observed=(int(row['B_k']),int(row['minimizing_t']),
                  int(row['shell_numerator']),int(row['ceil_1e15_term']))
        expected=(best,minimizer,numerator,rounded)
        if observed!=expected:
            raise AssertionError(f'row {k}: {observed} != {expected}')
        scaled += rounded
    if scaled!=EXPECTED:
        raise AssertionError(f'scaled {scaled} != {EXPECTED}')
    print('rows_verified=1001')
    print(f'scaled_upward_sum={scaled}')
    print('certificate_passed=True')

if __name__=='__main__':
    main()
