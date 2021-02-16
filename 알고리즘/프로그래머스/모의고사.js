function solution(answers) {
  const answer = [0, 0, 0, 0];
  const s1 = [1, 2, 3, 4, 5];
  const s2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const s3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  answers.forEach((v, idx) => {
    if (v === s1[idx % s1.length]) answer[1]++;
    if (v === s2[idx % s2.length]) answer[2]++;
    if (v === s3[idx % s3.length]) answer[3]++;
  });

  const max = Math.max(...answer);
  if (max === 0) return [];
  const res = [];
  answer.forEach((v, idx) => {
    if (v === max) res.push(idx);
  });
  return res;
}

console.log(solution([1, 2, 3, 4, 5]));
console.log(solution([1, 3, 2, 4, 2]));
