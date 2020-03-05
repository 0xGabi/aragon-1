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

## Deploy MESG process

```sh
$ npm install
$ source .env
$ mesg-cli process:dev process.yml --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT --env ENCODE_EVENT_SIGNATURE=$ENCODE_EVENT_SIGNATURE --env IPFS_GATEWAY_ENDPOINT=$IPFS_GATEWAY_ENDPOINT
```
