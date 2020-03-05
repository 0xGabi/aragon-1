function appStateReducer(state) {
  if (state === null) {
    return { processes: [], isSyncing: true }
  }
  return state
}

export default appStateReducer
