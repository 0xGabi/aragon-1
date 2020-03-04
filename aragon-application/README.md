# Aragon MESG Application

## Aragon MESG Application on your local computer.

1. You need to start [Mesg process](../mesg-process/README.md) before running an application.

2. You can start the MESG dApp on a local Ethereum devchain by following:

**Download source:**

```sh
$ git clone https://github.com/mesg-foundation/aragon.git
$ cd aragon/aragon-application
$ npm install
```

**_Before start application check and replace:_**

[Process Template](app/src/utils/processTemplate.js) File:

```js
const template = `
name: ${name}-${mesgAddress}-${eventAbi.name}-${connectedAccount}
steps:
- type: trigger
  instance:
    src: https://github.com/mesg-foundation/service-ethereum
    env:
      - PROVIDER_ENDPOINT=https://rinkeby.infura.io/v3/<PROJECT_ID>
  eventKey: log
- type: filter
  conditions: 
    address: '${appAddress.toLowerCase()}'
    eventSignature: '${eventSignature}'
- type: task
  instance:
    src: https://github.com/mesg-foundation/service-ethereum
    env:
      - PROVIDER_ENDPOINT=https://rinkeby.infura.io/v3/<PROJECT_ID>
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
```

[IPFS](app/src/utils/ipfs-util.js) File:

```js
export const ipfs = ipfsAPI('<REPLCE IPFS ENDPOINT>')
```

**Start application**

```sh
$ npm start
```

**_or_**

```sh
npm start:ipfs:template
```

## Installing the MESG dApp on a Rinkeby DAO

This MESG Aragon app is published in the AragonPM package manager on Rinkeby, so it can be
installed to any Aragon DAO on that network. In order to deploy this app on an existing DAO,
you can do the following:

We use the `MESG service ethereum` and `MESG service webhook` to create the process in the [file](app/src/utils/processTemplate.js)

```sh
$ npx dao install <dao-name>.aragonid.eth mesg.open.aragonpm.eth --environment aragon:rinkeby
# -> Depending on your DAO permissions, a voting may have been issued. The voting must pass in order to continue.
$ npx dao apps --all <dao-name>.aragonid.eth --environment aragon:rinkeby
# -> You should see a list of apps, and the <mesg-addr> listed under permissionless apps.
$ npx dao acl create <dao-name>.aragonid.eth <mesg-addr> PUBLISH_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
$ npx dao acl create <dao-name>.aragonid.eth <mesg-addr> DESACTIVATE_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
# -> You may vote all this permission changes
```