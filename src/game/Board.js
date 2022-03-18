import { TileSize, TileType } from '../constant'
import { getRandomInt } from '../lib'
import Drawing from './Drawing'


class Board {
  rows = 0
  cols = 0
  loader = null
  matrix = new Map()

  constructor(rows, cols, loader){
    this.rows = rows
    this.cols = cols

    this.loader = loader

    this.drawing = new Drawing(
      cols * TileSize,
      rows * TileSize,
      2
    )
  }

  initialize(segments){
    for( let row = 0; row < this.rows; row++ ){
      this.matrix.set(row, new Map())

      for( let col = 0; col < this.cols; col++ ){
        if( segments.find(segment => segment.row === row && segment.col === col) ){
          this.setSnake(row, col)
        }
        else {
          this.setFree(row, col)
        }
      }
    }

    this.draw()
  }

  get(row, col){
    return this.matrix.get(row).get(col)
  }

  set(row, col, type){
    return this.matrix.get(row).set(col, type)
  }

  setFree(row, col){
    this.set(row, col, TileType.FREE)
  }

  setFood(row, col){
    this.set(row, col, TileType.FOOD)
  }

  setSnake(row, col){
    this.set(row, col, TileType.SNAKE)
  }

  isFree(row, col){
    return this.get(row, col) === TileType.FREE
  }

  isFood(row, col){
    return this.get(row, col) === TileType.FOOD
  }

  isSnake(row, col){
    return this.get(row, col) === TileType.SNAKE
  }

  isInside(row, col){
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
  }

  isGoodMove(row, col){
    return this.isInside(row, col) && !this.isSnake(row, col)
  }

  getRandomFreeTile(){
    let tmpFree = []

    for( let row = 0; row < this.rows; row++ ){
      for( let col = 0; col < this.cols; col++ ){
        if( this.isFree(row, col) ){
          tmpFree.push([
            row,
            col
          ])
        }
      }
    }

    if( tmpFree.length === 0 ){
      return false
    }

    const rand = getRandomInt(0, tmpFree.length - 1)

    const tile = tmpFree[rand]

    tmpFree = null

    return tile
  }


  draw(){
    const pattern = this.loader.getImage('board.background')

    this.drawing.draw(({ context }) => {
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.fillStyle = context.createPattern(pattern, 'repeat')
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    })
  }

  render(context){
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

    /*
    for (let [row, cols] of this.matrix) {
      for (let [col, tileType] of cols) {

        if( tileType === TileType.FREE ){
          continue
        }

        context.fillStyle = 'rgba(0,0,100,.3)'
        context.fillRect(col * TileSize, row * TileSize, TileSize, TileSize)
      }
    }
    */
  }
}

export default Board
