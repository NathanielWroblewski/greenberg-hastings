!function () {
  const { CellularAutomata } = App.Models
  const { Canvas, Lattice, Controls } = App.Views
  const { vonNeumann, moore } = App.Utilities.neighborhoods
  const { cyclic, greenbergHastings } = App.Utilities.rules

  const next = loop => window.requestAnimationFrame(loop)

  /**
   * Figure 1 - canvas animation of CCA (rho=1, theta=1, kappa=14)
  **/
  !function figure1 () {
    const el = document.querySelector('.cca-model')
    const { height, width } = el
    const colorwheel = [
      '#922B21', '#A93226', '#C0392B', '#CB4335', '#E74C3C', '#CD6155',
      '#EC7063', '#D35400', '#DC7633', '#E67E22', '#EB984E', '#F39C12',
      '#F8C471', '#F4D03F', '#F7DC6F'
    ]
    const kappa = colorwheel.length
    const theta = 1
    const rho = 1
    const neighbors = vonNeumann
    const rule = cyclic

    const world = new Array(height * width).fill(0)
    const model = new CellularAutomata({
      world, height, width, kappa, theta, rho, neighbors, rule
    })
    const view = new Canvas({ el, next, model, colorwheel })

    model.randomize()
    view.render()
  }()

  /**
   * Figure 2 - Interactive model
  **/
  !function figure2 () {
    const kappa = 8
    const theta = 8
    const rho = 4
    const neighbors = moore
    const rule = greenbergHastings

    // Zoomed-in CA
    const zoomedIn = document.querySelector('.interactive-model .zoomed-in')
    const zoomedInHeight = 30
    const zoomedInWidth = 58
    const world = new Array(zoomedInHeight * zoomedInWidth).fill(0)
    const model = new CellularAutomata({
      height: zoomedInHeight,
      width: zoomedInWidth,
      world, kappa, theta, rho, neighbors, rule
    })
    const view = new Lattice({ el: zoomedIn, model })

    model.randomize()
    view.render()

    setInterval(function () {
      model.step()
      view.render()
    }, 500)

    // Zoomed-out CA
    const zoomedOut = document.querySelector('.interactive-model .zoomed-out')
    const { height, width } = zoomedOut
    const grid = new Array(height * width).fill(0)
    const colorwheel = [
      '#eee', '#ddd', '#ccc', '#bbb', '#aaa', '#999', '#888', '#777', '#666',
      '#555', '#444',
    ]
    const automaton = new CellularAutomata({
      world: grid, height, width, kappa, theta, rho, neighbors, rule
    })
    const canvas = new Canvas({ el: zoomedOut, model: automaton, next, colorwheel })

    automaton.randomize()
    canvas.render()

    // Controls
    const form = document.querySelector('.controls')
    const controls = new Controls({ el: form, models: [model, automaton] })

    controls.render()
  }()
}()
