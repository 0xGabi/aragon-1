# MESG Process

## Installation

### MESG SDK

This service requires [MESG SDK](https://github.com/mesg-foundation/engine) to be installed first.

You can install MESG SDK by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
npm install -g @mesg/cli
```

## Create configuration file

Copy the `.env.example` to `.env`.

This file contains required configurations needed for the application.
You need to replace the `...` by the right value.

## Deploy MESG process on local computer

**To replace: [Process](./process.yml)**

```yml
steps:
  - type: trigger
    instance:
      src: https://github.com/mesg-foundation/service-ethereum
      env:
        - PROVIDER_ENDPOINT=$(env:PROVIDER_ENDPOINT)
    eventKey: log
  - type: filter
    conditions:
      eventSignature: $(env:ENCODE_EVENT_SIGNATURE)
  - type: task
    instance:
      src: https://github.com/mesg-foundation/service-ethereum
      env:
        - PROVIDER_ENDPOINT=$(env:PROVIDER_ENDPOINT)
    taskKey: decodeLog
    inputs:
      eventAbi: { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': 'ipfsHash', 'type': 'string' }], 'name': 'MESGProcessCreate', 'type': 'event' }
      data: { key: data }
      topics: { key: topics }
      address: { key: address }
      logIndex: { key: logIndex }
      transactionHash: { key: transactionHash }
      transactionIndex: { key: transactionIndex }
      blockHash: { key: blockHash }
      blockNumber: { key: blockNumber }
  - type: task
    instance:
      src: https://github.com/mesg-foundation/service-process-deployer
      env:
        - IPFS_ENDPOINT=$(env:IPFS_ENDPOINT)
    taskKey: deploy
    inputs:
      ipfsHash: { key: decodedData.ipfsHash }

```

Command deploy process:

```bash
$ npm install
$ source .env
$ mesg-cli process:dev process.yml --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT --env ENCODE_EVENT_SIGNATURE=$ENCODE_EVENT_SIGNATURE --env IPFS_ENDPOINT=$IPFS_ENDPOINT
```
