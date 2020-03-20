import Web3 from 'web3'

const provider = 'ws://localhost:8545' // process.env.PROVIDER_ENDPOINT

// if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
//   provider = window['ethereum'] || window.web3.currentProvider
//   console.log('Web3 browser user detected')
// }

export const web3 = new Web3(provider)

export const encodeEventSignature = async eventAbi => {
  const encodeEvent = await web3.eth.abi.encodeEventSignature(eventAbi)
  return encodeEvent
}
