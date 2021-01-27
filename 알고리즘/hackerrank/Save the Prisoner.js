function saveThePrisoner(n, m, s) {
  let last = (m % n) + s - 1;

  if (last > n) last -= n;
  else if (last === 0) last = n;

  return last;
}
