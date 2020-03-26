import { process } from '@mesg/compiler'
import { save } from './ipfs-util'

// Template
import webhook from './template/webhook'

const compileAndSave = async temp => {
  const compile = await process(Buffer.from(temp))
  const ipfsHash = await save(JSON.stringify(compile))
  return ipfsHash
}

export default async (temp, data) => {
  switch (temp) {
    case 'Webhook':
      try {
        const temp = await webhook(data)
        const hash = await compileAndSave(temp)
        return hash
      } catch (error) {
        throw new Error(error)
      }
    case 'Telegram':
      try {
        const temp = await webhook(data)
        const hash = await compileAndSave(temp)
        return hash
      } catch (error) {
        throw new Error(error)
      }
    default:
      break
  }
}
