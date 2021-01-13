var isPalindrome = function (x) {
  return x + "" === (x + "").split("").reverse().join("");
};
