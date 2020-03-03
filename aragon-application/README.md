# Aragon MESG Application

## Aragon MESG Application on your local computer.

1. Running MESG Service This service requires [MESG SDK](https://github.com/mesg-foundation/engine) to be installed first. You can install MESG SDK by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
npm install -g @mesg/cli
```

2. Create and start [MESG service ethereum](https://github.com/mesg-foundation/service-ethereum) by running the following command.

```sh
mesg-cli service:create "$(mesg-cli service:compile https://github.com/mesg-foundation/service-ethereum)"
```

**Start service ethereum:**

```sh
mesg-cli service:start com.mesg.ethereum --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT
```

3. Create and start [MESG service webhook](https://github.com/mesg-foundation/service-webhook) by running the following command.

```sh
mesg-cli service:create "$(mesg-cli service:compile https://github.com/mesg-foundation/service-webhook)"
```

**Start service webhook:**

```sh
mesg-cli service:start webhook
```

4. Create and start [MESG service process.deployer](https://github.com/mesg-foundation/service-process-deployer) by running the following command.

```sh
mesg-cli service:create "$(mesg-cli service:compile https://github.com/mesg-foundation/service-process-deployer)"
```

**Start service deployer:**

```sh
mesg-cli service:start process.deployer --env IPFS_ENDPOINT=$IPFS_ENDPOINT
```

5. Create and deploy MESG process by running the following command.

Replace service ethereum hash into [MESG PROCESS](../mesg-process/process.yml)

```yml
  ...
  - type: trigger
    instanceHash: <TO_REPLACE_SERVICE_ETHEREUM_LOCAL_HASH>
    eventKey: log
  - type: filter
    conditions:
      eventSignature: $(env:ENCODE_EVENT_SIGNATURE)
  - type: task
    instanceHash: <TO_REPLACE_SERVICE_ETHEREUM_LOCAL_HASH>
    taskKey: decodeLog
  ...
```

Replace service deployer hash into [MESG PROCESS](../mesg-process/process.yml)

```yml
  - type: task
    instanceHash: <TO_REPLACE_SERVICE_DEPLOYER_LOCAL_HASH>
    taskKey: deploy
    inputs:
      ipfsHash: { key: decodedData.ipfsHash }
```

```sh
$ cd .. && cd mesg-process
$ npm install
$ source .env
$ mesg-cli process:create "$(mesg-cli process:compile process.yml --env ENCODE_EVENT_SIGNATURE=$ENCODE_EVENT_SIGNATURE --env IPFS_ENDPOINT=$IPFS_ENDPOINT --dev)"
```


6. You can start the MESG dApp on a local Ethereum devchain as follows the command:

Before run command check and replace: 

1. `instanceHash` with local services hash are running into a [file](app/src/utils/processTemplate.js)

2. `provider` as local network hash into a [file](app/src/utils/processTemplate.js)

```sh
git clone https://github.com/mesg-foundation/aragon.git
cd aragon/aragon-application
npm install
npm start or npm start:ipfs:template
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