import { process } from '@mesg/compiler'

const compiler = async ({ appAddress, index, url }, eventAbi, eventSignature) => {
  const ethereumHash = 'E3SsgC82X9qT7raRYZffxvSLgQNZNeuJwGdrz9X5Cinu'
  const webhookHash = 'Aef2BbWiGTLwkWREvYw6pcwqWvBdXuyWL8pfm8J66Bs6'
  const template = `
name: ${appAddress}/${index}
steps:
- type: trigger
  instanceHash: ${ethereumHash}
  eventKey: log
- type: filter
  conditions: 
    address: '${appAddress}'
    eventSignature: '${eventSignature}'
- type: task
  instanceHash: ${ethereumHash}
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
  instanceHash: ${webhookHash}
  taskKey: call
  inputs:
    url: ${url}
    data:
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

  `
  return process(Buffer.from(template))
}

export default compiler
