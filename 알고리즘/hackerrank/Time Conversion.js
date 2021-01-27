function timeConversion(s) {
  let [hour, ...restTime] = s.slice(0, -2).split(":");
  let type = s.slice(-2);
  if (type === "PM") {
    hour = hour === "12" ? "12" : hour * 1 + 12;
  } else {
    hour = hour === "12" ? "00" : hour;
  }
  return [hour, ...restTime].join(":");
}
