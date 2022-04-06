export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
export function lerp(start, end, dt) {
  const diff = end - start;

  if (diff > dt) {
    return start + dt;
  }

  if (diff < -dt) {
    return start - dt;
  }

  return end;
}
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}