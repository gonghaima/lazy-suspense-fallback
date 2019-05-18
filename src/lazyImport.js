import { lazy } from 'react'

const lazyImport = (
  filename,
) => (
  lazy(() => (
    // FAKE DELAY
    new Promise(resolve => {
      setTimeout(
        resolve,
        1000,
      )
    })
    .then(() => (
      import(`${filename}`)
    ))
  ))
)

export default lazyImport
