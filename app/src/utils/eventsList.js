export default {
  eventsList: [
    { name: 'Zapier', instanceHash: process.env.ZAPIER_HASH, taskKey: 'execute', inputsFields: [{ name: 'zapName', label: 'Name your zap', type: 'text' }] },
    { name: 'Telegram', instanceHash: process.env.TELEGRAM_HASH, taskKey: 'notify', inputsFields: [{ name: 'sendText', label: 'Message to Notification', type: 'text' }] },
    { name: 'Webhook', instanceHash: process.env.WEBHOOK_HASH, taskKey: 'call', inputsFields: [{ name: 'hookUrl', label: 'Webhook Url', type: 'text' }] }
  ]
}
