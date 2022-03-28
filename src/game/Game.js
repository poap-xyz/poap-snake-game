import Loader from './Loader'
import Input from './Input'
import Camera from './Camera'
import World from './World'


class Game {
  context = null
  input = null
  camera = null
  world = null
  frameId = null
  targetFrameTime = 1000 / 60
  lastTime = 0
  accumulator = 0

  constructor(rows, cols, ratio, targetScore, onComplete, canvas){
    this.context = canvas.getContext('2d')
    this.loader  = new Loader()
    this.input   = new Input(canvas.getBoundingClientRect())
    this.camera  = new Camera(ratio)
    this.world   = new World(
      rows,
      cols,
      ratio,
      targetScore,
      onComplete,
      this.loader,
      this.input,
      this.camera
    )
  }

  initialize(){
    this.input.bindEvents()

    this.loader.loadResources(() => {
      this.world.initialize()

      this.loop(0)
    })
  }

  shutdown(){
    this.input.unbindEvents()

    cancelAnimationFrame(this.frameId)
  }

  loop(now){
    this.frameId = requestAnimationFrame(this.loop.bind(this))

    const deltaTime = now - this.lastTime
    const delta = this.targetFrameTime / 1000

    this.lastTime += deltaTime
    this.accumulator += deltaTime

    while( this.accumulator > this.targetFrameTime ){
      this.camera.update(delta)
      this.world.update(delta)
      this.accumulator -= this.targetFrameTime
    }

    this.camera.transform(this.context)
    this.world.render(this.context)
  }
}

export default Game
