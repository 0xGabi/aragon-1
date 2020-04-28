const Web3 = require('web3')
const web3 = new Web3()

const createAbi = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      name: 'ipfsHash',
      type: 'string'
    },
    {
      indexed: false,
      name: 'organization',
      type: 'address'
    }
  ],
  name: 'MESGProcessCreate',
  type: 'event'
}

console.log(web3.eth.abi.encodeEventSignature(createAbi))
