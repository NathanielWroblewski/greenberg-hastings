namespace('App.Utilities')

const wrap = (index, world) => {
  if (index > world.length - 1) return wrap(index - world.length, world)
  if (index < 0) return wrap(world.length + index, world)

  return index
}

const at = (index, world) => world[wrap(index, world)]

const moore = ({ index, world, width, rho }) => {
  const neighborhood = []

  for (let x = -rho; x <= rho; x++) {
    for (let y = -rho; y <= rho; y++) {
      if (x === 0 && y === 0) continue

      neighborhood.push(at(index + x + (y * width), world))
    }
  }

  return neighborhood
}

const vonNeumann = ({ index, world, width, rho }) => {
  const neighborhood = []

  for (let i = -rho; i <= rho; i++) {
    if (i === 0) continue

    neighborhood.push(at(index + i, world))
    neighborhood.push(at(index + (i * width), world))
  }

  return neighborhood
}

App.Utilities.neighborhoods = {
  moore, vonNeumann
}
