import DefaultTemp from './defaultTemp'

export default ({ name, appAddress, eventAbi, mesgAddress, eventSignature, instanceHash, data }) => {
  const temp = DefaultTemp({ appAddress, name, mesgAddress }, eventAbi, eventSignature)
  return `${temp}- type: task
    instanceHash: ${instanceHash}
    taskKey: call
    inputs:
      url: ${data.hookUrl}
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
}
