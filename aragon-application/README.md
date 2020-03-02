# Aragon MESG Application

## Usage

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

4. You can start the MESG dApp on a local Ethereum devchain as follows the command:

Replace `instanceHash` as local services are running as [file](app/src/utils/processTemplate.js)
Replace `provider` as local network as [file](app/src/utils/processTemplate.js)

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

### npm Scripts

- **start** or **start:ipfs**: Runs your app inside a DAO served from IPFS
- **start:http**: Runs your app inside a DAO served with HTTP (hot reloading)
- **start:ipfs:template**: Creates a DAO with the [Template](https://github.com/mesg-foundation/aragon/blob/aragon-testnet-abi/aragon-application/contracts/Template.sol) and serves the app from IPFS
- **start:http:template**: Creates a DAO with the [Template](https://github.com/mesg-foundation/aragon/blob/aragon-testnet-abi/aragon-application/contracts/Template.sol) and serves the app with HTTP (hot reloading)
- **prepare**: Installs dependencies of the front-end
- **start:app**: Starts a development server for your app
- **compile**: Compiles the smart contracts
- **build**: Builds the front-end and background script
- **test**: Runs tests for the contracts
- **publish:patch**: Releases a patch version to aragonPM (only frontend/content changes allowed)
- **publish:minor**: Releases a minor version to aragonPM (only frontend/content changes allowed)
- **publish:major**: Releases a major version to aragonPM (frontend **and** contract changes)
- **versions**: Checks the currently installed versions of the app
- **lint**: Checks the app and the contracts for linting errors
- **lint:fix**: Fixes the lint errors that can be resolved automatically
- **coverage**: Runs the tests for the contracts and creates a report