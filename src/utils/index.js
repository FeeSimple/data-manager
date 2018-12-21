export const getNetworkData = () => {
  return {
    protocol: 'https',
    blockchain: 'eos',
    host: 'feesimpletracker.io',
    port: '8878',
    chainId: '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32'
  }
}

export const idFromPath = (pathname) => {
  const result = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  return result === '' ? '-1' : result
}

export const getImportedKeyEos = (Eos, privKey) => {
  const network = getNetworkData()
  return Eos({
    httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
    chainId: network.chainId,
    keyProvider: privKey
  })
}

export const eosAdminAccount = {
	name: process.env.REACT_APP_ADMIN_ACCOUNT_NAME,
	pubKey: process.env.REACT_APP_ADMIN_ACCOUNT_PUB,
	privKey: process.env.REACT_APP_ADMIN_ACCOUNT_PRIV
}

export const getEosAdmin= (Eos) => {
  const network = getNetworkData()
  return Eos({
    httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
    chainId: network.chainId,
    keyProvider: process.env.REACT_APP_ADMIN_ACCOUNT_PRIV
  })
}

export const getFallbackEos = (Eos) => {
  const network = getNetworkData()
  return Eos({
    httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
    chainId: network.chainId
  })
}

export const getAccountFrom = async (scatter, network) => {
  if (!scatter) {
    console.error('No scatter available.')
    throw new Error(500)
  }

  if (!scatter.identity || !scatter.identity.accounts[0]) {
    console.info('No identity available. Requesting...')
    await scatter.getIdentity({ accounts: [network] })
  }

  return scatter
    .identity
    .accounts
    .find(account => account.blockchain === 'eos')
}

export const fakeData = {
  0: {
    name: 'St Paul',
    address_1: 'Lehigh Street, 145',
    address_2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code: '58016',
    unit_count: 1
  },
  1: {
    name: 'Lincoln Building',
    address_1: 'Herriman St, 545',
    address_2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code: '58086',
    unit_count: 7
  },
  2: {
    name: 'John Ferry',
    address_1: 'Sandpoint Avenue, 3332',
    address_2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code: '58543',
    unit_count: 4
  },
  3: {
    name: 'St Paul',
    address_1: 'Lehigh Street, 145',
    address_2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code: '58016',
    unit_count: 1
  },
  4: {
    name: 'Lincoln Building',
    address_1: 'Herriman St, 545',
    address_2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code: '58086',
    unit_count: 7
  },
  5: {
    name: 'John Ferry',
    address_1: 'Sandpoint Avenue, 3332',
    address_2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code: '58543',
    unit_count: 4
  }
}
