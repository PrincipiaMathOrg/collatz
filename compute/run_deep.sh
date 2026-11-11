set -x
python zt_mitm_deep.py --validate 14 > deep_validate14.txt 2>&1
python zt_mitm_deep.py 20 > deep_k20.txt 2>&1
python zt_mitm_deep.py 23 --L 8 > deep_k23_L8.txt 2>&1
echo DONE > deep_status.txt
