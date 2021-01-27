function kangaroo(x1, v1, x2, v2) {
  if (v1 <= v2) return "NO";

  const minusStart = x2 - x1;
  const minusJump = v2 - v1;
  if (minusStart % minusJump === 0) return "YES";
  else return "NO";
}
