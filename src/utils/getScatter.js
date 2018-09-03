let getScatter = new Promise((resolve, reject) => {
  document.addEventListener('scatterLoaded', scatterExtension => {
    let scatter = window.scatter
    window.scatter = null
    if (typeof scatter === 'undefined') {
      console.warn('No scatter instance detected')
      resolve(undefined)
    }
    scatter.requireVersion(4.0)
    console.info('Scatter detected.')

    resolve({ scatter })
  })
})

export default getScatter
