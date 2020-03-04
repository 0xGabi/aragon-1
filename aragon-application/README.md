# Aragon MESG Application

## Aragon MESG Application on your local computer.

1. You need to start Mesg process

```sh
$ mesg-cli process:dev ../mesg-process/process.yml --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT --env ENCODE_EVENT_SIGNATURE=$ENCODE_EVENT_SIGNATURE --env IPFS_ENDPOINT=$IPFS_ENDPOINT
```

2. You can start the MESG dApp on a local Ethereum devchain by following:

### Download source

```sh
$ git clone https://github.com/mesg-foundation/aragon.git
$ cd aragon/aragon-application
```

### Create configuration file

Copy the `.env.example` to `.env` in folder `app`

This file contains required configurations needed for the application.
You need to replace the `...` by the right value.

```sh
$ npm install
$ npm start or npm start:ipfs:template
```

## Installing the MESG dApp on a Rinkeby DAO

This MESG Aragon app is published in the AragonPM package manager on Rinkeby, so it can be
installed to any Aragon DAO on that network. In order to deploy this app on an existing DAO,
you can do the following:

### Install Aragon cli

```sh
npm install -g @aragon/cli
```

### Installed application

```sh
$ npx dao install <dao-name>.aragonid.eth mesg.open.aragonpm.eth --environment aragon:rinkeby
# -> Depending on your DAO permissions, a voting may have been issued. The voting must pass in order to continue.
$ npx dao apps --all <dao-name>.aragonid.eth --environment aragon:rinkeby
# -> You should see a list of apps, and the <mesg-addr> listed under permissionless apps.
$ npx dao acl create <dao-name>.aragonid.eth <mesg-addr> PUBLISH_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
$ npx dao acl create <dao-name>.aragonid.eth <mesg-addr> DESACTIVATE_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
# -> You may vote all this permission changes
```
