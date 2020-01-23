# Aragon listen events

## Installation

### MESG Engine

This service requires [MESG Engine](https://github.com/mesg-foundation/engine) to be installed first.

You can install MESG Engine by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
npm install -g @mesg/cli
```

## Download source

Download the source code of the application. You can clone this repository by using the following command:

```bash
git clone https://github.com/mesg-foundation/application-stripe-to-erc20.git
```

## Download Abi from Aragon

Following the url to download the abi core Aragon app for each network :

**The core Aragon listed apps:** https://github.com/aragon/aragon-apps

**Mainnet network:** https://github.com/aragon/deployments/tree/master/environments/mainnet

**Rinkeby network:** https://github.com/aragon/deployments/tree/master/environments/rinkeby

**Ropsten network:** https://github.com/aragon/deployments/tree/master/environments/ropsten

When download is completed. Extract the download files an copy the `artifact.json` to the application root folder or your create folder.You can rename the `artifact.json`by the name of you want. Example, the download files name is `finance.aragonpm.eth@2.1.6.tar.gz` then the `artifact.json` file can rename like `finance-abi.json`.

## Network of Aragon

**Mainnet:** https://mainnet.aragon.org/#/

**Rinkeby:** https://rinkeby.aragon.org/#/testnest/

## Create configuration file

Copy the `.env.example` to `.env`.

This file contains required configurations needed for the application.
You need to replace by the right value.

For `PROVIDER_ENDPOINT`:

**Mainnet network:** `PROVIDER_ENDPOINT=https://mainnet.infura.io/v3/<PROJECT_ID/>`

**Ropsten network:** `PROVIDER_ENDPOINT=https://ropsten.infura.io/v3/<PROJECT_ID/>`

**Rinkeby network:** `PROVIDER_ENDPOINT=https://rinkeby.infura.io/v3/PROJECT_ID`

For `CONTRACT_ADDRESS`:

Can find on the network website in `SYSTEM` > `Organization`

## Replace application.yml

You need to replace webhook url at `'__YOUR_WEBHOOK_URL_HERE__'` by your webhook url or [webhook website](https://webhook.site/)

```yml
  ...
  - type: task
    instance:
      src: https://github.com/mesg-foundation/service-webhook
    taskKey: call
    inputs:
      url: '__YOUR_WEBHOOK_URL_HERE__'
      data:
        name: { key: name }
        blockHash: { key: blockHash }
        blockNumber: { key: blockNumber }
        transactionHash: { key: transactionHash }
        transactionIndex: { key: transactionIndex }
        data: { key: data }
  ...
```

## Deploy MESG process

```bash
mesg-cli mesg-cli process:dev process.yml \
    --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT \
    --env CONTRACT_ADDRESS=$CONTRACT_ADDRESS \
    --env CONTRACT_ABI=$CONTRACT_ABI
```
