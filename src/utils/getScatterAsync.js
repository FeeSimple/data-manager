import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import { getNetworkData } from './index'
import Eos from 'eosjs'

ScatterJS.plugins( new ScatterEOS() )

export default async function getScatterAsync() {
  const network = getNetworkData()
  const networkScat = ScatterJS.Network.fromJson(network)
  try {
    let connected = await ScatterJS.connect('MyAppName', {networkScat})
    if(!connected) {
      return null
    } else {
      await ScatterJS.login();
      const scatter = ScatterJS.scatter
      console.info('getScatterAsync detected:', scatter)
      const eos = ScatterJS.eos(network, Eos)
      console.info('getScatterAsync - eos', eos)

      let id = await ScatterJS.login()
      // if(!id) return console.error('no identity');
      const account = ScatterJS.account('eos');
      const options = {authorization:[`${account.name}@${account.authority}`]};
      // let res = await eos.transfer(account.name, 'safetransfer', '0.0001 XFS', account.name, options)
      // console.log('sent: ', res);

      window.ScatterJS = null 
      return {scatter, eos}
    }
  } catch (err) {
    console.log('getScatterAsync - Error:', err)
    return null
  }
}
