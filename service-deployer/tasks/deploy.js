const fetch = require('node-fetch')

const base58 = require('@mesg/api/lib/util/base58')

const api = require('./API')

module.exports = async ({ ipfsHash }) => {
  try {
    const res = await fetch(`${process.env.IPFS_ENDPOINT}/${ipfsHash}`)
    const textProcess = await res.text()
    const definition = JSON.parse(textProcess, function(key, value) {
      return key && key.match(/hash$/i) && value && typeof value === 'string' ? base58.decode(value) : value
    })
    const created = await api.process.create(definition)
    if (!created.hash) {
      throw new Error('invalid response')
    }

    return {
      processHash: base58.encode(created.hash)
    }
  } catch (error) {
    throw Error(error.message)
  }
}
