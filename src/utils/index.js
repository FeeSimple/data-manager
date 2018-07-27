export const idFromPath = (pathname) => {
  const result = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  return result === '' ? '-1' : result
}

export const getAccountFrom = async (scatter, network) => {
  if(!scatter){
    console.error('No scatter available.')
    throw new Error(500)
  }

  if(!scatter.identity || !scatter.identity.accounts[0]){
    console.info('No identity available. Requesting...')
    await scatter.getIdentity({ accounts: [network] })
  }

  return scatter
    .identity
    .accounts
    .find(account => account.blockchain === 'eos')
}