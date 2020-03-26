export default ({ appAddress, name, mesgAddress }, eventAbi, eventSignature) => {
  return `
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
      data: {key: data}
      topics: {key: topics}
      logIndex: {key: logIndex}
      transactionHash: {key: transactionHash}
      transactionIndex: {key: transactionIndex}
      blockHash: {key: blockHash}
      blockNumber: {key: blockNumber}
  `
}
