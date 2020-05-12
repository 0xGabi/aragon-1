import { process } from '@liteflow/compiler'

// eslint-disable-next-line no-template-curly-in-string
const code = text => 'module.export = value => `' + text + ', Transaction hash link is https://rinkeby.etherscan.io/tx/${value.transactionHash}`'

export default async ({ name, appAddress, eventAbi, mesgAddress, eventSignature, instanceHash, data }) => {
  const temp = `
name: ${name}-${mesgAddress}-${eventAbi.name}
steps:
- type: trigger
  instanceHash: ${process.env.ETHEREUM_HASH}
  eventKey: log
- type: filter
  conditions:
    address: '${appAddress.toLowerCase()}'
    eventSignature: '${eventSignature}'
- type: task
  instanceHash: ${process.env.ETHEREUM_HASH}
  taskKey: decodeLog
  inputs:
    eventAbi: ${JSON.stringify(eventAbi)}
    address: {key: address}
    data: {key: data}
    topics: {key: topics}
    logIndex: {key: logIndex}
    transactionHash: {key: transactionHash}
    transactionIndex: {key: transactionIndex}
    blockHash: {key: blockHash}
    blockNumber: {key: blockNumber}
- type: task
  instanceHash: ${process.env.JS_HASH}
  taskKey: execute
  inputs:
    code: ${code(data.text)}
    inputs:
      decodedData: {key: decodedData}
      address: {key: address}
      eventSignature: {key: eventSignature}
      data: {key: data}
      topics: {key: topics}
      logIndex: {key: logIndex}
      transactionHash: {key: transactionHash}
      transactionIndex: {key: transactionIndex}
      blockHash: {key: blockHash}
      blockNumber: {key: blockNumber}
- type: task
  instanceHash: ${instanceHash}
  taskKey: send
  inputs:
    from: 'notification@mesg.com'
    to: ${data.to}
    subject: ${data.subject}
    text: {key: result}
  `.trim()

  const compiler = await process(Buffer.from(temp))
  return compiler
}
