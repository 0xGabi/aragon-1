import { useAragonApi, useGuiStyle } from '@aragon/api-react'
import moment from 'moment'
import React, { useState } from 'react'

import {
  AppBadge,
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
  IconError,
  IconRemove,
  GU,
  IconCloudUpload
} from '@aragon/ui'

import Sidebar from './components/Sidebar'
import Modal from './components/PopupModal'

function App() {
  const { api, appState, currentApp, installedApps } = useAragonApi()
  const { appearance } = useGuiStyle()
  const [opened, setOpened] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)
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
  const openModal = () => setDisplayModal(true)
  const closeModal = () => setDisplayModal(false)

  const filterApp = addr => {
    const getApp = installedApps.find(app => app.appAddress.toLowerCase() === addr.toLowerCase())
    return getApp
  }

  const disActivate = index => {
    api.desactivate(index).toPromise()
  }

  const valueName = ({ createdAt, appAddress, eventName, url, active, index }) => {
    return [
      <Tag size='normal' color={active ? 'green' : 'red'} background='transparent' icon={active ? <IconConnection /> : <IconError />} />,
      <Text size='small'>{createdAt}</Text>,
      <AppBadge appAddress={appAddress} label={filterApp(appAddress).name} iconSrc={filterApp(appAddress).icon()} identifier={filterApp(appAddress).identifier} />,
      <Text size='small'>{eventName}</Text>,
      <Text size='small'>{url}</Text>,
      <Button label='Deploy' icon={<IconCloudUpload />} onClick={openModal} disabled={!active} />,
      <ContextMenu disabled={!active}>
        <ContextMenuItem onClick={() => disActivate(index)}>
          <IconRemove />
          <div
            css={`
              width: ${1 * GU}px;
              padding: ${1 * GU}px ${1 * GU}px;
            `}
          />{' '}
          Disabled
        </ContextMenuItem>
      </ContextMenu>
    ]
  }
  return (
    <Main theme={appearance}>
      <Layout>
        <Header primary='Connections' secondary={<Button mode='strong' size='medium' label='Create Process' onClick={open} />} />
        <DataView
          css={`
            border: none;
          `}
          fields={[
            'Status',
            { label: 'Created At', align: 'start' },
            'App Address',
            'Event Name',
            { label: 'Url', align: 'start' },
            { label: 'Download', align: 'start' },
            { label: ' ', align: 'end' }
          ]}
          statusLoading={isSyncing}
          entries={
            processes.length !== 0
              ? processes.map((process, i) => ({
                  index: i,
                  createdAt: moment.unix(process.createdAt).format('DD/MM/YY'),
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
      <Sidebar opened={opened} close={close} installedApps={installedApps.filter(app => app.appImplementationAddress !== undefined && app.name !== currentApp.name)} />
      <Modal displayModal={displayModal} closeModal={closeModal} />
    </Main>
  )
}

export default App
