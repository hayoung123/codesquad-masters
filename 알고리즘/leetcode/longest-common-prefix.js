var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  let answer = "";
  let common = "";
  strs.sort((a, b) => a.length - b.length);

  for (let i = 0; i < strs[0].length; i++) {
    common = strs[0].slice(0, i + 1);
    for (let str of strs.slice(1)) {
      if (common !== str.slice(0, i + 1)) return answer;
    }
    answer = common;
  }

  return answer;
};

console.log(longestCommonPrefix(["a"]));
