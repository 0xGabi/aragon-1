import React, { Component, Fragment } from 'react'
import { Field, DropDown } from '@aragon/ui'

class ServiceSelector extends Component {
  static defaultProps = {
    onChange: () => {},
    services: [],
    label: 'execute task',
    disabled: true
  }

  handleChange = index => {
    const service = this.getServiceInfo(index)
    this.props.onChange({ index, service })
  }

  getServiceInfo(index) {
    if (index === -1) return null
    return this.props.services[index]
  }

  getServicesName() {
    return this.props.services.map(service => service.label)
  }

  render() {
    const { label, selectedIndex, disabled } = this.props
    const items = this.getServicesName()
    return (
      <Fragment>
        <Field label={label}>
          <DropDown header='execute task' items={items} selected={selectedIndex} onChange={this.handleChange} disabled={disabled} required wide />
        </Field>
      </Fragment>
    )
  }
}

export default ServiceSelector
