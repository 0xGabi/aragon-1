import React, { Component, Fragment } from 'react'

import { Field, DropDown } from '@aragon/ui'

import AppSelectorInstance from './AppSelectorInstance'

// TODO: This should remove when on Testnet Network
import { getEventAbi } from '../../../../utils/APM'

class AppSelector extends Component {
  static defaultProps = {
    onChange: () => {},
    apps: [],
    label: 'Application'
  }

  handleChange = async index => {
    const app = this.getAppFromInstalledApps(index)

    // TODO: This should remove when on Testnet Network
    const eventABIs = await getEventAbi(app.appId, app.appImplementationAddress)

    this.props.onChange({ index, name: app.name, appId: app.appId, appAddress: app.appAddress, appImplementationAddress: app.appImplementationAddress, abi: eventABIs })
  }

  getAppFromInstalledApps(index) {
    if (index === -1) return null
    const app = this.props.apps[index]
    return app
  }

  getItems() {
    return this.getAppItems()
  }

  getAppItems() {
    return this.props.apps.map(app => <AppSelectorInstance icon={app.icon()} name={app.name} />)
  }

  render() {
    const { label, selectedIndex } = this.props
    const items = this.getItems()
    return (
      <Fragment>
        <Field label={label}>
          <DropDown header='Application' items={items} selected={selectedIndex} onChange={this.handleChange} required wide />
        </Field>
      </Fragment>
    )
  }
}

export default AppSelector
