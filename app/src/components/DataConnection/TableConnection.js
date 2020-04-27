import React, { Fragment } from 'react'
import { DataView, textStyle, useTheme, GU, useLayout, Text, AppBadge, ContextMenu, ContextMenuItem, IconRemove } from '@aragon/ui'
import moment from 'moment'
import { useAragonApi } from '@aragon/api-react'

function TableConnection({ appState: { processes }, installedApps }) {
  const { api } = useAragonApi()
  const theme = useTheme()
  const { layoutName } = useLayout()
  const organization = installedApps.find(app => app.name === 'Kernel')

  const compactMode = layoutName === 'small'

  return (
    <DataView
      heading={
        <Fragment>
          <div
            css={`
              padding-bottom: ${2 * GU}px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <div
              css={`
                color: ${theme.content};
                ${textStyle('body1')};
              `}
            >
              Transfers
            </div>
          </div>
        </Fragment>
      }
      fields={[
        { label: 'Date', priority: 2 },
        { label: 'DAO Application', priority: 3 },
        { label: 'DAO Event', priority: 3 },
        { label: 'MESG Service', priority: 3 },
        { label: 'Data', priority: 1 },
        { label: 'Status', priority: 2 }
      ]}
      entries={processes.map(
        (process, i) => ({
          index: i,
          createdAt: moment.unix(process.createdAt).format('DD/MM/YY'),
          appAddress: process.appAddress,
          eventName: process.eventName,
          serviceName: process.serviceName,
          data: process.data,
          active: process.active
        }),
        []
      )}
      renderEntry={({ createdAt, appAddress, eventName, serviceName, data, active }) => {
        const app = installedApps.find(app => app.appAddress.toLowerCase() === appAddress.toLowerCase())
        const appData = JSON.parse(data)
        const keys = Object.keys(appData)
        return [
          <Text size='small'>{createdAt}</Text>,
          <div
            css={`
              padding: 0 ${0.5 * GU}px;
              ${!compactMode
                ? `
                display: inline-flex;
                max-width: ${layoutName === 'large' ? 'unset' : '150px'};
              `
                : ''};
            `}
          >
            <AppBadge appAddress={appAddress} label={app.name} iconSrc={app.icon()} identifier={app.identifier} />
          </div>,
          <div
            css={`
              padding: 0 ${0.5 * GU}px;
            `}
          >
            {eventName}
          </div>,
          <div
            css={`
              padding: 0 ${0.5 * GU}px;
            `}
          >
            {serviceName}
          </div>,
          <div
            css={`
              padding: 0 ${0.5 * GU}px;
            `}
          >
            {keys.map((key, i) => (
              <div key={i}>{appData[key]}</div>
            ))}
          </div>,
          <div
            css={`
              padding: 0 ${0.5 * GU}px;
            `}
          >
            {active ? (
              <span
                css={`
                  color: ${theme.positive};
                `}
              >
                <b>ACTIVATED</b>
              </span>
            ) : (
              <span
                css={`
                  color: ${theme.negative};
                `}
              >
                <b>DEACTIVATED</b>
              </span>
            )}
          </div>
        ]
      }}
      renderEntryActions={({ entity, index }) => {
        return (
          <ContextMenu zIndex={1}>
            <ContextMenuItem onClick={() => api.deacivate(index, organization.appAddress.toLowerCase()).toPromise()}>
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
  )
}

export default TableConnection
