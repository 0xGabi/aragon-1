import { Card, GU, AppBadge, Button } from '@aragon/ui'
import moment from 'moment'
import React from 'react'
import CardTextLayout from './CardTextLayout'

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
      <CardTextLayout>
        <AppBadge appAddress={process.appAddress} label={app.name} iconSrc={app.icon()} identifier={app.identifier} />
      </CardTextLayout>
      <CardTextLayout>
        <span>
          <strong>Create At: </strong>
        </span>
        <span>{moment.unix(process.createdAt).format('DD/MM/YY')}</span>
      </CardTextLayout>
      <CardTextLayout>
        <span>
          <strong>Event: </strong>
        </span>
        <span>{process.eventName}</span>
      </CardTextLayout>
      <CardTextLayout>
        <span>
          <strong>Service: </strong>
        </span>
        <span>WEBHOOK</span>
      </CardTextLayout>
      <CardTextLayout>
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
      </CardTextLayout>
      {process.active ? (
        <Button mode='negative' wide>
          Deactivated connection
        </Button>
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
