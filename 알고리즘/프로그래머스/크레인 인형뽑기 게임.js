function solution(board, moves) {
  let answer = 0;
  let stack = [];
  for (let move of moves) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][move - 1]) {
        const doll = board[i][move - 1];
        board[i][move - 1] = 0;
        if (stack[stack.length - 1] === doll) {
          stack.pop();
          answer += 2;
        } else {
          stack.push(doll);
        }
        break;
      }
    }
  }
  return answer;
}
const res = solution(
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ],
  [1, 5, 3, 5, 1, 2, 1, 4]
);

console.log(res);
