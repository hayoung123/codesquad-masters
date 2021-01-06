var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().split(" ");
var a = parseInt(input[0]);
var b = parseInt(input[1]);
console.log(a + b);

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("line", function (line) {
//   const [a, b] = line.split(" ");
//   console.log(a * 1 + b * 1);
//   rl.close();
// }).on("close", function () {
//   process.exit();
// });
