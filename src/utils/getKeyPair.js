import ecc from 'eosjs-ecc'

let getKeyPair = async () => {
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

export default getKeyPair