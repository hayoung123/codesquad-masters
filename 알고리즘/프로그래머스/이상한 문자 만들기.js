function solution(s) {
  const sArray = s.split(" ").map((str) => customStr(str));
  return sArray.join(" ");
}

function customStr(s) {
  return s
    .split("")
    .map((v) => v.trim())
    .map((v, idx) => {
      if (idx % 2 !== 0) return v.toLowerCase();
      else return v.toUpperCase();
    })
    .join("");
}

console.log(solution("try hello world"));
