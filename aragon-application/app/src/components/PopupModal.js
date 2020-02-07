import React from 'react'
import yaml from 'yaml-js'

import { Modal, textStyle, Button, IconDownload, GU } from '@aragon/ui'

function PopupModal({ displayModal, closeModal }) {
  const downloadFile = () => {
    const data = {} // get from smart contract
    const createYaml = yaml.dump({
      name: 'appImplementation/0',
      steps: [
        {
          type: 'trigger',
          eventKey: data.eventName,
          instance: {
            src: 'https://github.com/mesg-foundation/service-ethereum-contract',
            env: [`PROVIDER_ENDPOINT=${aragonEndpoint}`, `CONTRACT_ADDRESS=${appImplementation}`, `CONTRACT_ABI=${abi}`]
          }
        },
        {
          type: 'task',
          instance: {
            src: 'https://github.com/mesg-foundation/service-webhook'
          },
          inputs: {
            url: data.url,
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
    element.download = 'myFile.yml'
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
