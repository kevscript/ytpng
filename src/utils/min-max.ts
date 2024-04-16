export function minMax(min: number, max: number, value: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}
