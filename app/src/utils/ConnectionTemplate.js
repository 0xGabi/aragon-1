import { save } from './ipfs-util'

// Template
import webhook from './template/webhook'
import telegram from './template/telegram'
import zapier from './template/zapier'

export default async (temp, data) => {
  switch (temp) {
    case 'Webhook':
      try {
        const compiler = await webhook(data)
        const hash = await save(JSON.stringify(compiler))
        return hash
      } catch (error) {
        throw new Error(error)
      }
    case 'Telegram':
      try {
        const compiler = await telegram(data)
        const hash = await save(JSON.stringify(compiler))
        return hash
      } catch (error) {
        throw new Error(error)
      }
    case 'Zapier':
      try {
        const compiler = await zapier(data)
        const hash = await save(JSON.stringify(compiler))
        return hash
      } catch (error) {
        throw new Error(error)
      }
    default:
      break
  }
}
