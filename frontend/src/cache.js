export const initialState = {
  initialCache: {
    site: '',
    kind: '',
    labels: [],
    comments: '',
  }
}

export const updateContent = (state, payload) => {
  return {
    ...state,
    initialCache: {
      ...state.initialCache,
      ...payload
    }
  }
}