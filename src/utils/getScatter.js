let getScatter = new Promise((resolve, reject) => {    
  document.addEventListener('scatterLoaded', scatterExtension => {    
    let results
    let scatter = window.scatter
    if (typeof scatter !== 'undefined') {
      console.info('Scatter detected.');
      scatter.requireVersion(4.0);      

      results = {        
        scatter
      }

      resolve(results)
    } else {
      console.warn('No scatter instance detected');
      resolve(results)
    }
  })
})

export default getScatter
