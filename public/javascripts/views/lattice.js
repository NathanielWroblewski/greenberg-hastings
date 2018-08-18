namespace('App.Views')

class Lattice {
  constructor ({ el, model }) {
    this.el = el
    this.model = model
  }

  template ({ world, width }) {
    return world.reduce((html, value, index) => {
      if (index % width === 0) html += '<div class="row">'
      html += `<div class="cell color-${value}"></div>`
      if (index % width === width - 1) html += '</div>'

      return html
    }, '')
  }

  render () {
    this.el.innerHTML = this.template(this.model.toJSON())
  }
}

App.Views.Lattice = Lattice
