namespace('App.Utilities')

const cyclic = ({ neighborhood, currentState, nextState, theta }) => {
  const count = neighborhood.reduce((memo, value) => (
    value === nextState ? memo += 1 : memo
  ), 0)

  return count >= theta
}

const greenbergHastings = (params) => {
  return params.currentState > 0 || cyclic(params)
}

App.Utilities.rules = {
  cyclic, greenbergHastings
}
