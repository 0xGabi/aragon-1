const Web3 = require('web3')
const web3 = new Web3()

const createAbi = {
  anonymous: false,
  inputs: [
    { indexed: false, name: 'appAddress', type: 'address' },
    { indexed: false, name: 'appImplementationAddress', type: 'address' },
    { indexed: false, name: 'ipfsHash', type: 'string' },
    { indexed: false, name: 'eventName', type: 'string' },
    { indexed: false, name: 'url', type: 'string' }
  ],
  name: 'Created',
  type: 'event'
}

console.log(web3.eth.abi.encodeEventSignature(createAbi))
