import { gql, useMutation, useLazyQuery } from '@apollo/client';

export const useGraphQLActions = () => {

  const GENERATE_CHORDS = gql`
  mutation ($promptObj: PromptObjectInput) {
  generateChords(promptObj: $promptObj) {
    chords {
      bars,
      chord_name,
      notes
    },
    explanation,
    similar_song,
    brief_description
  }
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
}`

  const [generateChordsMutation, generateChordsResult] = useMutation(GENERATE_CHORDS)
  const [logUser, logUserResult] = useLazyQuery(LOG_USER)
  const [addUser, addUserResult] = useMutation(ADD_USER)

  return {
    generateChordsMutation, generateChordsResult,
    logUser, logUserResult,
    addUser, addUserResult
  }
};