import { TileSize, UISize } from '../constant'
import Drawing from './Drawing'


class UI {
  loader = null
  input = null
  rows = 0
  cols = 0
  canvas = null
  success = false
  gameover = false

  constructor(rows, cols, ratio, loader, input){
    this.rows = rows
    this.cols = cols
    this.loader = loader
    this.input = input

    this.drawing = new Drawing(
      cols * TileSize,
      rows * TileSize + UISize,
      ratio
    )
  }

  update(){

  }

  draw(score){
    const foodImage = this.loader.getImage('board.food')
    const check = this.loader.getImage('ui.check')
    const { success } = this
    const top = this.rows * TileSize
    let roundWidth = 106

    if( score > 9 ){
      roundWidth += 6
    }

    this.drawing.draw(({ context, width, height }) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      context.fillStyle = success ? '#79DECD' : '#9289FF'
      context.fillRect(0, top, context.canvas.width, context.canvas.height)
      context.fillStyle = success ? '#32D0B5' : '#6F57FF'

      roundRect(context, 16, top + 8, roundWidth, 32, 16)

      context.fill()

      context.drawImage(
        foodImage,
        0,
        0,
        48,
        48,
        22,
        top + 12,
        24,
        24
      )

      context.fillStyle = '#FFF'
      context.font = '14px sans-serif'
      context.fillText('Score:', 54, top + 29)
      context.font = 'bold 14px sans-serif'
      context.fillText(score, 100, top + 29)

      if( success ){
        context.font = 'bold 16px sans-serif'
        const text = 'Quest Completed!'

        const { width } = context.measureText(text)
        const x = this.cols * TileSize - width - 16

        context.fillText(text, x, top + 29)

        context.drawImage(
          check,
          0,
          0,
          40,
          40,
          x - 28,
          top + 14,
          20,
          20
        )
      }

      if( this.gameover ){
        this.drawPlayAgain({ context, width, height })
      }
    })
  }

  drawPlayAgain({ context, width, height }){
    context.fillStyle = 'rgba(0,0,0,.3)'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    const buttonWidth = 140
    const buttonHeight = 44

    const buttonX = width / 2 - buttonWidth / 2
    const buttonY = (height - UISize) / 2 - buttonHeight / 2


    roundRect(context, buttonX, buttonY, buttonWidth, buttonHeight, 22)

    context.strokeStyle = '#FFF'
    context.stroke()

    context.font = 'bold 16px sans-serif'
    context.fillStyle = '#FFF'

    context.fillText('Play Again', buttonX + 32, buttonY + 28)
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
  }
}


function roundRect(context, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  context.beginPath()
  context.moveTo(x+r, y)
  context.arcTo(x+w, y,   x+w, y+h, r)
  context.arcTo(x+w, y+h, x,   y+h, r)
  context.arcTo(x,   y+h, x,   y,   r)
  context.arcTo(x,   y,   x+w, y,   r)
  context.closePath()
}


export default UI
