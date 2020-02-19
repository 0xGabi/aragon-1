const base58 = require('@mesg/api/lib/util/base58')

const api = require('./API')

module.exports = async ({ processHash }) => {
  try {
    await api.process.delete({ hash: base58.decode(processHash) })
  } catch (error) {
    throw Error(error)
  }
}
