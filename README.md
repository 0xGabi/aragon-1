# Aragon MESG Application

## Demo

Check out the demo video:

[![Demo: Connect your DAO events to any webhook](https://img.youtube.com/vi/_yiPCCBV3pw/0.jpg)](https://www.youtube.com/watch?v=_yiPCCBV3pw "Demo: Connect your DAO events to any webhook")


## Installing the MESG dApp on a Rinkeby DAO

This MESG Aragon app is published in the AragonPM package manager on Rinkeby, so it can be
installed to any Aragon DAO on that network. In order to deploy this app on an existing DAO,
you can do the following:

### Install Aragon cli

You can install `Aragon cli` follow command or [follow the document installation guide](https://hack.aragon.org/docs/cli-intro.html).

```sh
npm install -g @aragon/cli
```

### Installed application

You can install `MESG application (mesg.open.aragonpm.eth) ` follow command or [follow the document installation guide](https://hack.aragon.org/docs/cli-dao-commands).

```sh
$ dao install <dao-name>.aragonid.eth mesg.open.aragonpm.eth --environment aragon:rinkeby
# -> Depending on your DAO permissions, a voting may have been issued. The voting must pass in order to continue.
$ dao apps --all <dao-name>.aragonid.eth --environment aragon:rinkeby
# -> You should see a list of apps, and the <mesg-addr> listed under permissionless apps.
$ dao acl create <dao-name>.aragonid.eth <mesg-addr> PUBLISH_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
$ dao acl create <dao-name>.aragonid.eth <mesg-addr> DESACTIVATE_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
# -> You may vote all this permission changes
```

## Aragon MESG Application on your local computer

You can start the MESG dApp on a local Ethereum devchain by following:

### Download source

```sh
$ git clone https://github.com/mesg-foundation/aragon.git
$ cd aragon/aragon-application
```

### Create configuration file

Copy the `.env.example` to `.env` in directory `app`

This file contains required configurations needed for the application.
You need to replace the `...` by the right value.

```sh
$ npm install
$ npm start
```

Make sur to also run the [process deployer](process/deployer/README.md) in order to automatically run the processes from your local node.