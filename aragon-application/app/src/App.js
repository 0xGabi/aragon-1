import { useAragonApi, useGuiStyle } from '@aragon/api-react'
import moment from 'moment'
import React, { useState } from 'react'

import { AppBadge, Button, Header, Main, SyncIndicator, DataView, Text, Tag, Layout, ContextMenu, ContextMenuItem, IconConnection, IconError, IconRemove, GU } from '@aragon/ui'

import Sidebar from './components/Sidebar'

function App() {
  const { api, appState, currentApp, installedApps } = useAragonApi()
  const { appearance } = useGuiStyle()
  const [opened, setOpened] = useState(false)
  const { processes, isSyncing } = appState

  if (isSyncing) {
    return (
      <Main theme={appearance}>
        <Layout>
          <SyncIndicator />
        </Layout>
      </Main>
    )
  }

  const open = () => setOpened(true)
  const close = () => setOpened(false)

  return (
    <Main theme={appearance}>
      <Layout>
        <Header primary='Connections' secondary={<Button mode='strong' size='medium' label='Create Process' onClick={open} />} />
        <DataView
          css={`
            border: none;
          `}
          fields={['Status', { label: 'Created At', align: 'start' }, 'App Address', 'Event Name', { label: 'Webhook Url', align: 'start' }, { label: ' ', align: 'end' }]}
          statusLoading={isSyncing}
          entries={processes.map(
            (process, i) => ({
              index: i,
              createdAt: moment.unix(process.createdAt).format('DD/MM/YY'),
              appAddress: process.appAddress,
              eventName: process.eventName,
              url: process.url,
              active: process.active,
              appImplementationAddress: process.appImplementationAddress,
              ipfsHash: process.ipfsHash
            }),
            []
          )}
          renderEntry={({ createdAt, appAddress, eventName, url, active, index }) => {
            const app = installedApps.find(app => app.appAddress.toLowerCase() === appAddress.toLowerCase())
            return [
              <Tag size='normal' color={active ? 'green' : 'red'} background='transparent' icon={active ? <IconConnection /> : <IconError />} />,
              <Text size='small'>{createdAt}</Text>,
              <AppBadge appAddress={appAddress} label={app.name} iconSrc={app.icon()} identifier={app.identifier} />,
              <Text size='small'>{eventName}</Text>,
              <Text size='small'>{url}</Text>,
              <ContextMenu disabled={!active}>
                <ContextMenuItem onClick={() => api.desactivate(index).toPromise()}>
                  <IconRemove />
                  <div
                    css={`
                      width: ${1 * GU}px;
                      padding: ${1 * GU}px ${1 * GU}px;
                    `}
                  />
                  Disabled
                </ContextMenuItem>
              </ContextMenu>
            ]
          }}
        />
      </Layout>
      <Sidebar
        opened={opened}
        close={close}
        installedApps={installedApps.filter(app => app.appImplementationAddress !== undefined && app.name !== currentApp.name)}
        processLength={processes.length}
      />
    </Main>
  )
}

export default App
