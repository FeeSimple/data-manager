let getScatter = new Promise((resolve, reject) => {
  document.addEventListener('scatterLoaded', scatterExtension => {
    let results
    let scatter = window.scatter
    if (typeof scatter === 'undefined') {
      console.warn('No scatter instance detected')
      resolve(results)
    }

    console.info('Scatter detected.')
    scatter.requireVersion(4.0)

    let network
    switch (process.env.REACT_APP_ENV) {
      case 'dev':{
        console.info('Suggesting dev environment testnet.')        
        network = {
          protocol:'http',
          blockchain:'eos',
          host:process.env.REACT_APP_NODEOS_ADDR,
          port:process.env.REACT_APP_NODEOS_PORT,
          chainId: process.env.REACT_APP_CHAIN_ID,
        }
        console.info('network: ',network)
        break;
      }
      case 'staging':{
        console.info('Suggesting staging environment testnet.')        
        network = {
          protocol:'http',
          blockchain:'eos',
          host:process.env.REACT_APP_NODEOS_ADDR,
          port:process.env.REACT_APP_NODEOS_PORT,
          chainId: process.env.REACT_APP_CHAIN_ID,
        }
        console.info('network: ',network)
        break;      
      }
      default:
        console.error('unknown environment')
        break;
    }    
    network && scatter.suggestNetwork(network)    

    results = {
      scatter,
      network
    }

    resolve(results)
  })
})

export default getScatter
