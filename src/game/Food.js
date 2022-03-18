import { TileSize } from '../constant'

class Food {
  loader = null
  row = 0
  col = 0

  constructor(loader){
    this.loader = loader
  }

  spawn(row, col){
    this.row = row
    this.col = col
  }

  render(context){
    const x = this.col * TileSize + 4
    const y = this.row * TileSize + 4

    context.drawImage(
      this.loader.getImage('board.food'),
      0,
      0,
      48,
      48,
      x,
      y,
      24,
      24
    )

    /*
    context.fillStyle = 'rgba(255,56,0,.9)'
    context.beginPath()
    context.arc(x, y, TileSize / 3, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
    */
  }
}

export default Food
