"use strict";

// Exact integer part of the proof that D_s=2^ceil(s log_2 3)-3^s>s/3.
// For s>=63 we use the imported linear-form estimate
//   Lambda > exp(-6.125581) s^(-13.3)
// and the elementary weakenings exp(-6.125581)>3^(-7),
// s^(-13.3)>s^(-14).  The checks below certify the base and monotonicity
// comparisons needed for the infinite tail, and enumerate s<=62 exactly.

function firstPowerOfTwoAbove(n) {
  let M = 1n, k = 0;
  while (M <= n) {
    M *= 2n;
    ++k;
  }
  return {M, k};
}

let leastSlack = null, leastRow = null;
for (let s = 1; s <= 62; ++s) {
  const P = 3n ** BigInt(s);
  const {M, k} = firstPowerOfTwoAbove(P);
  const D = M - P;
  const slack = 3n * D - BigInt(s);
  if (slack <= 0n) throw new Error(`finite gap failure at s=${s}`);
  if (leastSlack === null || slack < leastSlack) {
    leastSlack = slack;
    leastRow = {s, k, M, P, D, slack};
  }
}

// At s=63, 3^(s-6)>s^15.  The ratio of consecutive left/right
// sides is 3*(s/(s+1))^15>1 for every s>=63; it suffices to check s=63.
const baseLeft = 3n ** 57n;
const baseRight = 63n ** 15n;
const monotoneLeft = 3n * 63n ** 15n;
const monotoneRight = 64n ** 15n;
if (baseLeft <= baseRight) throw new Error("tail base comparison");
if (monotoneLeft <= monotoneRight) throw new Error("tail monotonicity comparison");

console.log("finite range: exact D_s>s/3 for 1<=s<=62");
console.log(Object.entries(leastRow).map(([k, v]) => `${k}=${v}`).join(" "));
console.log(`tail base: 3^57=${baseLeft} > 63^15=${baseRight}`);
console.log(`tail ratio: 3*63^15=${monotoneLeft} > 64^15=${monotoneRight}`);
console.log("with Lambda>exp(-6.125581)s^-13.3, e<3, and exp(x)-1>x, this proves D_s>s/3 for every s>=1");
