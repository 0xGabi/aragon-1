import { SidePanel, Field, DropDown, Button, TextInput } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { useState } from 'react'

import { getAllVersions } from '../utils/APM'

function Sidebar({ opened, close, installedApps }) {
  const { api } = useAragonApi()
  const [appSelected, setAppSelected] = useState(-1)
  const [eventSelected, setEventSelected] = useState(-1)
  const [eventsAbi, setEventsAbi] = useState([])
  const [textInput, setTextInput] = useState('')

  const appName = installedApps.map(v => v.name)

  const handleSubmit = () => {
    const app = installedApps[appSelected]
    api.create(app.appAddress, app.appImplementationAddress, eventsAbi[eventSelected], textInput.trim()).toPromise()
    setTimeout(() => {
      close()
    }, 5000)
  }

  const handleSelectChange = async e => {
    setAppSelected(e)
    const app = installedApps[e]
    const version = await getAllVersions(app.appId, app.appImplementationAddress)
    if (!version) {
      throw new Error(`cannot find version for ${app.appImplementationAddress}`)
    }
    const AbiEvent = version.abi.filter(abi => abi.type === 'event').map(event => event.name)
    setEventsAbi(AbiEvent)
    setEventSelected(-1)
  }

  return (
    <SidePanel title='Create Process' opened={opened} onClose={close}>
      <div
        css={`
          margin-top: 20px;
        `}
      >
        <Field label='Application'>
          <DropDown placeholder='Select an application' items={appName} selected={appSelected} onChange={handleSelectChange} wide />
        </Field>
        <Field label='Events'>
          <DropDown placeholder='Select an event' items={eventsAbi} selected={eventSelected} onChange={setEventSelected} wide />
        </Field>
        <Field label='Webhook Url'>
          <TextInput
            value={textInput}
            onChange={e => {
              setTextInput(e.target.value)
            }}
            wide
          />
        </Field>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </SidePanel>
  )
}

export default Sidebar
