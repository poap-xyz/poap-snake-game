import background from '../asset/img/bg.png'
import snakeHead from '../asset/img/head.png'
import snakeEye from '../asset/img/eye.png'
import food from '../asset/img/food.png'
import check from '../asset/img/check.png'
import keys from '../asset/img/keys.png'
import swipe from '../asset/img/swipe.png'


class Loader {
  images = new Map()
  promises = []

  loadResources(onReady){
    this.loadImage('board.background', background)
    this.loadImage('board.food', food)
    this.loadImage('snake.head', snakeHead)
    this.loadImage('snake.eye', snakeEye)
    this.loadImage('ui.check', check)
    this.loadImage('ui.keys', keys)
    this.loadImage('ui.swipe', swipe)

    this.waitForReady(onReady)
  }

  loadImage(name, source){
    const image = new Image()
    image.src = source

    this.images.set(name, image)

    this.promises.push(
      new Promise(resolve => {
        image.addEventListener('load', resolve)
      })
    )
  }

  getImage(name){
    return this.images.get(name)
  }

  waitForReady(onReady){
    Promise.all(this.promises).then(onReady)
  }
}

export default Loader
