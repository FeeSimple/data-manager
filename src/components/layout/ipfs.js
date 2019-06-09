const IPFS = require('ipfs-api')
const ipfsHost = 'ipfs.feesimple.io'
const ipfsPort = 80
const ipfsProtocol = 'http'
export const ipfs = new IPFS({
  host: ipfsHost,
  port: ipfsPort,
  protocol: ipfsProtocol
})
export const ipfsLink = `${ipfsProtocol}://${ipfsHost}/api/v0/cat?arg=`
