const { usePlugin } = require('@nomiclabs/buidler/config')
const hooks = require('./scripts/buidler-hooks')

usePlugin('@aragon/buidler-aragon')

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545'
    }
  },
  solc: {
    version: '0.4.24',
    optimizer: {
      enabled: true,
      runs: 10000
    }
  },
  etherscan: {
    apiKey: '' // API Key for smart contract verification. Get yours at https://etherscan.io/apis
  },
  aragon: {
    appServePort: 8001,
    clientServePort: 9000,
    appSrcPath: 'app/',
    appBuildOutputPath: 'dist/',
    appName: 'liteflow',
    hooks // Path to script hooks
  }
}
