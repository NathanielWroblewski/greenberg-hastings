namespace('App.Views')

class Canvas {
  constructor ({ el, context, next, model, colorwheel }) {
    this.el = el
    this.context = context || this.el.getContext('2d')
    this.next = next
    this.model = model
    this.colorwheel = colorwheel
  }

  clear () {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  update () {
    this.model.step()
  }

  draw ({ world, width, height }) {
    world.forEach((value, index) => {
      this.context.fillStyle = this.colorwheel[value]
      this.context.fillRect(index % width, Math.floor(index / width), 1, 1)
    })
  }

  render () {
    this.clear()
    this.update()
    this.draw(this.model.toJSON())
    this.next(() => this.render())
  }
}

App.Views.Canvas = Canvas
