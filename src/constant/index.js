export const TileSize = 32
export const UISize = 48

export const TileType = {
  FREE: 'FREE',
  SNAKE: 'SNAKE',
  FOOD: 'FOOD'
}


export const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT'
}


export const ReservedKeys = {
  Space: 1,
  ArrowUp: 1,
  ArrowDown: 1,
  ArrowLeft: 1,
  ArrowRight: 1
}


export const DirectionModifier = {
  [Direction.UP]: [0, -1],
  [Direction.RIGHT]: [1, 0],
  [Direction.DOWN]: [0, 1],
  [Direction.LEFT]: [-1, 0]
}


export const DirectionAllowed = {
  [Direction.UP]: {
    [Direction.LEFT]: true,
    [Direction.RIGHT]: true
  },

  [Direction.RIGHT]: {
    [Direction.UP]: true,
    [Direction.DOWN]: true
  },

  [Direction.DOWN]: {
    [Direction.LEFT]: true,
    [Direction.RIGHT]: true
  },

  [Direction.LEFT]: {
    [Direction.UP]: true,
    [Direction.DOWN]: true
  }
}


export const LeftEyeModifier = {
  [Direction.UP]: [8, 10],
  [Direction.RIGHT]: [22, 8],
  [Direction.DOWN]: [24, 22],
  [Direction.LEFT]: [10, 24]
}


export const RightEyeModifier = {
  [Direction.UP]: [25, 10],
  [Direction.RIGHT]: [22, 25],
  [Direction.DOWN]: [7, 22],
  [Direction.LEFT]: [10, 7]
}
