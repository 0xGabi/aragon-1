let token
let voting
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

module.exports = {
  // Called before a dao is deployed.
  preDao: async ({ log }, { web3, artifacts }) => {},

  // Called after a dao is deployed.
  postDao: async ({ dao, _experimentalAppInstaller, log }, bre) => {
    const bigExp = (x, y) => bre.web3.utils.toBN(x).mul(bre.web3.utils.toBN(10).pow(bre.web3.utils.toBN(y)))
    pct16 = x => bigExp(x, 16)
    accounts = await bre.web3.eth.getAccounts()

    // Deploy a minime token an generate tokens to root account
    const minime = await _deployMinimeToken(bre)
    await minime.generateTokens(accounts[0], pct16(100))
    log(`> Minime token deployed: ${minime.address}`)

    token = await _experimentalAppInstaller('token-manager', { skipInitialize: true })
    log(`> Agent app installed: ${token.address}`)

    await minime.changeController(token.address)
    log(`> Change minime controller to token app`)
    await token.initialize([minime.address, true, 0])
    log(`> token app installed: ${token.address}`)

    voting = await _experimentalAppInstaller('voting', { initializeArgs: [token.address, '600000000000000000', '250000000000000000', '604800'] })
    log(`> voting app installed: ${token.address}`)
  },

  // Called after the app's proxy is created, but before it's initialized.
  preInit: async ({ proxy, _experimentalAppInstaller, log }, { web3, artifacts }) => {},

  // Called after the app's proxy is initialized.
  postInit: async ({ proxy, _experimentalAppInstaller, log }, { web3, artifacts }) => {
    console.log(proxy)
    await token.createPermission('MINT_ROLE', proxy.address)
    log(`> MINT_ROLE assigned to ${proxy.address}`)
    await voting.createPermission('CREATE_VOTES_ROLE', proxy.address)
    log(`> CREATE_VOTES_ROLE assigned to ${proxy.address}`)
  },

  // Called when the start task needs to know the app proxy's init parameters.
  // Must return an array with the proxy's init parameters.
  getInitParams: async ({ log }, { web3, artifacts }) => {},

  // Called after the app's proxy is updated with a new implementation.
  postUpdate: async ({ proxy, log }, { web3, artifacts }) => {}
}

async function _deployMinimeToken(bre) {
  const MiniMeTokenFactory = await bre.artifacts.require('MiniMeTokenFactory')
  const MiniMeToken = await bre.artifacts.require('MiniMeToken')
  const factory = await MiniMeTokenFactory.new()
  const token = await MiniMeToken.new(factory.address, ZERO_ADDRESS, 0, 'MyToken', 18, 'TKN', true)
  return token
}