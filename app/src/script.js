import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

const retryEvery = async (callback, { initialRetryTimer = 1000, increaseFactor = 3, maxRetries = 3 } = {}) => {
  const sleepTime = async time => new Promise(resolve => setTimeout(resolve, time))
  let retryNum = 0
  const attempt = async (retryTimer = initialRetryTimer) => {
    try {
      return await callback()
    } catch (error) {
      if (retryNum === maxRetries) {
        throw error
      }

      ++retryNum
      const nextRetryTime = retryTimer * increaseFactor
      await sleepTime(nextRetryTime)
      return attempt(nextRetryTime)
    }
  }
  return attempt()
}

const call = () =>
  retryEvery(async () => {
    const size = await app.call('size').toPromise()
    if (parseInt(size) !== 0) {
      console.log(`size isn't zero`)
      const setArr = new Array(size).fill(null).map((_, i) => app.call('getProcess', i))
      const processList = await Promise.all(setArr)
      console.log(processList)
      return initialize({ size, processList })
    }
    console.log(`Can't get processList because size is ${size}`)
    return initialize({})
  })

call()

async function initialize(data) {
  return app.store(
    async (state, { blockNumber, event, returnValues, transactionHash }) => {
      console.log(`blockNumber: ${blockNumber}, event: ${event}, transactionHash: ${transactionHash}, `, 'returnValues: ', returnValues)
      const nextState = { ...state }
      try {
        switch (event) {
          case events.SYNC_STATUS_SYNCING:
            return { ...nextState, isSyncing: true }
          case events.SYNC_STATUS_SYNCED:
            return { ...nextState, isSyncing: false }
          case 'Created':
            return { ...nextState, processes: await getProcessUpdate() }
          case 'Desactivated':
            return { ...nextState, processes: await getProcessUpdate() }
          default:
            return state
        }
      } catch (err) {
        console.log(err)
      }
    },
    {
      init: initializeState()
    }
  )
}

function initializeState() {
  return async cachedState => {
    return {
      ...cachedState,
      processes: []
    }
  }
}

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

async function getProcessUpdate() {
  const size = await app.call('size').toPromise()
  const processes = []
  for (let i = 0; i < size; i++) {
    processes.push(await app.call('getProcess', i).toPromise())
  }
  return processes
}
