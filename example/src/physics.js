import physx from 'physx-js'
import physxModule from 'physx-js/dist/physx.release.wasm'

let loaded = false
let cb = null
let physics
let scene
let bodies = {}

const PhysX = physx({
  locateFile(path) {
    if (path.endsWith('.wasm')) {
      return physxModule
    }
    return path
  },
})

PhysX.onRuntimeInitialized = () => {
  loaded = true
  console.log('PhysX loaded')
  setup()
  if (cb) cb()
}

export const onLoad = _cb => {
  cb = _cb
  if (loaded) cb()
}

const setup = () => {
  const version = PhysX.PX_PHYSICS_VERSION
  const defaultErrorCallback = new PhysX.PxDefaultErrorCallback()
  const allocator = new PhysX.PxDefaultAllocator()
  const foundation = PhysX.PxCreateFoundation(
    version,
    allocator,
    defaultErrorCallback
  )
  const triggerCallback = {
    onContactBegin: () => {},
    onContactEnd: () => {},
    onContactPersist: () => {},
    onTriggerBegin: () => {},
    onTriggerEnd: () => {},
  }
  const physxSimulationCallbackInstance = PhysX.PxSimulationEventCallback.implement(
    triggerCallback
  )

  physics = PhysX.PxCreatePhysics(
    version,
    foundation,
    new PhysX.PxTolerancesScale(),
    false,
    null
  )
  PhysX.PxInitExtensions(physics, null)
  const sceneDesc = PhysX.getDefaultSceneDesc(
    physics.getTolerancesScale(),
    0,
    physxSimulationCallbackInstance
  )
  scene = physics.createScene(sceneDesc)
}

export const init = entities => {
  entities.forEach(entity => {
    let geometry
    if (entity.body.type === 'box') {
      geometry = new PhysX.PxBoxGeometry(
        // PhysX uses half-extents
        entity.body.size[0] / 2,
        entity.body.size[1] / 2,
        entity.body.size[2] / 2
      )
    }
    if (entity.body.type === 'spehre') {
      geometry = new Physx.PxSphereGeometry(...entity.body.size)
    }
    const material = physics.createMaterial(0.2, 0.2, 0.2)
    const flags = new PhysX.PxShapeFlags(
      PhysX.PxShapeFlag.eSCENE_QUERY_SHAPE.value |
        PhysX.PxShapeFlag.eSIMULATION_SHAPE.value
    )
    const shape = physics.createShape(geometry, material, false, flags)
    const transform = {
      translation: {
        x: entity.transform.position[0],
        y: entity.transform.position[1],
        z: entity.transform.position[2],
      },
      rotation: {
        w: entity.transform.rotation[3], // PhysX uses WXYZ quaternions,
        x: entity.transform.rotation[0],
        y: entity.transform.rotation[1],
        z: entity.transform.rotation[2],
      },
    }
    let body
    if (entity.body.dynamic) {
      body = physics.createRigidDynamic(transform)
    } else {
      body = physics.createRigidStatic(transform)
    }
    body.attachShape(shape)
    bodies[entity.id] = body
    scene.addActor(body, null)
  })
}

export const update = entities => {
  scene.simulate(1 / 60, true)
  scene.fetchResults(true)
  entities.forEach(entity => {
    const body = bodies[entity.id]
    const transform = body.getGlobalPose()
    entity.transform.position[0] = transform.translation.x
    entity.transform.position[1] = transform.translation.y
    entity.transform.position[2] = transform.translation.z
    entity.transform.rotation[0] = transform.rotation.x
    entity.transform.rotation[1] = transform.rotation.y
    entity.transform.rotation[2] = transform.rotation.z
    entity.transform.rotation[3] = transform.rotation.w
  })
}
