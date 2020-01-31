import { SidePanel, Field, DropDown, Button, Text, TextInput } from '@aragon/ui'
import React, { useState } from 'react'

import Voting from '../../mock/Voting.json'
import Tokens from '../../mock/Tokens.json'

function Sidebar({ opened, close, app, api }) {
  const [appSelected, setAppSelected] = useState(-1)
  const [eventSelected, setEventSelected] = useState(-1)
  const [textInput, setTextInput] = useState('')
  const dao = app.filter(item => item.appImplementationAddress !== undefined && item.name !== 'MESG')

  const daoName = dao.map(v => v.name)

  const Abi = { Voting, Tokens }

  const getEventFromAbi = name => Abi[name].abi.filter(event => event.type === 'event').map(event => event.name)

  const handleSubmit = () => {
    api.create(dao[appSelected].appAddress, getEventFromAbi(daoName[appSelected])[eventSelected], textInput).toPromise()
    close()
  }

  return (
    <SidePanel title='Create Process' opened={opened} onClose={close}>
      <div
        css={`
          margin-top: 20px;
        `}
      >
        <Field label='Application'>
          <DropDown placeholder='Select an application' items={daoName} selected={appSelected} onChange={setAppSelected} wide />
          <Text size='small'>{appSelected !== -1 ? dao[appSelected].appAddress : ''}</Text>
        </Field>
        <Field label='Events'>
          <DropDown
            placeholder='Select an event'
            items={appSelected !== -1 ? getEventFromAbi(daoName[appSelected]) : []}
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
