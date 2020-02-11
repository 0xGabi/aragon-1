import { Modal, textStyle, Button, IconDownload, GU } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import React from 'react'
import yaml from 'yaml-js'

import { getAllVersions } from '../utils/APM'

function PopupModal({ displayModal, closeModal, processData }) {
  const { installedApps } = useAragonApi()

  const getAbi = async () => {
    if (processData !== null) {
      const installedApp = installedApps.find(app => app.appAddress.toLowerCase() === processData.appAddress.toLowerCase())
      const version = await getAllVersions(installedApp.appId, installedApp.appImplementationAddress)
      if (!version) {
        throw new Error(`cannot find version for ${app.appImplementationAddress}`)
      }
      const abiEvent = version.abi.find(abi => abi.name === processData.eventName)
      return abiEvent
    }
  }

  const downloadFile = async () => {
    const abiEvent = await getAbi()
    const endpoint = 'ws://docker.for.mac.localhost:8545' // TODO: remove localhost endpoint
    const createYaml = yaml.dump({
      name: `${processData.appAddress}/${processData.index}`,
      steps: [
        {
          type: 'trigger',
          instance: {
            src: 'https://github.com/mesg-foundation/service-ethereum-contract',
            env: [`PROVIDER_ENDPOINT=${endpoint}`, `CONTRACT_ADDRESS=${processData.appAddress}`, `CONTRACT_ABI=[${JSON.stringify(abiEvent)}]`]
          },
          eventKey: 'event'
        },
        {
          type: 'filter',
          conditions: {
            name: processData.eventName
          }
        },
        {
          type: 'task',
          instance: {
            src: 'https://github.com/mesg-foundation/service-webhook'
          },
          taskKey: 'call',
          inputs: {
            url: processData.url,
            data: {
              name: { key: 'name' },
              blockHash: { key: 'blockHash' },
              blockNumber: { key: 'blockNumber' },
              transactionHash: { key: 'transactionHash' },
              transactionIndex: { key: 'transactionIndex' },
              data: { key: 'data' }
            }
          }
        }
      ]
    })
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
