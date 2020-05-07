import { GU } from '@aragon/ui'
import React from 'react'
import styled from 'styled-components'

function AppSelectorInstance({ name, icon }) {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <Icon src={icon} />
      <span
        css={`
          max-width: 110px;
          margin-right: ${1 * GU}px;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        {name}
      </span>
    </div>
  )
}

const Icon = styled.img.attrs({ alt: '', width: '25', height: '25' })`
  margin-right: ${1 * GU}px;
  border-radius: 3px;
`

export default AppSelectorInstance
