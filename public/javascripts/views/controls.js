namespace('App.Views')

const BOUNDS = {
  rho: { min: 1, max: 4 },
  theta: { min: 1, max: 10 },
  kappa: { min: 3, max: 10 }
}

class Controls {
  constructor ({ el, models }) {
    const { moore, vonNeumann } = App.Utilities.neighborhoods
    const { cyclic, greenbergHastings } = App.Utilities.rules

    this.el = el
    this.models = models
    this.handleRho = this.getNumberHandlerFor('rho')
    this.handleTheta = this.getNumberHandlerFor('theta')
    this.handleKappa = this.getNumberHandlerFor('kappa')
    this.handleMoore = e => this.handleField('neighbors', moore)
    this.handleNeumann = e => this.handleField('neighbors', vonNeumann)
    this.handleCCA = e => this.handleField('rule', cyclic)
    this.handleGH = e => this.handleField('rule', greenbergHastings)
  }

  get events () {
    return {
      'change #extent': 'handleRho',
      'change #threshold': 'handleTheta',
      'change #states': 'handleKappa',
      'click #von-neumann': 'handleNeumann',
      'click #moore': 'handleMoore',
      'click #cca': 'handleCCA',
      'click #gh': 'handleGH',
    }
  }

  _eachEvent (fn) {
    Object.entries(this.events).forEach(([key, value]) => {
      const [event, selector] = key.split(' ')
      const handler = this[value]
      const element = this.el.querySelector(selector)

      if (element) {
        fn(element, event, handler)
      }
    })
  }

  setListeners () {
    this._eachEvent((element, event, handler) => (
      element.addEventListener(event, handler)
    ))
  }

  removeListeners () {
    this._eachEvent((element, event, handler) => (
      element.removeEventListener(event, handler)
    ))
  }

  getNumberHandlerFor (field) {
    const models = this.models
    const { min, max } = BOUNDS[field]
    const self = this

    return e => {
      models.forEach(model => {
        model[field] = Math.min(Math.max(parseInt(e.target.value, 10), min), max)
        model.randomize()
      })

      self.render()
    }
  }

  handleField (field, value) {
    this.models.forEach(model => {
      model[field] = value
      model.randomize()
    })

    this.render()
  }

  template ({ rho, theta, kappa }) {
    return `
      <form>
        <!-- TODO: set boundaries/validations -->
        <fieldset>
          <legend><i>&rho;</i></legend>
          <label for="extent">Extent</label>
          <input
            type="number"
            id="extent"
            value="${rho}"
            min="${BOUNDS.rho.min}"
            max="${BOUNDS.rho.max}"
          />
          <input type="radio" id="moore" name="rho" checked />
          <label for="moore">Moore</label>
          <input type="radio" id="von-neumann" name="rho" />
          <label for="von-neumann">von Neumann</label>
        </fieldset>
        <fieldset>
          <legend><i>&theta;</i></legend>
          <label for="threshold">Threshold</label>
          <input
            type="number"
            id="threshold"
            value="${theta}"
            min="${BOUNDS.theta.min}"
            max="${BOUNDS.theta.max}"
          />
        </fieldset>
        <fieldset>
          <legend><i>&kappa;</i></legend>
          <label for="states">States</label>
          <input
            type="number"
            id="states"
            value="${kappa}"
            min="${BOUNDS.kappa.min}"
            max="${BOUNDS.kappa.max}"
          />
        </fieldset>
        <fieldset>
          <legend><i>Model</i></legend>
          <input type="radio" id="gh" name="model" checked />
          <label for="gh">Greenberg-Hastings automaton</label>
          <input type="radio" id="cca" name="model" />
          <label for="cca">cyclic cellular automaton</label>
        </fieldset>
    </form>`
  }

  render () {
    this.removeListeners()
    this.el.innerHTML = this.template(this.models[0].toJSON())
    this.setListeners()

    return this
  }
}

App.Views.Controls = Controls
