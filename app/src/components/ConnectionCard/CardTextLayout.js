import React from 'react'
import { GU } from '@aragon/ui'

function CardTextLayout({ children }) {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        margin-bottom: ${1 * GU}px;
      `}
    >
      {children}
    </div>
  )
}

export default CardTextLayout
