const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: '138.197.194.220', port: 5001, protocol: 'http' });

export default ipfs;
