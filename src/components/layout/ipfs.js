const IPFS = require('ipfs-api')
const ipfsHost = 'ipfs.feesimple.io'
const ipfsPort = 443
const ipfsProtocol = 'https'
export const ipfs = new IPFS({
  host: ipfsHost,
  port: ipfsPort,
  protocol: ipfsProtocol
})
export const ipfsLink = `${ipfsProtocol}://${ipfsHost}/api/v0/cat?arg=`
