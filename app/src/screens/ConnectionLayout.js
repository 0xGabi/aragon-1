import React, { Component, Fragment } from 'react'
import { CardLayout, Card, GU, SyncIndicator } from '@aragon/ui'

class ConnectionLayout extends Component {
  render() {
    const { appState } = this.props
    const { processes, isSyncing } = appState

    if (isSyncing) {
      return <SyncIndicator />
    }

    return (
      <Fragment>
        <CardLayout columnWidthMin={30 * GU} rowHeight={294}>
          <Card onClick={() => console.log('object')}>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
          <Card>fegoheo</Card>
        </CardLayout>
      </Fragment>
    )
  }
}

export default ConnectionLayout
