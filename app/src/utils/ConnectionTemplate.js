import { save } from './ipfs-util'

// Template
import webhook from './template/webhook'
import telegram from './template/telegram'
import zapier from './template/zapier'
import twitter from './template/twitter'
import slack from './template/slack'
import twilio from './template/twilio'
import email from './template/email'

const url = process.env.IPFS_GATEWAY_ENDPOINT

export default async (temp, data) => {
  switch (temp) {
    case 'Webhook':
      try {
        const compiler = await webhook(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Telegram':
      try {
        const compiler = await telegram(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Zapier':
      try {
        const compiler = await zapier(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Twitter':
      try {
        const compiler = await twitter(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Slack':
      try {
        const compiler = await slack(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Twilio':
      try {
        const compiler = await twilio(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    case 'Email':
      try {
        const compiler = await email(data)
        const hash = await save(JSON.stringify(compiler))
        return `${url}/${hash}`
      } catch (error) {
        throw new Error(error)
      }
    default:
      break
  }
}
