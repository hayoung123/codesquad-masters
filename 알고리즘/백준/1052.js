//물병

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [n, k] = line.split(" ").map((v) => parseInt(v));
  console.log(solution(n, k));
  rl.close();
}).on("close", function () {
  process.exit();
});

function solution(n, k) {
  let count = k;
  let checkPoint = 0;
  let bin = n.toString(2).split("");
  let sumBin = bin.reduce((acc, cur) => acc + cur * 1, 0);

  if (sumBin <= k) return 0;

  for (let i = 0; i < bin.length; i++) {
    if (count === 0) break;
    if (bin[i] === "1") {
      checkPoint = i;
      count--;
    }
  }

  bin = bin.slice(checkPoint);
  const decimal = parseInt(bin.join(""), 2);
  const answer = Math.pow(2, bin.length) - decimal;
  return answer;
}

const k = solution(9, 2);
console.log(k);
