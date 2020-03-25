import React, { Component, Fragment } from 'react'

import { SidePanel } from '@aragon/ui'
import AppSelector from './Dropdown/applications/AppSelector'
import EventsSelector from './Dropdown/application-events/EventsSelector'
import ServiceSelector from './Dropdown/mesg-service/ServiceSelector'

import ServiceList from '../../utils/eventsList'
import ServiceForm from './ServiceDataForm/ServiceForm'

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

  handleServiceChange = serviceIndex => {
    this.setState({ selectedService: { ...serviceIndex } })
  }

  render() {
    const { opened, onClose, installedApps, api, currentApp } = this.props
    const { selectedApp, selectedAppEvents, selectedService } = this.state
    const DdApps = installedApps.filter(app => app.appImplementationAddress !== undefined && app.name !== 'MESG')

    this.handleChange = this.handleChange.bind(this)
    this.handleEventChange = this.handleEventChange.bind(this)
    this.handleServiceChange = this.handleServiceChange.bind(this)

    return (
      <SidePanel title='New Connection' opened={opened} onClose={onClose}>
        <div
          css={`
            margin-top: 20px;
          `}
        >
          <AppSelector apps={DdApps} onChange={this.handleChange} selectedIndex={selectedApp.index} />
        </div>
        <div
          css={`
            margin-top: 10px;
          `}
        >
          <EventsSelector abi={selectedApp.abi} onChange={this.handleEventChange} selectedIndex={selectedAppEvents.index} disabled={selectedApp.index === -1} />
        </div>
        <div
          css={`
            margin-top: 10px;
          `}
        >
          <ServiceSelector services={ServiceList.eventsList} onChange={this.handleServiceChange} selectedIndex={selectedService.index} disabled={selectedAppEvents.index === -1} />
        </div>
        {selectedService.index !== -1 ? (
          <div
            css={`
              margin-top: 10px;
            `}
          >
            <ServiceForm service={selectedService.service} app={selectedApp} appEvent={selectedAppEvents} api={api} onClose={onClose} currentApp={currentApp} />
          </div>
        ) : (
          <Fragment />
        )}
      </SidePanel>
    )
  }
}

export default PanelConnection
