namespace('App.Models')

class CellularAutomata {
  constructor ({ world, width, height, rho, kappa, theta, neighbors, rule }) {
    this.world = world
    this.width = width
    this.height = height
    this.kappa = kappa
    this.theta = theta
    this.neighbors = neighbors
    this.rho = rho
    this.rule = rule
  }

  randomize () {
    this.world = this.world.map(() => Math.floor(Math.random() * this.kappa))
  }

  step () {
    this.world = this.world.map((_, index) => this.update(index))
  }

  update (index) {
    const { world, width, kappa, theta, rho } = this
    const currentState = world[index]
    const nextState = (currentState + 1) % kappa
    const neighborhood = this.neighbors({ index, world, width, rho })
    const shouldUpdate = this.rule({ neighborhood, currentState, nextState, theta })

    return shouldUpdate ? nextState : currentState
  }

  toJSON () {
    return {
      world: this.world,
      height: this.height,
      width: this.width,
      kappa: this.kappa,
      theta: this.theta,
      rho: this.rho
    }
  }
}

App.Models.CellularAutomata = CellularAutomata
