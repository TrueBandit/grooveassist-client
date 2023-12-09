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



  const { data: requestSubIDResult } = useQuery(REQUEST_SUBSCRIPTION_REQUEST_ID)
  const [generateChordsMutation, generateChordsResult] = useMutation(GENERATE_CHORDS)
  const [logUser, logUserResult] = useLazyQuery(LOG_USER)
  const [addUser, addUserResult] = useMutation(ADD_USER)

  return {
    requestSubIDResult, CHORD_GEN_SUBSCRIPTION,
    generateChordsMutation, generateChordsResult,
    logUser, logUserResult,
    addUser, addUserResult
  }
};