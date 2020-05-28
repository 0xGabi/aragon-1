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
    const processes = await getProcessUpdate()
    return initialize(processes)
  })

call()

async function initialize(data) {
  return app.store(
    async (state, { event }) => {
      const nextState = { ...state }
      try {
        switch (event) {
          case 'Created':
            return { ...nextState, processes: await getProcessUpdate() }
          case 'Deactivated':
            return { ...nextState, processes: await getProcessUpdate() }
          case events.SYNC_STATUS_SYNCING:
            return { ...nextState, isSyncing: true }
          case events.SYNC_STATUS_SYNCED:
            return { ...nextState, isSyncing: false }
          default:
            return state
        }
      } catch (err) {
        console.log(err)
      }
    },
    {
      init: initializeState(data)
    }
  )
}

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState(processList) {
  return async cachedState => {
    return {
      ...cachedState,
      processes: processList
    }
  }
}

async function getProcessUpdate() {
  try {
    const size = await app.call('size').toPromise()
    if (size === 0) return []
    const newArray = new Array(parseInt(size))
      .fill(null)
      .map((_, i) => app.call('getProcess', i).toPromise())
      .map(data => data.catch(Error))
    const processes = (await Promise.all(newArray))
      .map((value, i) => ({ index: i, value }))
      .filter(result => !(result.value instanceof Error))
      .map(result => ({
        index: result.index,
        ...result.value
      }))
    return processes
  } catch (error) {
    console.log(error)
    return []
  }
}
