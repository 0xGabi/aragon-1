import { process } from '@liteflow/compiler'

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
  instanceHash: ${instanceHash}
  taskKey: tweet
  inputs:
    tweetText: ${data.tweetText}
  `
  const compiler = await process(Buffer.from(temp))
  return compiler
}
