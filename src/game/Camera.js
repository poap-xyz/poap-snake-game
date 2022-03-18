class Camera {
  x = 0
  y = 0
  ratio = 1
  shouldShake = false
  shakeTimer = 0
  amount = 12

  constructor(ratio){
    this.ratio = ratio
  }

  update(delta){
    if( this.shouldShake ){
      this.shakeTimer += delta

      this.x = (Math.random() - 0.5) * this.amount
      this.y = (Math.random() - 0.5) * this.amount

      if( this.shakeTimer >= 0.4 ){
        this.shouldShake = false
      }
    }
    else {
      this.x = 0
      this.y = 0
      this.shakeTimer = 0
    }
  }

  shake(){
    this.shouldShake = true
  }

  transform(context){
    context.setTransform(this.ratio, 0 , 0, this.ratio, this.x, this.y)
  }
}

export default Camera
