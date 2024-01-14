/*import { gql, useMutation } from '@apollo/client';

export const useGraphQLActions = () => {
  const GET_REQUEST_ID = gql`
  mutation {
    getRequestID
  }`
  
  const GENERATE_CHORDS = gql`
  mutation ($promptObj: PromptObjectInput, $requestId: String) {
    generateResponse(promptObj: $promptObj, requestId: $requestId)
  }`
  
  const SUBSCRIBE_CHORDS_STREAM = gql`
  subscription ($id: String){
    responseStream(id: $id)
  }`

  const [generateResponseMutation, generateResponseResult] = useMutation(GENERATE_CHORDS)
  const [requestIDMutation, requestIDResult] = useMutation(GET_REQUEST_ID)

  return {
    generateResponseMutation,
    generateResponseResult,
    requestIDMutation,
    requestIDResult,
    SUBSCRIBE_CHORDS_STREAM,
  }
};
*/