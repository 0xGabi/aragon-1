import { Modal, textStyle, Button, IconDownload, GU } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React from 'react'
import yaml from 'yaml-js'

import { getAllVersions } from '../utils/APM'
import { encodeEventSignature } from '../utils/Web3'
import ProcessTemplate from '../utils/processTemplate'

function PopupModal({ displayModal, closeModal, processData }) {
  const { installedApps } = useAragonApi()

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
    const eventAbi = await getEventAbi()
    const endpoint = 'ws://docker.for.mac.localhost:8545' // TODO: remove localhost endpoint
    const encode = await encodeEventSignature(eventAbi)
    const temp = ProcessTemplate(processData, eventAbi, encode, endpoint)
    const createYaml = yaml.dump(temp)
    const element = document.createElement('a')
    const file = new Blob([createYaml], { type: 'application/x-yaml' })
    element.href = URL.createObjectURL(file)
    element.download = 'process.yml'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

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
            <strong>Download the process file</strong>
            <div
              css={`
                width: 100%;
                display: flex;
                justify-content: center;
                padding: ${1 * GU}px ${1 * GU}px;
              `}
            >
              <Button label='Download file' icon={<IconDownload />} onClick={downloadFile} />
            </div>
          </li>
          <li>
            Run the command to deploy:
            <div>
              <code>npx mesg-cli process:create "$(npx mesg-cli process:compile PATH_TO_THE_PROCESS_FILE)"</code>
            </div>
          </li>
        </ol>
      </div>
    </Modal>
  )
}

export default PopupModal
