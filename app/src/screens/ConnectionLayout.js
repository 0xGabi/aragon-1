import React, { Component, Fragment } from 'react'
import { CardLayout, GU, SyncIndicator } from '@aragon/ui'

import CardConnection from '../components/ConnectionCard/CardConnection'

class ConnectionLayout extends Component {
  render() {
    const { appState, installedApps } = this.props
    const { processes, isSyncing } = appState

    if (isSyncing) {
      return <SyncIndicator />
    }

    return (
      <Fragment>
        <CardLayout columnWidthMin={30 * GU} rowHeight={250}>
          {processes.map((process, i) => {
            const app = installedApps.find(app => app.appAddress.toLowerCase() === process.appAddress.toLowerCase())
            return <CardConnection key={i} process={process} app={app} />
          })}
        </CardLayout>
      </Fragment>
    )
  }
}

export default ConnectionLayout
