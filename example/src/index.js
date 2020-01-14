import * as physics from './physics'
import * as renderer from './renderer'
import { makeEntities } from './entities'

let tick = 0

const entities = makeEntities()

const update = () => {
  tick++
  physics.update(entities)
  renderer.update(entities)
  // if (tick >= 200) return // DEBUG: only run a few ticks then stop
  requestAnimationFrame(update)
}

physics.onLoad(() => {
  physics.init(entities)
  renderer.init(entities)
  update()
})
