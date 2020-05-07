import aragonPM from '@aragon/apm'
import { web3 } from './Web3'

const APM = aragonPM(web3, { ensRegistryAddress: '0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1' })

async function getAllVersion(appId, appImplementationAddress) {
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

export const getEventAbi = (appId, appImplementationAddress) =>
  getAllVersion(appId, appImplementationAddress)
    .then(response => response.abi.filter(abi => abi.type === 'event'))
    .catch(error => {
      throw new Error(`${error.message}`)
    })
