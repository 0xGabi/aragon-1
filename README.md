# Aragon MESG Application

## Demo

Check out the demo video:

[![Demo: Connect your DAO events to any webhook](https://img.youtube.com/vi/MctlHrLSm70/0.jpg)](https://www.youtube.com/watch?v=MctlHrLSm70 "Demo: Connect your DAO events to any webhook")

### Global dependencies should install

- aragon-cli

    ```sh
    $ npm install -g @aragon/cli
    ```

- liteflow-cli

    ```sh
    $ npm install -g @liteflow/cli
    ```

## To install the MESG application to Aragon DAO on Rinkeby network.

This MESG Aragon app is published in the AragonPM package manager on Rinkeby, so it can be
installed to any Aragon DAO on that network. In order to deploy this app on an existing DAO,
you can do the following:

### To install MESG application

1. Install `MESG application` to your Aragon DAO.

    ```sh
    $ dao install <dao-name>.aragonid.eth mesg.open.aragonpm.eth --environment aragon:rinkeby
    ```

2. Check your Aragon DAO permission and check `MESG application` has been installed.

    ```sh
    $ dao apps --all <dao-name>.aragonid.eth --environment aragon:rinkeby
    ```

    You should see a list of apps with the `mesg.open.aragonpm.eth` and `MESG application address` listed under permissionless apps.

3. Set permission to `MESG Application` on your Aragon DAO.

    3.1 Set `PUBLISH_ROLE` permission

      ```sh
      $ dao acl create <dao-name>.aragonid.eth <mesg-addr> PUBLISH_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
      ```

    3.2 Set `DESACTIVATE_ROLE` permission

      ```sh
      $ dao acl create <dao-name>.aragonid.eth <mesg-addr> DESACTIVATE_ROLE <your-addr> <your-addr> --environment aragon:rinkeby
      ```  

### To upgrade MESG application version

1. Check the latest version of MESG application.

    ```sh
    $ aragon apm versions mesg.open.aragonpm.eth --environment aragon:rinkeby
    ```

2. Upgrade to latest version.

    ```sh
    $ dao upgrade <dao-name>.aragonid.eth mesg.open.aragonpm.eth --environment aragon:rinkeby
    ```

## Developer quick start 👩‍💻

You can start develop the `MESG application` on a local Ethereum devchain by following:

1. **Aragon document:** [Link](https://hack.aragon.org/docs/getting-started)

2. **Liteflow document:** [Link](https://docs.liteflow.com/)

### Download source

```sh
$ git clone https://github.com/mesg-foundation/aragon.git
```

### Create configuration file

Copy the `.env.example` to `.env` in directory `app`

This file contains required configurations needed for the application.
You need to replace the `...` by the right value.


### Start development

1. Install dependencies

    ```sh
    $ npm install
    ```

2. Run application in the local

    ```sh
    $ npm run start:ipfs:template
    ```

### Introduction to environments

This app has 3 environments defined:

| **Environments** | **Network** |
| --- | --- |
| **default** | `local` |
| **rinkeby** | `rinkeby` |
| **mainnet** | `mainnet` |

### Get Application information command

```sh
$ aragon apm info mesg.open.aragonpm.eth
```

### Get Application version command

```sh
$ aragon apm version mesg.open.aragonpm.eth
```

### Publish Application to AragonPM

Publish to AragonPM has `major`,`minor` and `patch` versions:

- Major are upgrade **content** and **contract**.
- Minor and patch are upgrade **front-end only**.

#### Publish command

```sh
$ aragon apm publish major --files dist/
```