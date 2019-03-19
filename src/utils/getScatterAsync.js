import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import { getNetworkData } from './index'
import Eos from 'eosjs'

ScatterJS.plugins(new ScatterEOS())

export default async function getScatterAsync () {
  const network = getNetworkData()
  // Must use "networkScat" for ScatterJS.connect. Otherwise, it won't work
  const networkScat = ScatterJS.Network.fromJson(network)
  try {
    let connected = await ScatterJS.connect('MyAppName', { networkScat })
    if (!connected) {
      return null
    } else {
      await ScatterJS.login()
      const scatter = ScatterJS.scatter
      console.info('getScatterAsync detected:', scatter)
      const eos = ScatterJS.eos(network, Eos)
      console.info('getScatterAsync - eos', eos)
      window.ScatterJS = null
      return { scatter, eos }
    }
  } catch (err) {
    console.log('getScatterAsync - Error:', err)
    return null
  }
}
