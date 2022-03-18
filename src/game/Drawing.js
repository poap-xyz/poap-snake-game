class Drawing {
  canvas = null
  context = null
  width = 0
  height = 0
  ratio = 1
  widthRatio = 0
  heightRatio = 0

  constructor(width, height, ratio){
    this.width  = width
    this.height = height

    this.ratio  = ratio

    this.widthRatio  = width * ratio
    this.heightRatio = height * ratio

    this.canvas = document.createElement('canvas')

    this.canvas.width  = this.widthRatio
    this.canvas.height = this.heightRatio

    this.context = this.canvas.getContext('2d')
  }

  clear(){
    this.context.clearRect(0, 0, this.widthRatio, this.heightRatio)
  }

  draw(render){
    this.context.setTransform(this.ratio, 0 , 0, this.ratio, 0, 0)

    render(this)
  }
}

export default Drawing
