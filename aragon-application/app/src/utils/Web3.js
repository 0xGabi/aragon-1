import Web3 from 'web3'

const provider = 'ws://localhost:8545'

export const web3 = new Web3(provider)

export const encodeEventSignature = async eventAbi => {
  const encodeEvent = await web3.eth.abi.encodeEventSignature(eventAbi)
  return encodeEvent
}
