export default {
  eventsList: [
    { name: 'Zapier', instanceHash: '', taskKey: 'execute', inputsFields: [] },
    { name: 'Telegram', instanceHash: process.env.TELEGRAM_HASH, taskKey: 'notify', inputsFields: [{ name: 'sendText', label: 'Message to Notification', type: 'text' }] },
    { name: 'Webhook', instanceHash: process.env.WEBHOOK_HASH, taskKey: 'call', inputsFields: [{ name: 'hookUrl', label: 'Webhook Url', type: 'text' }] }
  ]
}
