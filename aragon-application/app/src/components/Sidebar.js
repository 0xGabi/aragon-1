import { SidePanel, Field, DropDown, Button, TextInput } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { useState } from 'react'

function Sidebar({ opened, close, installedAppWithAbi }) {
  const { api } = useAragonApi()
  const [appSelected, setAppSelected] = useState(-1)
  const [eventSelected, setEventSelected] = useState(-1)
  const [textInput, setTextInput] = useState('')

  const appName = installedAppWithAbi.map(v => v.name)

  const Abi = installedAppWithAbi.map(v => ({ name: v.name, abi: v.abi }))

  const getEventFromAbi = name => Abi.find(abi => abi.name === name).abi.map(event => event.name)

  const handleSubmit = () => {
    api.create(installedAppWithAbi[appSelected].appAddress, getEventFromAbi(appName[appSelected])[eventSelected], textInput.trim()).toPromise()
    setTimeout(() => {
      close()
    }, 3000)
  }

  const handleSelectChange = e => {
    setAppSelected(e)
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
          <DropDown
            placeholder='Select an event'
            items={appSelected !== -1 ? getEventFromAbi(appName[appSelected]) : []}
            selected={eventSelected}
            onChange={setEventSelected}
            wide
          />
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
