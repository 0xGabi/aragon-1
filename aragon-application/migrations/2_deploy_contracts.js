/* global artifacts */
var ProcessApp = artifacts.require('ProcessApp.sol')

module.exports = function(deployer) {
  deployer.deploy(ProcessApp)
}
