import React, { Component, Fragment } from 'react'
import { Field, DropDown } from '@aragon/ui'

class EventsSelector extends Component {
  static defaultProps = {
    onChange: () => {},
    abi: [],
    label: 'emits event',
    disabled: true
  }

  handleChange = index => {
    const abi = this.getAbiFromInstalledApps(index)
    this.props.onChange({ index, eventAbi: { ...abi } })
  }

  getAbiFromInstalledApps(index) {
    if (index === -1) return null
    return this.props.abi[index]
  }

  getEventsName() {
    return this.props.abi.map(abi => abi.name)
  }

  render() {
    const { label, selectedIndex, disabled } = this.props
    const items = this.getEventsName()
    return (
      <Fragment>
        <Field label={label}>
          <DropDown header='emits event' items={items} selected={selectedIndex} onChange={this.handleChange} disabled={disabled} required wide />
        </Field>
      </Fragment>
    )
  }
}

export default EventsSelector
