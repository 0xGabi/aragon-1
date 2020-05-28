# Aragon MESG Application

This MESG application allows you to connect any events from your Aragon DAO to emit event and notification with each service.

This MESG application has 4 services defined:

| **Services** | **task** |**description** |
| --- | --- | --- |
| **Email** | `Send an email` | when emit event from installed apps on Aragon DAO will send an email |
| **Slack** | `Send message on slack` | when emit event from installed apps on Aragon DAO will send notification message to slack  |
| **Telegram** | `Send message on telegram` | when emit event from installed apps on Aragon DAO will send notification message to telegram |
| **Webhook** | `Post to URL` | when emit event from installed apps on Aragon DAO will post data to URL |

## Demo

Check out the demo video:

[![Demo: Set up Telegram notificatons from DAO votes](http://i3.ytimg.com/vi/7R1pBGLJbPs/maxresdefault.jpg)](https://www.youtube.com/watch?v=7R1pBGLJbPs&feature=youtu.be "Demo: Set up Telegram notificatons from DAO votes")

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
    $ dao install <dao-name>.aragonid.eth liteflow.open.aragonpm.eth --environment aragon:rinkeby
    ```

2. Check your Aragon DAO permission and check `MESG application` has been installed.

    ```sh
    $ dao apps --all <dao-name>.aragonid.eth --environment aragon:rinkeby
    ```

    You should see a list of apps with the `liteflow.open.aragonpm.eth` and `MESG application address` listed under permissionless apps.

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
    $ aragon apm versions liteflow.open.aragonpm.eth --environment aragon:rinkeby
    ```

2. Upgrade to latest version.

    ```sh
    $ dao upgrade <dao-name>.aragonid.eth liteflow.open.aragonpm.eth --environment aragon:rinkeby
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
    $ npm start
    ```

### Introduction to environments

This app has 3 environments defined:

| **Environments** | **Network** |
| --- | --- |
| **default** | `local` |
| **rinkeby** | `rinkeby` |
| **mainnet** | `mainnet` |

### Get Application information command

Display application information _`abis,contract address,name,latest version, etc.`_

```sh
$ aragon apm info liteflow.open.aragonpm.eth
```

### Get Application version command

Display all application versions.

```sh
$ aragon apm version liteflow.open.aragonpm.eth
```

### Check published versions

Publish to AragonPM has `major`,`minor` and `patch` versions:

- _major_ is upgrade **content** and **contract**.
- _minor_ and _patch_ are upgrade **front-end only**.

#### Publish command

```sh
$ npx buidler publish <bump> --network rinkeby --show-stack-traces
```
