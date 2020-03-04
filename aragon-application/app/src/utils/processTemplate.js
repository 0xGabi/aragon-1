import { process } from '@mesg/compiler'
import { save } from './ipfs-util'

const compiler = async ({ appAddress, name, mesgAddress, url, connectedAccount }, eventAbi, eventSignature) => {
  const template = `
name: ${name}-${mesgAddress}-${eventAbi.name}-${connectedAccount}
steps:
- type: trigger
  instance:
    src: https://github.com/mesg-foundation/service-ethereum
    env:
      - PROVIDER_ENDPOINT=$(env:${process.env.PROVIDER_ENDPOINT})
  eventKey: log
- type: filter
  conditions: 
    address: '${appAddress.toLowerCase()}'
    eventSignature: '${eventSignature}'
- type: task
  instance:
    src: https://github.com/mesg-foundation/service-ethereum
    env:
      - PROVIDER_ENDPOINT=$(env:${process.env.PROVIDER_ENDPOINT})
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
  instance:
    src: https://github.com/mesg-foundation/service-webhook
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

  const compile = await process(Buffer.from(template))

  const hash = await save(JSON.stringify(compile))

  return hash
}

export default compiler
