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
    // {
    //   name: 'Telegram',
    //   instanceHash: process.env.TELEGRAM_HASH,
    //   taskKey: 'notify',
    //   inputsFields: [
    //     { name: 'botToken', label: 'Telegram bot token', type: 'text', required: true },
    //     { name: 'chatId', label: 'Telegram chat id', type: 'text', required: true },
    //     { name: 'sendText', label: 'Message to Notification', type: 'text', required: true }
    //   ]
    // },
    // {
    //   name: 'Slack',
    //   instanceHash: process.env.SLACK_HASH,
    //   taskKey: 'notify',
    //   inputsFields: [
    //     { name: 'endpoint', label: 'Slack Endpoint', type: 'text', required: true },
    //     { name: 'text', label: 'Message to Notification', type: 'text', required: true },
    //     { name: 'icon_emoji', label: 'Emoji for the bot picture', type: 'text', required: true },
    //     { name: 'username', label: 'Name of the user', type: 'text', required: true }
    //   ]
    // },
    {
      name: 'Webhook',
      instanceHash: process.env.WEBHOOK_HASH,
      taskKey: 'call',
      inputsFields: [{ name: 'hookUrl', label: 'Webhook Url', type: 'text', placeholder: 'https://webhook.site', required: true }]
    }
    // {
    //   name: 'Twilio',
    //   instanceHash: process.env.TWILIO_HASH,
    //   taskKey: 'sms',
    //   inputsFields: [
    //     { name: 'to', label: 'Number to receive the SMS', type: 'text', placeholder: '+66999999999', required: true },
    //     { name: 'body', label: 'Message to send the SMS', type: 'text', required: true }
    //   ]
    // },
    // {
    //   name: 'Email',
    //   instanceHash: process.env.SENDGRID_HASH,
    //   taskKey: 'send',
    //   inputsFields: [
    //     { name: 'from', label: 'From email', type: 'text', placeholder: 'example@mail.com', required: true },
    //     { name: 'to', label: 'to email', type: 'text', placeholder: 'example@mail.com', required: true },
    //     { name: 'subject', label: 'Subject', type: 'text', required: true },
    //     { name: 'text', label: 'The text of the email', type: 'text', required: false },
    //     { name: 'html', label: 'The html content of the email', type: 'text', required: false }
    //   ]
    // }
  ]
}
