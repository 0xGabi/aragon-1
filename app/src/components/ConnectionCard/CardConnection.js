import { Card, GU, AppBadge, Button } from '@aragon/ui'
import moment from 'moment'
import React from 'react'

function CardConnection({ process, app }) {
  return (
    <Card
      css={`
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: auto 1fr auto auto;
        grid-gap: ${1 * GU}px;
        padding: ${3 * GU}px;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-bottom: ${1 * GU}px;
        `}
      >
        <AppBadge appAddress={process.appAddress} label={app.name} iconSrc={app.icon()} identifier={app.identifier} />
      </div>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-bottom: ${1 * GU}px;
        `}
      >
        <span>
          <strong>Create At: </strong>
        </span>
        <span>{moment.unix(process.createdAt).format('DD/MM/YY')}</span>
      </div>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-bottom: ${1 * GU}px;
        `}
      >
        <span>
          <strong>Event: </strong>
        </span>
        <span>{process.eventName}</span>
      </div>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-bottom: ${1 * GU}px;
        `}
      >
        <span>
          <strong>Status: </strong>
        </span>
        <span
          css={`
            color: ${process.active ? 'green' : 'red'};
          `}
        >
          {process.active ? 'ACTIVATED' : 'DEACTIVATED'}
        </span>
      </div>
      {process.active ? (
        <div
          css={`
            display: flex;
            justify-content: space-between;
            margin-bottom: ${1 * GU}px;
          `}
        >
          <Button mode='negative' wide>
            Deactivated connection
          </Button>
        </div>
      ) : (
        <div
          css={`
            display: flex;
            justify-content: space-between;
            margin-bottom: ${1 * GU}px;
          `}
        />
      )}
    </Card>
  )
}

export default CardConnection
