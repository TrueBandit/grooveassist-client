import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client';

export const useGraphQLActions = () => {

  const REQUEST_SUBSCRIPTION_REQUEST_ID = gql`
query {
  getRequestID
}`

  const GENERATE_CHORDS = gql`
  mutation($promptObj: PromptObjectInput, $requestId: String) {
  generateChords(promptObj: $promptObj, requestID: $requestId)
}`

  const LOG_USER = gql`
query($userLoginObject: UserLoginInput) {
  login(userLoginObject: $userLoginObject) {
    token
    user {
      _id,
      email,
      fname,
      lname,
      password,
      type
    }
  }
}`

  const ADD_USER = gql`
mutation($newUser: UserInput) {
  addUser(newUser: $newUser) {
    user {
      _id,
      email,
      fname,
      lname,
      password,
      type
    }
    token
  }
}
`

  const CHORD_GEN_SUBSCRIPTION = gql`
  subscription ($generatedProgId: String) {
  generatedProg(id: $generatedProgId) {
    chords {
      chord_name,
      bars,
      notes
    },
    explanation,
    similar_song,
    brief_description
  }
}
  `
  const ADD_NEW_PROGRESSION = gql`
  mutation($progObj: ProgressionObjectInput, $token: String) {
  saveNewProgression(ProgObj: $progObj, token: $token) {
    _id,
    userID,
    creationTime {
      day,
      time
    },
    prog {
      chords {
        chord_name,
        bars,
        notes
      },
      explanation,
      similar_song,
      brief_description
    }
  }
}
  `

  const GET_USER_PROGRESSIONS = gql`
query($token: String) {
  getUserProgressions(token: $token) {
    _id,
    userID,
    creationTime {
      day,
      time
    },
    prog {
      explanation,
      similar_song,
      brief_description,
      chords {
        chord_name,
        bars,
        notes
      }
    }
  }
}`


  const { data: requestSubIDResult } = useQuery(REQUEST_SUBSCRIPTION_REQUEST_ID)
  const [generateChordsMutation, generateChordsResult] = useMutation(GENERATE_CHORDS)
  const [logUser, logUserResult] = useLazyQuery(LOG_USER)
  const [addUser, addUserResult] = useMutation(ADD_USER)
  const [addNewProgression, addNewProgressionResult] = useMutation(ADD_NEW_PROGRESSION)
  const [getUserProgs, getUserProgsResult] = useLazyQuery(GET_USER_PROGRESSIONS)
  const { data: getUserProgsResult2 } = useQuery(GET_USER_PROGRESSIONS)

  return {
    requestSubIDResult,
    CHORD_GEN_SUBSCRIPTION,
    generateChordsMutation, generateChordsResult,
    logUser, logUserResult,
    addUser, addUserResult,
    addNewProgression, addNewProgressionResult,
    getUserProgs, getUserProgsResult,
    getUserProgsResult2
  }
};