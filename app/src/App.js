import { Button, Header, Main, SyncIndicator, Layout, EmptyStateCard } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { Component, Fragment } from 'react'

import PanelConnection from './components/AppConnection/PanelConnection'
import TableConnection from './components/DataConnection/TableConnection'

class App extends Component {
  static defaultProps = {
    isSyncing: true
  }

  state = {
    newConnectionOpen: false
  }

  handleNewTransferOpen = () => {
    this.setState({ newConnectionOpen: true })
  }

  handleNewTransferClose = () => {
    this.setState({ newConnectionOpen: false })
  }

  render() {
    const { appState, installedApps, isSyncing, api, currentApp } = this.props
    const { processes } = appState
    const { newConnectionOpen } = this.state

    this.handleNewTransferOpen = this.handleNewTransferOpen.bind(this)
    this.handleNewTransferClose = this.handleNewTransferClose.bind(this)

    return (
      <Fragment>
        <Layout>
          {isSyncing && <SyncIndicator />}
          {processes.length !== 0 ? (
            <Fragment>
              <Header primary='Connections' secondary={<Button mode='strong' size='medium' label='Create Connection' onClick={this.handleNewTransferOpen} />} />
              <div
                css={`
                  margin-top: 10px;
                `}
              >
                <TableConnection appState={appState} installedApps={installedApps} />
              </div>
            </Fragment>
          ) : (
            <div
              css={`
                height: 100vh;
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: center;
                justify-content: center;
              `}
            >
              <EmptyStateCard text='No connection here!' action={<Button onClick={this.handleNewTransferOpen}>Create Connection</Button>} />
            </div>
          )}
        </Layout>
        <PanelConnection opened={newConnectionOpen} onClose={this.handleNewTransferClose} installedApps={installedApps} api={api} currentApp={currentApp} />
      </Fragment>
    )
  }
}

export default () => {
  const { appState, installedApps, guiStyle, api, currentApp } = useAragonApi()
  const { appearance } = guiStyle

  return (
    <Main theme={appearance}>
      <App appState={appState} isSyncing={appState.isSyncing} installedApps={installedApps} api={api} currentApp={currentApp} />
    </Main>
  )
}
