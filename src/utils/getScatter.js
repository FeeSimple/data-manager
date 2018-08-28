let getScatter = new Promise((resolve, reject) => {
  document.addEventListener('scatterLoaded', scatterExtension => {
    let results
    let scatter = window.scatter
    if (typeof scatter === 'undefined') {
      console.warn('No scatter instance detected')
      resolve(results)
    }
    window.scatter = null

    console.info('Scatter detected.')
    scatter.requireVersion(4.0)

    let network
    switch ('staging') {
      case 'dev': {
        console.info('Suggesting dev environment testnet.')
        network = {
          protocol: 'https',
          blockchain: 'eos',
          host: 'feesimpletracker.io',
          port: '8878',
          chainId: '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32'
        }
        console.info('network: ', network)
        break
      }
      case 'staging': {
        console.info('Suggesting staging environment testnet.')
        network = {
          protocol: 'https',
          blockchain: 'eos',
          host: 'feesimpletracker.io',
          port: '8878',
          chainId: '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32'
        }
        console.info('network: ', network)
        break
      }
      default:
        console.error('unknown environment')
        break
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
