export const makeEntities = () => {
  let ids = 0
  const entities = []

  entities.push({
    id: ++ids,
    transform: {
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
    },
    model: {
      type: 'box',
      size: [10, 0.1, 10],
    },
    body: {
      type: 'box',
      size: [10, 0.1, 10],
      dynamic: false,
    },
  })

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      entities.push({
        id: ++ids,
        transform: {
          position: [
            -2.5 + i + 0.1 * i,
            Math.floor(Math.random() * 6) + 1,
            -2.5 + j + 0.1 * j,
          ],
          rotation: [0, 0, 0.3, 0.7],
        },
        model: {
          type: 'box',
          size: [1, 1, 1],
        },
        body: {
          type: 'box',
          size: [1, 1, 1],
          dynamic: true,
        },
      })
    }
  }

  return entities
}
