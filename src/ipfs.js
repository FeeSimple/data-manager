
import * as IPFS from 'ipfs-api'
const ipfs = new IPFS({ host: process.env.REACT_APP_IPFS_ADDR, port: process.env.REACT_APP_IPFS_PORT, protocol: 'http' });

export default ipfs