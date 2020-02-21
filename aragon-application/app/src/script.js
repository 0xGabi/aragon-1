import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

app.store(
  async (state, { event }) => {
    const nextState = { ...state }
    try {
      switch (event) {

        case events.SYNC_STATUS_SYNCING:
          return { ...nextState, isSyncing: true }
        case events.SYNC_STATUS_SYNCED:
          return { ...nextState, isSyncing: false }
        case 'Created':
        case 'Disactivated':
          return { ...nextState, processes: await getProcess() }
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

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState() {
  return async cachedState => {
    return {
      ...cachedState,
      processes: []
    }
  }
}

async function getProcess() {
  const size = await app.call('size').toPromise()
  const processes = []
  for (let i = 0; i < size; i++) {
    processes.push(await app.call('getProcess', i).toPromise())
  }
  return processes
}
