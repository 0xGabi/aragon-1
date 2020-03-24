import React, { Component } from 'react'

import { SidePanel } from '@aragon/ui'
import AppSelector from './Dropdown/applications/AppSelector'
import EventsSelector from './Dropdown/application-events/EventsSelector'
import ServiceSelector from './Dropdown/mesg-service/ServiceSelector'

import eventsList from '../../utils/eventsList'

const initialState = {
  selectedApp: {
    index: -1,
    name: '',
    appId: '',
    appAddress: '',
    appImplementationAddress: '',
    abi: []
  },
  selectedAppEvents: {
    index: -1,
    eventAbi: {}
  },
  selectedService: {
    index: -1,
    service: {}
  }
}

class PanelConnection extends Component {
  state = {
    ...initialState
  }

  static getDerivedStateFromProps({ opened }, state) {
    if (!opened) {
      return { ...initialState }
    }
    return null
  }

  handleChange = appIndex => {
    this.setState({ selectedApp: { ...appIndex } })
  }

  handleEventChange = eventIndex => {
    this.setState({ selectedAppEvents: { ...eventIndex } })
  }

  render() {
    const { opened, onClose, installedApps } = this.props
    const { selectApp, selectAppEvents } = this.state
    const DdApps = installedApps.filter(app => app.appImplementationAddress !== undefined && app.name !== 'MESG')

    this.handleChange = this.handleChange.bind(this)
    this.handleEventChange = this.handleEventChange.bind(this)

    return (
      <SidePanel title='New Connection' opened={opened} onClose={onClose}>
        <div
          css={`
            margin-top: 20px;
          `}
        >
          <AppSelector apps={DdApps} onChange={this.handleChange} selectedIndex={selectApp.index} />
        </div>
        <div
          css={`
            margin-top: 10px;
          `}
        >
          <EventsSelector abi={selectApp.abi} onChange={this.handleEventChange} selectedIndex={selectAppEvents.index} />
        </div>
        <div
          css={`
            margin-top: 10px;
          `}
        >
          <ServiceSelector services={eventsList} />
        </div>
      </SidePanel>
    )
  }
}

export default PanelConnection
