# Milestone #1: backend application connecting Aragon DAOs to a webhook connector

## Architecture

```ascii

+------------+                                +-------------+
|            |                                |             |
| Aragon DAO |                                |   Webhook   |
|            |                                |             |
+-----+------+                                +------+------+
      |                                              ^
      |                                              |
    listen                                        trigger
      |                                              |
      v                                              |
+------------+                                +-------------+
|            |                                |             |
|  Ethereum  |                                |   Webhook   |
|  services  |                                |   service   |
|            |                                |             |
+-----+------+                                +------+------+
      |                                              ^
      |                                              |
      |                                              |
    event                                          call
      |             +------------------+             |
      |             |                  |             |
      +------------>+     Process      +-------------+
                    |                  |
                    +------------------+

```

- The Ethereum service source code is available here: https://github.com/mesg-foundation/service-ethereum-contract.
- The Webhook service source code is available here: https://github.com/mesg-foundation/service-webhook

## Step by step explanation

1. Multiple MESG Ethereum services are running and actively listening for events from specific applications of an Aragon DAO.
2. When an Ethereum event is detected, the service emits it to the MESG Engine.
3. If the event matches a MESG Process, the process get trigger.
4. In this case, the process executes the task `call` of the Webhook service.
5. The Webhook service creates a HTTP request and executes it.

## Demo

Check out the demo video:

[![Demo: Synchronize any Aragon event to a webhook](http://img.youtube.com/vi/Mji0ee1l4z8/0.jpg)](http://www.youtube.com/watch?v=Mji0ee1l4z8 "Demo: Synchronize any Aragon event to a webhook")

Source: https://www.youtube.com/watch?v=Mji0ee1l4z8

## Installation

## MESG Engine

This application requires [MESG Engine](https://github.com/mesg-foundation/engine) to be installed first, [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

## Download source

Download the source code of the application. You can clone this repository by using the following command:

```bash
git clone https://github.com/mesg-foundation/aragon.git
```

## Download latest Aragon Core Apps abi

**Repo of the Aragon Core Apps:** https://github.com/aragon/aragon-apps

Follow the url of the network of your choice to download the corresponding Aragon Core apps deployment archive:
- **Mainnet network:** https://github.com/aragon/deployments/tree/master/environments/mainnet
- **Rinkeby network:** https://github.com/aragon/deployments/tree/master/environments/rinkeby

When the download is completed, extract the archive, copy the `artifact.json` this repo's folder and rename it with the name of the app (for example `voting.json` for the voting app). Reproduce this step for every Aragon Core Apps.

## Environment file

Let's setup the env file to configure the process and service correctly.

- Copy the `.env.example` to `.env.voting` for voting app.
- Open `.env` and update the values
  - `PROVIDER_ENDPOINT` is the HTTP endpoint of a web3 provider. You can put your own node or just use Infura for test. Make sure to use the same network as your Aragon DAO.
  - `CONTRACT_ADDRESS` is the smart contract address of the a specific app of the DAO. Can be found on the DAO website in `SYSTEM` > `Organization` and `INSTALLED ARAGON APPS`.
  - `CONTRACT_ABI` is the full ABI of the smart contract. If you have `jq` installed, just update `ARTIFACT_FILE`, otherwise put the whole ABI.
  - `WEBHOOK_ENDPOINT` is the http endpoint of the webhook. You can use https://webhook.site/ to get a test endpoint.
- Reproduce these steps for every Aragon Core Apps.

## Run it!

The following command will start the required services, start the process and display its logs.

```bash
source .env.voting
mesg-cli process:dev process.yml \
    --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT \
    --env CONTRACT_ADDRESS=$CONTRACT_ADDRESS \
    --env CONTRACT_ABI=$CONTRACT_ABI \
    --env WEBHOOK_ENDPOINT=$WEBHOOK_ENDPOINT
```
Reproduce this step for every Aragon Core Apps.

Stopping this command also stop the process, you'll have to stop manually the services.
