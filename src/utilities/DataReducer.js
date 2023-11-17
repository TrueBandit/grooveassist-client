const DataReducer = (state = { userData: {}, generationsHistory: [] }, action) => {
  switch (action.type) {

    case "ADD":
      switch (action.payload.entity) {
        case "login":
          return { ...state, userData: action.payload.dataObj }

        case "chord_generation":
          return { ...state, generationsHistory: [...state.generationsHistory, action.payload.dataObj] }

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

    default:
      return state;
  }
}

export default DataReducer