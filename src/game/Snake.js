import {
  TileSize,
  Direction,
  DirectionModifier,
  DirectionAllowed,
  LeftEyeModifier,
  RightEyeModifier
} from '../constant'
import { lerp } from '../lib'
import Drawing from './Drawing'


const frames = {
  head: {
    [Direction.UP]: [0, 0],
    [Direction.RIGHT]: [1, 0],
    [Direction.DOWN]: [2, 0],
    [Direction.LEFT]: [3, 0]
  }
}


const frameSize = 64

class Snake {
  loader = null
  input = null
  live = false
  direction = Direction.RIGHT
  grow = false
  velocity = 1
  nextTimer = 0
  target = null
  leftEye = null
  rightEye = null
  segments = []


  constructor(rows, cols, ratio, loader, input){
    this.loader = loader
    this.input = input

    this.drawing = new Drawing(
      cols * TileSize,
      rows * TileSize,
      ratio
    )
  }

  spawn(row, col){
    this.live = true
    this.direction = Direction.RIGHT
    this.grow = false
    this.velocity = 5
    this.moveTimer = 0
    this.target = null

    this.leftEye = {
      x: 0,
      y: 0
    }

    this.rightEye = {
      x: 0,
      y: 0
    }

    this.segments = []
    this.addSegments(row, col)
  }

  addSegments(row, col){
    for( let i = 0; i < 4; i++ ){
      this.segments.unshift({
        row: row,
        col: (col + i),
        x: (col + i) * TileSize,
        y: row * TileSize,
        direction: this.direction
      })
    }
  }

  setTarget(row, col){
    this.target = [row, col]

    this.updateEyes()
  }

  update(delta){
    this.updateDirection()

    this.nextTimer += delta

    const maxMoveTime = 1 / this.velocity

    if (this.nextTimer >= maxMoveTime) {
      this.next()

      this.nextTimer = 0
    }

    this.move(delta)

    this.updateEyes()
  }

  updateDirection(){
    const { keys, swipe } = this.input

    let direction = this.direction

    if( keys.KeyW || keys.ArrowUp || swipe.up ){
      direction = Direction.UP
    }
    else if ( keys.KeyA || keys.ArrowLeft || swipe.left ){
      direction = Direction.LEFT
    }
    else if ( keys.KeyS || keys.ArrowDown || swipe.down ){
      direction = Direction.DOWN
    }
    else if ( keys.KeyD || keys.ArrowRight || swipe.right ){
      direction = Direction.RIGHT
    }

    if( DirectionAllowed[this.segments[0].direction][direction] ){
      this.direction = direction
    }
  }

  move(delta){
    const { segments, velocity } = this

    const acc = TileSize * velocity * delta

    for( let i = 0; i < segments.length; i++ ){
      const segment = segments[i]

      segment.x = lerp(segment.x, segment.col * TileSize, acc)
      segment.y = lerp(segment.y, segment.row * TileSize, acc)

      //segment.y = segment.row * TileSize
      //segment.x = segment.col * TileSize
    }
  }

  next(){
    const { segments } = this

    const tail = {
      ...segments[ segments.length - 1 ]
    }

    for( let i = segments.length - 1; i > 0; i-- ){
      const segment = segments[i]

      segment.row = segments[i - 1].row
      segment.col = segments[i - 1].col
    }

    const [ head ] = segments

    head.row += DirectionModifier[this.direction][1]
    head.col += DirectionModifier[this.direction][0]
    head.direction = this.direction

    if( this.grow ){
      segments.push(tail)
      this.grow = false
    }
  }

  updateEyes(){
    const { x, y, direction } = this.segments[0]

    const targetX = this.target[1] * TileSize + TileSize / 2
    const targetY = this.target[0] * TileSize + TileSize / 2

    const leftEyeBaseX = x + LeftEyeModifier[direction][0]
    const leftEyeBaseY = y + LeftEyeModifier[direction][1]
    const leftEyeAngle = Math.atan2(targetY - leftEyeBaseY, targetX - leftEyeBaseX)

    const rightEyeBaseX = x + RightEyeModifier[direction][0]
    const rightEyeBaseY = y + RightEyeModifier[direction][1]
    const rightEyeAngle = Math.atan2(targetY - rightEyeBaseY, targetX - rightEyeBaseX)

    this.leftEye.x = leftEyeBaseX + Math.cos(leftEyeAngle) * 3
    this.leftEye.y = leftEyeBaseY + Math.sin(leftEyeAngle) * 3

    this.rightEye.x = rightEyeBaseX + Math.cos(rightEyeAngle) * 3
    this.rightEye.y = rightEyeBaseY + Math.sin(rightEyeAngle) * 3
  }

  eat(){
    this.grow = true
  }

  die(){
    this.live = false

    this.move(0.016)

    this.draw()
  }

  draw(){
    this.drawing.clear()
    this.drawing.draw(({ context }) => {
      context.beginPath()

      context.lineCap = 'round'
      context.lineJoin = 'round'

      for( let i = this.segments.length - 1; i >= 0; i-- ){
        const radius = Math.max(22 - (i * 0.5), 14)

        const { x, y } = this.segments[i]
        let cx = x + TileSize / 2
        let cy = y + TileSize / 2

        const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.8)

        gradient.addColorStop(0, '#9979FF')
        gradient.addColorStop(1, '#F29DEA')

        context.lineWidth = radius
        context.strokeStyle = gradient

        context.lineTo(cx, cy)
        context.stroke()

        context.beginPath()
        context.moveTo(cx, cy)
      }

      context.closePath()

      this.renderHead(context)
    })
  }

  renderHead(context){
    const { x, y, direction } = this.segments[0]

    context.drawImage(
      this.loader.getImage('snake.head'),
      frames.head[direction][0] * frameSize,
      frames.head[direction][1] * frameSize,
      frameSize,
      frameSize,
      x,
      y,
      TileSize,
      TileSize
    )

    context.drawImage(
      this.loader.getImage('snake.eye'),
      0,
      0,
      12,
      12,
      this.leftEye.x - 3,
      this.leftEye.y - 3,
      6,
      6
    )

    context.drawImage(
      this.loader.getImage('snake.eye'),
      0,
      0,
      12,
      12,
      this.rightEye.x - 3,
      this.rightEye.y - 3,
      6,
      6
    )

    /*
    context.fillStyle = 'red'

    context.beginPath()
    context.arc(this.leftEye.x, this.leftEye.y, 3, 0, 2 * Math.PI)
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(this.rightEye.x, this.rightEye.y, 3, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
*/
  }

  render(context){
    if( this.live ){
      this.draw()
    }

    const { canvas, width, height, widthRatio, heightRatio } = this.drawing

    context.drawImage(
      canvas,
      0,
      0,
      widthRatio,
      heightRatio,
      0,
      0,
      width,
      height
    )
  }
}

export default Snake
