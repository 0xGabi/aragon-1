import React, { Component, Fragment } from 'react'
import { Field, TextInput, Button } from '@aragon/ui'

import { encodeEventSignature } from '../../../utils/Web3'
import ConnectionTemplate from '../../../utils/ConnectionTemplate'

class ServiceForm extends Component {
  static defaultProps = {
    onClose: () => {},
    appEvent: {},
    app: {}
  }

  state = {}

  async handleSubmit(e) {
    e.preventDefault()
    const { service, app, appEvent, api, onClose, currentApp } = this.props
    // const eventSignature = await encodeEventSignature(appEvent.eventAbi)
    // const createProcessTemp = await ConnectionTemplate(app, this.state, appEvent.eventAbi, eventSignature, currentApp.appAddress)

    api
      .create(app.appAddress, 'fsdjlfjsdlfjsdfljlsdfjldsjf', appEvent.eventAbi.name, JSON.stringify(this.state))
      .toPromise()
      .then(result => {
        onClose()
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { service } = this.props

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    return (
      <Fragment>
        {service.inputsFields.map((v, i) => (
          <Field key={i} label={v.label}>
            <TextInput name={v.name} onChange={this.handleChange} required wide />
          </Field>
        ))}
        <div
          css={`
            margin-top: 5px;
          `}
        >
          <Button mode='strong' disabled={Object.keys(this.state).length === 0} wide onClick={this.handleSubmit}>
            Create new connection
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default ServiceForm
