import Web3 from 'web3'

let provider = 'https://rinkeby.infura.io/v3/1aeb73da68804152b224a285ef96ce02'

if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
  provider = window['ethereum'] || window.web3.currentProvider
  console.log('Web3 browser user detected')
}

export const web3 = new Web3(provider)

export const encodeEventSignature = async eventAbi => {
  const encodeEvent = await web3.eth.abi.encodeEventSignature(eventAbi)
  return encodeEvent
}
