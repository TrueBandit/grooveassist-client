const DataReducer = (state = {
  userData: {},
  chordGenerator: {
    generationsHistory: [],
    currentlySelectedSong: {}
  }
},
  action) => {
  switch (action.type) {

    case "ADD":
      switch (action.payload.entity) {
        case "login":
          return { ...state, userData: action.payload.dataObj }
        case "newChordGeneration":
          return {
            ...state,
            chordGenerator: {
              ...state.chordGenerator,
              generationsHistory: [...state.chordGenerator.generationsHistory, action.payload.dataObj]
            }
          }

        default:
          return state;
      }

    case "REMOVE":
      switch (action.payload.entity) {
        case "logout":
          return { ...state, userData: {} }

        default:
          return state;
      }

    case "UPDATE":
      switch (action.payload.entity) {
        case "changeProgressionDisplay":
          return {
            ...state,
            chordGenerator: {
              ...state.chordGenerator,
              currentlySelectedSong: action.payload.dataObj
            }
          }

        default:
          return state;
      }

    default:
      return state;
  }
}

export default DataReducer

