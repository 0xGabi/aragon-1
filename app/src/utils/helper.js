export const IsValidJSONString = str => {
  try {
    JSON.parse(str)
  } catch (error) {
    return false
  }
  return true
}

export const emailTemp = (appName, { name, text, serviceLabel, abiName }) => {
  const html =
    'module.export = value => `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto&display=swap" rel="stylesheet"><title>Document</title><style media="screen">body {font-family: "Open Sans", sans-serif;height: 100%; margin: 0; padding: 0;}</style></head><body><div style="min-width: 350px;max-width: 350px;min-height: 420px;border: 1.5px solid;border-radius: 15px;padding: 20px 20px 10px 25px;"><h2>Email Notification</h2><div>' +
    text +
    '</div><div style="margin: 20px 0;height: 2px;background: rgba(0,0,0,.1);"></div><h3>Information</h3><div style="max-width: 100%;"><div style=" margin: 15px 0;"><span><strong>From: </strong>' +
    appName +
    '</span></div><div style=" margin: 15px 0;"><span><strong>Application: </strong>' +
    name +
    '</span></div><div style=" margin: 15px 0;"><span><strong>Event: </strong>' +
    abiName +
    '</span></div><div style=" margin: 15px 0;"><span><strong>Task: </strong>' +
    serviceLabel +
    '</span></div><div style=" margin: 15px 0;"><a href="https://rinkeby.etherscan.io/tx/${value.transactionHash}" target="_blank">Transaction hash link</a></div></div><div style="margin-top: 5rem;"><footer style="margin:10px 0;color: rgba(0,0,0,.5);font-size: .8em;text-align: center;">COPYRIGHT © MESG, All rights Reserved</footer></div</div></body</html>`'
  return html.toString().trim()
}
