import React, { Fragment, useState } from 'react'
import { DataView, useTheme, GU, useLayout, Text, AppBadge, ContextMenu, ContextMenuItem, IconRemove, Modal, Button, IconView } from '@aragon/ui'
import moment from 'moment'
import { useAragonApi } from '@aragon/api-react'

import { IsValidJSONString } from '../../utils/helper'
import ServiceList from '../../utils/eventsList'

function TableConnection({ appState: { processes }, installedApps }) {
  const { api } = useAragonApi()
  const theme = useTheme()
  const { layoutName } = useLayout()
  const organization = installedApps.find(app => app.name === 'Kernel')

  const compactMode = layoutName === 'small'

  const [opened, setOpened] = useState(false)
  const [displayData, setDisplayData] = useState({ serviceName: '', appData: {}, keys: [] })

  const open = data => {
    setOpened(true)
    setDisplayData(data)
  }
  const close = () => {
    setOpened(false)
    setDisplayData({ serviceName: '', appData: {}, keys: [] })
  }

  const servicesList = ServiceList.eventsList

  const contentModal = content => {
    if (content.serviceName === '') return <Fragment />

    const inputsFields = servicesList.find(v => v.label === content.serviceName || v.name === content.serviceName)?.inputsFields

    return content.keys.map(key => {
      const label = inputsFields.find(v => v.name === key)?.label
      if (!label) {
        return <Fragment />
      }
      return (
        <div>
          <span>
            <strong
              css={`
                text-transform: capitalize;
              `}
            >
              {label}:{' '}
            </strong>
            <span>&nbsp;{content.appData[key]}</span>
          </span>
        </div>
      )
    })
  }

  return (
    <Fragment>
      <Modal visible={opened} onClose={close}>
        <div
          css={`
            margin: ${3 * GU};
          `}
        >
          <Fragment>{contentModal(displayData)}</Fragment>
        </div>
      </Modal>
      <DataView
        fields={[
          { label: 'Date', priority: 2 },
          { label: 'App', priority: 3 },
          { label: 'Event', priority: 3 },
          { label: 'Task', priority: 3 },
          { label: 'Data', priority: 1 }
          // { label: 'Status', priority: 2 }
        ]}
        entries={processes.map(
          (process, i) => ({
            index: i,
            createdAt: moment.unix(process.createdAt).format('DD/MM/YY'),
            appAddress: process.appAddress,
            eventName: process.eventName,
            serviceName: process.serviceName,
            data: process.data || {},
            active: process.active
          }),
          []
        )}
        renderEntry={({ createdAt, appAddress, eventName, serviceName, data, active }) => {
          const app = installedApps.find(app => app.appAddress.toLowerCase() === appAddress.toLowerCase())
          const appData = IsValidJSONString(data) ? JSON.parse(data) : {}
          const keys = Object.keys(appData)

          return [
            <Text size='small'>{createdAt}</Text>,
            <div
              css={`
                padding: 10px ${0.5 * GU}px;
                ${!compactMode
                  ? `
                display: inline-flex;
                max-width: ${layoutName === 'large' ? 'unset' : '150px'};
              `
                  : ''};
              `}
            >
              <AppBadge appAddress={appAddress} label={app?.name} iconSrc={app?.icon()} identifier={app?.identifier} />
            </div>,
            <div
              css={`
                padding: 10px ${0.5 * GU}px;
              `}
            >
              {eventName}
            </div>,
            <div
              css={`
                padding: 10px ${0.5 * GU}px;
              `}
            >
              {serviceName}
            </div>,
            <div
              css={`
                padding: 10px ${0.5 * GU}px;
              `}
            >
              <Button onClick={() => open({ serviceName, appData, keys })}>
                <IconView />
                &nbsp;&nbsp; View Data
              </Button>
            </div>
            // <div
            //   css={`
            //     padding: 10px ${0.5 * GU}px;
            //   `}
            // >
            //   {active ? (
            //     <span
            //       css={`
            //         color: ${theme.positive};
            //       `}
            //     >
            //       <b>ACTIVATED</b>
            //     </span>
            //   ) : (
            //     <span
            //       css={`
            //         color: ${theme.negative};
            //       `}
            //     >
            //       <b>DEACTIVATED</b>
            //     </span>
            //   )}
            // </div>
          ]
        }}
        renderEntryActions={({ entity, index }) => {
          return (
            <ContextMenu zIndex={1}>
              <ContextMenuItem onClick={() => api.deactivate(index, organization.appAddress.toLowerCase()).toPromise()}>
                <IconRemove
                  css={`
                    color: ${theme.surfaceContentSecondary};
                  `}
                />
                <span
                  css={`
                    margin-left: ${1 * GU}px;
                  `}
                >
                  DEACTIVATED
                </span>
              </ContextMenuItem>
            </ContextMenu>
          )
        }}
      />
    </Fragment>
  )
}

export default TableConnection
