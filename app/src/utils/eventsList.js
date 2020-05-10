export default {
  eventsList: [
    // {
    //   name: 'Zapier',
    //   instanceHash: process.env.ZAPIER_HASH,
    //   taskKey: 'execute',
    //   inputsFields: [
    //     { name: 'email', label: 'Email from Zapier MESG Application', type: 'text', placeholder: 'example@mail.com', required: true },
    //     { name: 'zapName', label: 'Name your zap', type: 'text', placeholder: 'ZAP NAME', required: true }
    //   ]
    // },
    // {
    //   name: 'Twitter',
    //   instanceHash: process.env.TWITTER_HASH,
    //   taskKey: 'tweet',
    //   inputsFields: [{ name: 'tweetText', label: 'Text', type: 'text', required: true }]
    // },
    {
      name: 'Telegram',
      label: 'Send a message on Telegram',
      instanceHash: process.env.TELEGRAM_HASH,
      taskKey: 'notify',
      inputsFields: [
        { name: 'botToken', label: 'bot token', type: 'text', required: true },
        { name: 'chatId', label: 'chat id', type: 'text', required: true },
        { name: 'sendText', label: 'message', type: 'text', required: true }
      ]
    },
    {
      name: 'Slack',
      label: 'Send a message on Slack',
      instanceHash: process.env.SLACK_HASH,
      taskKey: 'notify',
      inputsFields: [
        { name: 'endpoint', label: 'Slack Endpoint', type: 'text', required: true },
        { name: 'username', label: 'Bot name', type: 'text', required: true },
        { name: 'icon_emoji', label: 'Bot picture', type: 'text', required: true },
        { name: 'text', label: 'Message', type: 'text', required: true }
      ]
    },
    {
      name: 'Webhook',
      label: 'Post to URL',
      instanceHash: process.env.WEBHOOK_HASH,
      taskKey: 'call',
      description: { text: 'A POST request will be sent to this URL with the content of the event ', link: 'https://pastebin.com/whxdT0JE' },
      inputsFields: [
        {
          name: 'hookUrl',
          label: 'url',
          type: 'text',
          placeholder: 'https://webhook.site',
          required: true
        }
      ]
    },
    // {
    //   name: 'Twilio',
    //   instanceHash: process.env.TWILIO_HASH,
    //   taskKey: 'sms',
    //   inputsFields: [
    //     { name: 'to', label: 'Number to receive the SMS', type: 'text', placeholder: '+66999999999', required: true },
    //     { name: 'body', label: 'Message to send the SMS', type: 'text', required: true }
    //   ]
    // },
    {
      name: 'Email',
      label: 'Send an email',
      instanceHash: process.env.SENDGRID_HASH,
      taskKey: 'send',
      inputsFields: [
        { name: 'to', label: 'EMAIL', type: 'text', placeholder: 'example@mail.com', required: true },
        { name: 'subject', label: 'Subject', type: 'text', required: true },
        { name: 'text', label: 'CONTENT', type: 'text', required: false }
      ]
    }
  ]
}
