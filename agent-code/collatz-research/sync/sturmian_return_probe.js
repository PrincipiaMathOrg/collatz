'use strict';

function mechanical(alpha, rho, N) {
  const a = new Array(N);
  for (let n = 0; n < N; n++) {
    a[n] = Math.floor((n + 1) * alpha + rho) - Math.floor(n * alpha + rho);
  }
  return a.join('');
}

function firstReturn(word, ell) {
  return word.indexOf(word.slice(0, ell), 1);
}

const slopes = [
  ['golden', (Math.sqrt(5) - 1) / 2],
  ['sqrt2', Math.sqrt(2) - 1],
  ['sqrt3', Math.sqrt(3) - 1],
  ['pi', Math.PI - 3]
];
const rhos = [0, 0.1, 0.271828, 0.5, 0.777777];
const N = Number(process.argv[2] || 200000);
const maxEll = Number(process.argv[3] || 3000);
const threshold = Math.log(2) / Math.log(3);

for (const [name,alpha] of slopes) {
  for (const rho of rhos) {
    const w = mechanical(alpha, rho, N);
    let min = null, lateMin = null, violations = 0;
    for (let ell = 20; ell <= maxEll; ell++) {
      const d = firstReturn(w, ell);
      if (d < 0) continue;
      const ratio = d / ell;
      const row = {ell,d,ratio};
      if (!min || ratio < min.ratio) min = row;
      if (ell >= maxEll / 2 && (!lateMin || ratio < lateMin.ratio)) lateMin = row;
      if (ratio < threshold) violations++;
    }
    console.log(JSON.stringify({name,alpha,rho,min,lateMin,violations,threshold}));
  }
}
