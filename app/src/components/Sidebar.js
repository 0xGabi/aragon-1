import { SidePanel, Field, DropDown, Button, TextInput } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { useState } from 'react'

import ProcessTemplate from '../utils/processTemplate'
import { encodeEventSignature } from '../utils/Web3'

// To remove when upload to real network
import { getEventAbi } from '../utils/APM'

function Sidebar({ opened, close, installedAppsWithoutMESG }) {
  const { api, installedApps, currentApp, connectedAccount } = useAragonApi()
  const [appSelected, setAppSelected] = useState(-1)
  const [eventSelected, setEventSelected] = useState(-1)
  const [eventsAbi, setEventsAbi] = useState([])
  const [textInput, setTextInput] = useState('')

  const handleSubmit = async () => {
    const app = installedAppsWithoutMESG[appSelected]

    /* To remove when upload to real network */
    // const eventAbi = (await getEventAbi(app.appId, app.appImplementationAddress)).find(abi => abi.name === eventsAbi[eventSelected])

    // const eventAbi = app.abi.find(abi => abi.name === eventsAbi[eventSelected])

    // const eventSignature = await encodeEventSignature(eventAbi)
    // const MESG = installedApps.find(app => app.name === currentApp.name)
    // const ipfsHash = await ProcessTemplate({ ...app, mesgAddress: MESG.appAddress, url: textInput.trim(), connectedAccount }, eventAbi, eventSignature)

    await api.create(app.appAddress, 'fskjdhfskjhgskfjkjfgsdfl', eventsAbi[eventSelected], textInput.trim()).toPromise()

    setAppSelected(-1)
    setEventSelected(-1)
    setEventsAbi([])
    setTextInput('')
    close()
  }

  const handleSelectChange = async e => {
    setAppSelected(e)
    const app = installedAppsWithoutMESG[e]

    /* To remove when upload to real network */
    const AbiEvent = (await getEventAbi(app.appId, app.appImplementationAddress)).map(event => event.name)

    // const AbiEvent = app.abi.filter(abi => abi.type === 'event').map(event => event.name)
    setEventsAbi(AbiEvent)
    setEventSelected(-1)
  }

  return (
    <SidePanel title='Create Connection' opened={opened} onClose={close}>
      <div
        css={`
          margin-top: 20px;
        `}
      >
        <Field label='Application'>
          <DropDown
            placeholder='Select an application'
            items={installedAppsWithoutMESG.map(v => v.name)}
            selected={appSelected}
            onChange={handleSelectChange}
            wide
            disabled={installedAppsWithoutMESG.length === 0}
          />
        </Field>
        <Field label='Events'>
          <DropDown placeholder='Select an event' items={eventsAbi} selected={eventSelected} onChange={setEventSelected} disabled={eventsAbi.length === 0} wide />
        </Field>
        <Field label='Webhook Url'>
          <TextInput
            value={textInput}
            onChange={e => {
              setTextInput(e.target.value)
            }}
            disabled={eventSelected === -1}
            wide
          />
        </Field>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </SidePanel>
  )
}

export default Sidebar
