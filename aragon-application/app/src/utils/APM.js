import aragonPM from '@aragon/apm'
import Web3 from 'web3'

const provider = 'ws://localhost:8545'

const web3 = new Web3(provider)
const APM = aragonPM(web3, { ensRegistryAddress: '0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1' })

export const getAllVersions = async (appId, appImplementationAddress) => {
  try {
    const versions = await APM.getAllVersions(appId)
    const version = versions.find(x => x.contractAddress.toLowerCase() === appImplementationAddress.toLowerCase())
    if (!version) {
      throw new Error(`cannot find version for ${appImplementationAddress}`)
    }
    return version
  } catch (error) {
    throw new Error(`${error.message}`)
  }
}
