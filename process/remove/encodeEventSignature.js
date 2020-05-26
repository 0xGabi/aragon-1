const Web3 = require('web3')
const web3 = new Web3()

const deleteAbi = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      name: 'processUrl',
      type: 'string'
    },
    {
      indexed: false,
      name: 'projectName',
      type: 'address'
    }
  ],
  name: 'MESGProcessDelete',
  type: 'event'
}

console.log(web3.eth.abi.encodeEventSignature(deleteAbi))
