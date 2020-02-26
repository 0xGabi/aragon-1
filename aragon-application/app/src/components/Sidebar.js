import { SidePanel, Field, DropDown, Button, TextInput } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { useState } from 'react'

import ProcessTemplate from '../utils/processTemplate'
import { encodeEventSignature } from '../utils/Web3'

function Sidebar({ opened, close, installedApps, processLength }) {
  const { api } = useAragonApi()
  const [appSelected, setAppSelected] = useState(-1)
  const [eventSelected, setEventSelected] = useState(-1)
  const [eventsAbi, setEventsAbi] = useState([])
  const [textInput, setTextInput] = useState('')

  const handleSubmit = async () => {
    const app = installedApps[appSelected]
    const eventAbi = app.abi.find(abi => abi.name === eventsAbi[eventSelected])
    const eventSignature = await encodeEventSignature(eventAbi)

    await api.create(app.appAddress, ipfsHash, eventsAbi[eventSelected], textInput.trim()).toPromise()

    const ipfsHash = await ProcessTemplate({ ...app, index: processLength, url: textInput.trim() }, eventAbi, eventSignature)

    console.log(`ipfsHash: ${ipfsHash}`)

    setAppSelected(-1)
    setEventSelected(-1)
    setEventsAbi([])
    setTextInput('')
    close()
  }

  const handleSelectChange = async e => {
    setAppSelected(e)
    const app = installedApps[e]
    const AbiEvent = app.abi.filter(abi => abi.type === 'event').map(event => event.name)
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
          <DropDown placeholder='Select an application' items={installedApps.map(v => v.name)} selected={appSelected} onChange={handleSelectChange} wide />
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
