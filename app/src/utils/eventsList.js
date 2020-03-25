export default {
  eventsList: [
    { name: 'Zapier', instanceHash: '', taskKey: 'execute', inputsFields: [] },
    { name: 'Twitter', instanceHash: '', taskKey: 'tweet', inputsFields: [] },
    { name: 'Webhook', instanceHash: process.env.WEBHOOK_HASH, taskKey: 'call', inputsFields: [{ name: 'hookUrl', label: 'Webhook Url', type: 'text' }] }
  ]
}
