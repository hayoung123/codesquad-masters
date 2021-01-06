const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [a, b] = line.split(" ");
  console.log(solution(a, b));
  rl.close();
}).on("close", function () {
  process.exit();
});

function halfAdder(a, b) {
  const [carry, leave] = String(a + b).split("");
  if (!leave) return [parseInt(carry), 0];
  else return [parseInt(leave), parseInt(carry)];
}

function fullAdder(a, b, carry) {
  const [tmpSum, tmpCarry] = halfAdder(a, b);
  const [finalSum, finalCarry] = halfAdder(carry, tmpSum);
  return [finalSum, tmpCarry + finalCarry];
}

function decAdder(a, b) {
  const sumDec = [];
  let beforeCarry = 0;
  const [decA, decB] = [a, b].sort((a, b) => b.length - a.length);
  for (let i = 0; i < decA.length; i++) {
    const charA = decA[i];
    const charB = decB[i] ? decB[i] : 0;
    const [sum, carry] = fullAdder(charA, charB, beforeCarry);
    sumDec.push(sum);
    beforeCarry = carry;
  }
  if (beforeCarry !== 0) sumDec.push(beforeCarry);

  return sumDec;
}

function solution(a, b) {
  const reverseDecA = a
    .split("")
    .map((v) => parseInt(v))
    .reverse();
  const reverseDecB = b
    .split("")
    .map((v) => parseInt(v))
    .reverse();
  let sumDec = decAdder(reverseDecA, reverseDecB);
  sumDec = sumDec.reverse().join("");
  return sumDec;
}

console.log(solution("123456789123456789", "123456789123456789"));
