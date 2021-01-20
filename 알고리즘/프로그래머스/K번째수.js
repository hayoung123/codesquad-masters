function solution(array, commands) {
  const answer = [];
  for (let x of commands) {
    const [i, j, k] = x;
    const tmpArr = array.slice(i - 1, j);
    tmpArr.sort((a, b) => a - b);
    answer.push(tmpArr[k - 1]);
  }
  return answer;
}
