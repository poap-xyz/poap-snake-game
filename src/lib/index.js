

export function getDistance(x1, y1, x2, y2){
  const dy = x2 - x1
  const dx = y2 - y1

  return Math.sqrt(dx * dx + dy * dy)
}


export function circleCollision(p1x, p1y, r1, p2x, p2y, r2) {
  return r1 + r2 > getDistance(p1x, p1y, p2x, p2y)
}


export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}


export function lerp(start, end, dt){
  const diff = end - start

  if( diff > dt ){
    return start + dt
  }
  if( diff < -dt ){
    return start - dt
  }

  return end
}


export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
