var reverse = function (x) {
  const limit = Math.pow(2, 31);
  let sign = x > 0 ? 1 : -1;
  const arr = (x * sign + "").split("");
  let answer = arr.reverse().join("") * 1;
  if (answer > limit - 1 || answer < limit * -1) {
    answer = 0;
  }
  return answer * sign;
};
