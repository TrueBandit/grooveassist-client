const DataReducer = (state = {
  userData: {},
  chordGenerator: {
    generationsHistory: [],
    displayedProgID: null
  }
}, action) => {
  switch (action.type) {

    case "ADD":
      switch (action.payload.entity) {
        // Handle login action
        case "login":
          sessionStorage["userLoggedIn"] = true;
          return { ...state, userData: action.payload.dataObj };

        // Add a new chord generation to the history
        case "newChordGeneration":
          return {
            ...state,
            chordGenerator: {
              ...state.chordGenerator,
              generationsHistory: [...state.chordGenerator.generationsHistory, action.payload.dataObj]
            }
          };

        default:
          return state;
      }

    case "REMOVE":
      switch (action.payload.entity) {
        // Handle logout action
        case "logout":
          sessionStorage.removeItem("userLoggedIn");
          return { ...state, userData: {} };

        default:
          return state;
      }

    case "UPDATE":
      switch (action.payload.entity) {
        // Change the currently displayed progression
        case "changeProgressionDisplay":
          return {
            ...state,
            chordGenerator: {
              ...state.chordGenerator,
              displayedProgID: action.payload.dataObj
            }
          };

        // Toggle the 'saved' status of a progression
        case "changeNewProgSave":
          // Find the index of the progression to update
          const index = state.chordGenerator.generationsHistory.findIndex(prog => prog.id === action.payload.id);

          if (index !== -1) {
            // Create a new array with the updated 'saved' status
            let updatedGenerationsHistory = [...state.chordGenerator.generationsHistory];
            updatedGenerationsHistory[index] = {
              ...updatedGenerationsHistory[index],
              saved: action.payload.newSavedStatus
            };

            // Return the updated state
            return {
              ...state,
              chordGenerator: {
                ...state.chordGenerator,
                generationsHistory: updatedGenerationsHistory
              }
            };
          }
          return state;

        default:
          return state;
      }

    default:
      return state;
  }
}

export default DataReducer;
