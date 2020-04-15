let initialState = {
  songs: [],
  currentIndex: 0,
  deletedIndex: -1,
  curMobileView:0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return {
        ...state,
        songs: state.songs.filter(song => song.id == action.payload.id).length > 0
            ? state.songs : [...state.songs, action.payload]

      }
    case 'SET_INDEX' :
      return {
        ...state,
        currentIndex: action.payload
      }
    case 'DELETE_SONG':
      return {
        ...state,
        songs: [
          ...state.songs.slice(0, action.payload),
          ...state.songs.slice(action.payload + 1)
        ],
        currentIndex: action.payload >= state.currentIndex && state.currentIndex
        !== state.songs.length - 1 ? state.currentIndex : state.currentIndex
        !== 0 ? state.currentIndex - 1 : state.currentIndex,
        deletedIndex: action.payload

      }
    default:
      return state
  }
}

export default reducers
