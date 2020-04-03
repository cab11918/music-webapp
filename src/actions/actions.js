export const addSong = (song) => (
    {
      type: 'ADD_SONG',
      payload: song

    }
)

export const setIndex = (index) => (
    {
      type: 'SET_INDEX',
      payload: index

    }
)

export const deleteSong = (index) => (
    {
      type: 'DELETE_SONG',
      payload: index

    }
)


