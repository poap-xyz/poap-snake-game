import { ReservedKeys } from '../constant'
import { isTouchDevice } from '../lib'


class Input {
  constructor(){
    this.keys = {}
    this.x = null
    this.y = null
    this.pressing = false
    this.swipe = {
      up: false,
      right: false,
      down: false,
      left: false
    }
  }

  handleKeyDown = event => {
    if( ReservedKeys[event.code] ){
      event.preventDefault()
    }

    this.keys[event.code] = true
  }

  handleKeyUp = ({ code }) => {
    this.keys[code] = false
  }

  handleTouchStart = ({ touches: [ touch ] }) => {
    this.x = touch.clientX
    this.y = touch.clientY

    this.pressing = true
  }

  handleTouchMove = ({ touches: [ touch ] }) => {
    if( !this.x || !this.y ){
      return
    }

    const x = touch.clientX
    const y = touch.clientY

    const xDiff = this.x - x
    const yDiff = this.y - y

    if( Math.abs(xDiff) > Math.abs(yDiff) ){
      if( xDiff > 0 ){
        this.swipe.left = true
      }
      else {
        this.swipe.right = true
      }
    }
    else {
      if( yDiff > 0 ){
        this.swipe.up = true
      }
      else {
        this.swipe.down = true
      }
    }
  }

  handleTouchEnd = ({ layerX, layerY }) => {
    this.x = layerX
    this.y = layerY

    this.swipe = {
      up: false,
      right: false,
      down: false,
      left: false
    }

    this.pressing = false
  }

  handleMouseMove = ({ layerX, layerY }) => {
    this.x = layerX
    this.y = layerY
  }

  handleMouseDown = ({ layerX, layerY }) => {
    this.x = layerX
    this.y = layerY
    this.pressing = true
  }

  handleMouseUp = ({ layerX, layerY }) => {
    this.x = layerX
    this.y = layerY
    this.pressing = false
  }

  bindEvents(){
    if( isTouchDevice() ){
      window.addEventListener('touchstart', this.handleTouchStart)
      window.addEventListener('touchmove', this.handleTouchMove)
      window.addEventListener('touchend', this.handleTouchEnd)
    }
    else {
      window.addEventListener('keydown', this.handleKeyDown)
      window.addEventListener('keyup', this.handleKeyUp)

      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mousedown', this.handleMouseDown)
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  }

  unbindEvents(){
    if( isTouchDevice() ){
      window.removeEventListener('touchstart', this.handleTouchStart)
      window.removeEventListener('touchmove', this.handleTouchMove)
      window.removeEventListener('touchend', this.handleTouchEnd)
    }
    else {
      window.removeEventListener('keydown', this.handleKeyDown)
      window.removeEventListener('keyup', this.handleKeyUp)

      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mousedown', this.handleMouseDown)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}

export default Input
