// 분산처리

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  const solution = (line) => {
    let [a, b] = line.split(" ").map((v) => parseInt(v));
    a = a % 10;
    b = b % 4 ? b % 4 : 4;
    let answer = Math.pow(a, b) % 10 ? Math.pow(a, b) % 10 : 10;
    console.log(answer);
  };
  input.shift();
  input.forEach((v) => solution(v));
  process.exit();
});
