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
  let sum = a + b;
  const mod = sum % 10;
  const carry = (sum - mod) / 10;
  return [mod, carry];
}

function fullAdder(a = 0, b = 0, carry = 0) {
  const [tmpSum, tmpCarry] = halfAdder(a, b);
  const [finalSum, finalCarry] = halfAdder(carry, tmpSum);
  return [finalSum, tmpCarry + finalCarry];
}

function decAdder(a, b) {
  const sumDec = [];
  let beforeCarry = 0;
  const [decA, decB] = [a, b].sort((a, b) => b.length - a.length);
  for (let i = 0; i < decA.length; i++) {
    const [sum, carry] = fullAdder(decA[i], decB[i], beforeCarry);
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

console.log(solution("1", "2"));
