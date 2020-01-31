import { useAragonApi, useGuiStyle } from '@aragon/api-react'
import React, { useState } from 'react'
import moment from 'moment'

import {
  AppBadge,
  IdentityBadge,
  Button,
  Header,
  Main,
  SyncIndicator,
  DataView,
  Text,
  Tag,
  Layout,
  ContextMenu,
  ContextMenuItem,
  IconConnection,
  IconError
} from '@aragon/ui'

import Sidebar from './components/Sidebar'

function App() {
  const { api, appState, installedApps } = useAragonApi()
  const { appearance } = useGuiStyle()
  const [opened, setOpened] = useState(false)

  const { processes, isSyncing } = appState

  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const filterApp = addr => {
    const getApp = installedApps.find(app => app.appAddress.toLowerCase() === addr.toLowerCase())
    return getApp
  }

  const disActivate = index => {
    api.desactivate(index).toPromise()
  }

  const valueName = ({ createdAt, owner, appAddress, eventName, url, active, index }) => {
    return [
      <Tag size='normal' color={active ? 'green' : 'red'} background='transparent' icon={active ? <IconConnection /> : <IconError />} />,
      <Text size='small'>{createdAt}</Text>,
      <IdentityBadge entity={owner} connectedAccount />,
      <AppBadge
        appAddress={appAddress}
        label={filterApp(appAddress).name}
        iconSrc={filterApp(appAddress).icon()}
        identifier={filterApp(appAddress).identifier}
      />,
      <Text size='small'>{eventName}</Text>,
      <Text size='small'>{url}</Text>,
      <ContextMenu disabled={!active}>
        <ContextMenuItem onClick={() => disActivate(index)}>Disabled</ContextMenuItem>
      </ContextMenu>
    ]
  }
  return (
    <Main theme={appearance}>
      <Layout>
        {isSyncing && <SyncIndicator />}
        <Header
          primary='Connections'
          secondary={
            <Button mode='strong' size='medium' onClick={open}>
              Create Process
            </Button>
          }
        />

        <DataView
          css={`
            border: none;
          `}
          fields={[
            'Status',
            { label: 'Created At', align: 'start' },
            'Address',
            'App Address',
            'Event Name',
            { label: 'Url', align: 'start' },
            { label: ' ', align: 'end' }
          ]}
          statusLoading={isSyncing}
          entries={
            processes.length !== 0
              ? processes.map((process, i) => ({
                  index: i,
                  createdAt: moment.unix(process.createdAt).format('DD/MM/YY'),
                  owner: process.owner,
                  appAddress: process.appAddress,
                  eventName: process.eventName,
                  url: process.url,
                  active: process.active
                }))
              : []
          }
          renderEntry={valueName}
        />
      </Layout>
      <Sidebar opened={opened} close={close} app={installedApps} api={api} />
    </Main>
  )
}

export default App
