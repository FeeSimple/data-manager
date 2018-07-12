import eosjs from 'eosjs2'

const rpc = new eosjs.Rpc.JsonRpc('http://138.197.194.220:8877');
const signatureProvider = new eosjs.SignatureProvider(['5JxDmFneCLdS2LKqBacTpHdFRvaBXQs9m956R3ovCohXCdFvPma']);

export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.eos = new eosjs.Api({ rpc, signatureProvider })
  }

  getTableRows = table => {
    return rpc.get_table_rows({json: true, code: this.contractSender, scope: this.contractName, table});
  };

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
    });
  };
}