import React, { Component, Fragment } from 'react'
import { Field, TextInput, Button, Info } from '@aragon/ui'

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
    const { service, app, appEvent, api, onClose, currentApp, organization } = this.props
    const eventSignature = await encodeEventSignature(appEvent.eventAbi)
    const processUrl = await ConnectionTemplate(service.name, {
      ...app,
      eventAbi: appEvent.eventAbi,
      mesgAddress: currentApp.appAddress,
      eventSignature,
      instanceHash: service.instanceHash,
      data: this.state
    })

    api
      .create(app.appAddress, processUrl, appEvent.eventAbi.name, service.label, JSON.stringify(this.state), organization.appAddress.toLowerCase())
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
            <TextInput name={v.name} onChange={this.handleChange} placeholder={v?.placeholder} required={v.required} wide />
          </Field>
        ))}

        {service.description ? (
          <div
            css={`
              margin-top: 5px;
            `}
          >
            <Info>
              {service?.description?.text}{' '}
              {service?.description?.link ? (
                <a href={service?.description?.link?.url} target='_blank' rel='noopener noreferrer'>
                  {service?.description?.link?.label}
                </a>
              ) : null}
              .
            </Info>
          </div>
        ) : (
          <Fragment />
        )}

        <div
          css={`
            margin-top: ${service?.description ? '15px' : '5px'};
          `}
        >
          <Button mode='strong' disabled={Object.keys(this.state).length === 0} wide onClick={this.handleSubmit}>
            Create connection
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default ServiceForm
