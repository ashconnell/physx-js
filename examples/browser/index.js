// Setup

const PhysX = PHYSX()

let resolve
const promise = new Promise((res) => {
  resolve = res
})

PhysX.ready = () => promise
PhysX.onRuntimeInitialized = () => {
  PhysX.loaded = true
  resolve()
}

window.PhysX = PhysX

// Usage

PhysX.ready().then(function () {
  console.log('PhysX ready!')
  const filterData = new PhysX.PxFilterData(0, 0, 0, 0)
  // ....
})
