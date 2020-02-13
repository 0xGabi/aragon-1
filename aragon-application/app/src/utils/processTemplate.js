const process = ({ appAddress, index, url }, eventAbi, eventSignature, endpoint) => {
  return {
    name: `${appAddress}/${index}`,
    steps: [
      {
        type: 'trigger',
        instance: {
          src: 'https://github.com/mesg-foundation/service-ethereum',
          env: [`PROVIDER_ENDPOINT=${endpoint}`, `BLOCK_CONFIRMATIONS=0`]
        },
        eventKey: 'log'
      },
      {
        type: 'filter',
        conditions: {
          address: appAddress.toLowerCase(),
          eventSignature: eventSignature
        }
      },
      {
        type: 'task',
        instance: {
          src: 'https://github.com/mesg-foundation/service-ethereum',
          env: [`PROVIDER_ENDPOINT=${endpoint}`, `BLOCK_CONFIRMATIONS=0`]
        },
        taskKey: 'decodeLog',
        inputs: {
          eventAbi: eventAbi,
          address: { key: 'address' },
          data: { key: 'data' },
          topics: { key: 'topics' },
          logIndex: { key: 'logIndex' },
          transactionHash: { key: 'transactionHash' },
          transactionIndex: { key: 'transactionIndex' },
          blockHash: { key: 'blockHash' },
          blockNumber: { key: 'blockNumber' }
        }
      },
      {
        type: 'task',
        instance: {
          src: 'https://github.com/mesg-foundation/service-webhook'
        },
        taskKey: 'call',
        inputs: {
          url: url,
          data: {
            decodedData: { key: 'decodedData' },
            address: { key: 'address' },
            eventSignature: { key: 'eventSignature' },
            data: { key: 'data' },
            topics: { key: 'topics' },
            logIndex: { key: 'logIndex' },
            transactionHash: { key: 'transactionHash' },
            transactionIndex: { key: 'transactionIndex' },
            blockHash: { key: 'blockHash' },
            blockNumber: { key: 'blockNumber' }
          }
        }
      }
    ]
  }
}

export default process
