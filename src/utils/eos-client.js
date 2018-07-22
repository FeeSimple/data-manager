import eosjs from 'eosjs2'

const nodeosAddr = process.env.REACT_APP_NODEOS_ADDR+':'+process.env.REACT_APP_NODEOS_PORT
console.info('PORT',process.env.REACT_APP_PORT)
const rpc = new eosjs.Rpc.JsonRpc(nodeosAddr)
const signatureProvider = new eosjs.SignatureProvider(['5KdUmNF1T6aNhzohopYNFL5p2JQq9op6TwXXtB6pvkwWSkyB53w'])

export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName
    this.contractSender = contractSender

    this.eos = new eosjs.Api({ rpc, signatureProvider })
  }

  getTableRows = table => {
    return rpc.get_table_rows({json: true, code: this.contractSender, scope: this.contractName, table})
  }

  transaction = (action, data) => {
    return this.eos.pushTransaction({
      blocksBehind: 3,
      expireSeconds: 30,
      actions: [
        {
          account: this.contractName,
          name: action,
          authorization: [
            {
              actor: this.contractSender,
              permission: 'active'
            }
          ],
          data: {
            ...data
          }
        }
      ]
    })
  }
}