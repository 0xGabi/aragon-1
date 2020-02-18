import { Modal, textStyle, GU, TextCopy } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React, { useState } from 'react'

import { getAllVersions } from '../utils/APM'
import { encodeEventSignature } from '../utils/Web3'
import ProcessTemplate from '../utils/processTemplate'

function PopupModal({ displayModal, closeModal, processData }) {
  const { installedApps } = useAragonApi()
  const [processText, setProcessText] = useState(null)

  const getEventAbi = async () => {
    if (processData !== null) {
      const installedApp = installedApps.find(app => app.appAddress.toLowerCase() === processData.appAddress.toLowerCase())
      const version = await getAllVersions(installedApp.appId, installedApp.appImplementationAddress)
      if (!version) {
        throw new Error(`cannot find version for ${app.appImplementationAddress}`)
      }
      const eventAbi = version.abi.find(abi => abi.name === processData.eventName)
      return eventAbi
    }
  }

  const downloadFile = async () => {
    if (processData && displayModal) {
      const eventAbi = await getEventAbi()
      const encode = await encodeEventSignature(eventAbi)
      const temp = await ProcessTemplate(processData, eventAbi, encode)
      const command = `npx mesg-cli process:create '${JSON.stringify(temp)}' `
      setProcessText(command)
    }
  }

  downloadFile()

  return (
    <Modal visible={displayModal} onClose={closeModal} closeButton={false}>
      <div
        css={`
          ${textStyle('title1')};
        `}
      >
        Deploy the process
      </div>
      <div
        css={`
          ${textStyle('body1')};
        `}
      >
        <ol>
          <li>
            <strong>Copy the text and run it on the terminal</strong>
            <div
              css={`
                width: 100%;
                display: flex;
                justify-content: center;
                padding: ${1 * GU}px ${1 * GU}px;
              `}
            />
            <TextCopy value={processText} />
          </li>
        </ol>
      </div>
    </Modal>
  )
}

export default PopupModal
