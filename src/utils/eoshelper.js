import ecc from 'eosjs-ecc'
import { getResourceStr, beautifyBalance, fetchBalanceNumber } from './beautify'

export const getKeyPair = async () => {
  let promises = [], keys = [], keyPairs = []
  promises.push(ecc.randomKey())

  let priv, pub
  keys = await Promise.all(promises)
  keyPairs = keys.map(k => {
    priv = k
    pub = ecc.privateToPublic(k)
  })

  return {pub, priv}
}

export const getRamPrice = async (eosClient) => {
  try {
    let result = await eosClient.getTableRows(true, 'eosio', 'eosio', 'rammarket')
    
    if (!result || !result.rows[0]) return null
    
    let ramMarketRow = result.rows[0]
    console.log('ramMarketRow:', ramMarketRow)
    let quoteBalance = fetchBalanceNumber(ramMarketRow.quote.balance)
    let baseBalance = fetchBalanceNumber(ramMarketRow.base.balance)
    if (!quoteBalance || !baseBalance) return null
    let ramPrice = quoteBalance / baseBalance
    return ramPrice // XFS/KB
  } catch (err) {
    return null
  }
}

export const calcStakedRam = (ramPrice, ramQuota) => {
  let stakedRam = (ramQuota * ramPrice) / 1024
  if (stakedRam > 1) {  
    stakedRam = Intl.NumberFormat().format(stakedRam).toString() + ' XFS'
  } else {
    stakedRam = stakedRam.toPrecision(1).toString() + ' XFS'
  }
  return stakedRam
}

const remainingPercent = (used, max) => {
  const remaining = max - used
  return new Intl.NumberFormat().format(100 * (remaining / max))
}

export const createNewAccount = async (eosAdmin, accountName, eosAdminAccountName) => {
  const keyPair = await getKeyPair()
  const accountPubKey = keyPair.pub
  const accountPrivKey = keyPair.priv
  try {
    const result = await eosAdmin.transaction(tr => {
      tr.newaccount({
          creator: eosAdminAccountName,
          name: accountName,
          owner: accountPubKey,
          active: accountPubKey
      });
  
      tr.buyrambytes({
          payer: eosAdminAccountName,
          receiver: accountName,
          bytes: 10240
      });
  
      tr.delegatebw({
          from: eosAdminAccountName,
          receiver: accountName,
          stake_net_quantity: '10.0000 XFS',
          stake_cpu_quantity: '10.0000 XFS',
          transfer: 0
      });
    })

    return {accountPubKey, accountPrivKey}
  } catch (err) {
    // Without JSON.parse(), it never works!
    err = JSON.parse(err)
    const errMsg = (err.error.what || "Account creation failed")
    
    return {errMsg}
  }
}

export const manageRam = async (eosAdmin, accountName, eosAdminAccountName, ramAmount) => {
  try {
    const result = await eosAdmin.transaction(tr => {
      tr.buyrambytes({
          payer: eosAdminAccountName,
          receiver: accountName,
          bytes: parseInt(ramAmount)
      });
    })

    return {}
  } catch (err) {
    // Without JSON.parse(), it never works!
    err = JSON.parse(err)
    const errMsg = (err.error.what || "RAM management failed")
    
    return {errMsg}
  }
}

export const checkAccount = async (eosClient, account) => {
  try {
    await eosClient.getAccount(account)
    
    return true

  } catch (err) {

    return false
  }
}

export const getAccountInfo = async (eosClient, account) => {
  try {
    let result = await eosClient.getAccount(account)
    const ramStr = getResourceStr({used: result.ram_usage, max: result.ram_quota})
    const ramMeter = remainingPercent(result.ram_usage, result.ram_quota).toString()

    const bandwidthStr = getResourceStr(result.net_limit)
    const bandwidthMeter = remainingPercent(result.net_limit.used, result.net_limit.max).toString()

    const cpuStr = getResourceStr(result.cpu_limit, true)
    const cpuMeter = remainingPercent(result.cpu_limit.used, result.cpu_limit.max).toString()

    const balance = beautifyBalance(result.core_liquid_balance)

    let created = result.created
    let idx = created.indexOf('T') // cut away the time trailing
    created = created.substring(0, idx != -1 ? idx : created.length);
    
    const pubkey = result.permissions[0].required_auth.keys[0].key

    const stakedCpu = beautifyBalance(result.total_resources.cpu_weight)
    const stakedBandwidth = beautifyBalance(result.total_resources.net_weight)

    let info = {
      account,
      created,
      balance,
      ramStr,
      ramMeter,
      bandwidthStr,
      bandwidthMeter,
      stakedBandwidth,
      cpuStr,
      cpuMeter,
      stakedCpu,
      pubkey
    }

    let ramPrice = await getRamPrice(eosClient)
    let stakedRam = ''
    if (ramPrice) {
      stakedRam = calcStakedRam(ramPrice, result.ram_quota)
    }

    info.stakedRam = stakedRam
    console.log('info: ', info)
    
    return info

  } catch (err) {

    return null
  }
}

export const checkAccountNameError = (accountName) => {
  let errMsg = null
  const accountRegex = /^[a-z1-5]*$/
  if (!accountName) {
    errMsg = 'Required'
  } else if (accountName.length !== 12) {
    errMsg = 'Must be 12 symbols long'
  } else if (!accountRegex.test(accountName)) {
    errMsg = 'Must include symbols a-z 1-5'
  } else {
  }
  return errMsg
}

export const checkRamAmountError = (ramAmount) => {
  let errMsg = null
  const ramRegex = /^[1-9]*$/
  if (!ramAmount) {
    errMsg = 'Required'
  } else if (!ramRegex.test(ramAmount)) {
    errMsg = 'Must be integer'
  } else if (parseInt(ramAmount) <= 10) {
    errMsg = 'Must be above 10'
  }
  return errMsg
}
