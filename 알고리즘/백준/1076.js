//저항
//prettier-ignore
const colorArr = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  let colorIdx = [];
  colorIdx = input.map((v) => colorArr.indexOf(v));
  const answer =
    parseInt(colorIdx[0] + "" + colorIdx[1]) * Math.pow(10, colorIdx[2]);
  console.log(answer);
  process.exit();
});
