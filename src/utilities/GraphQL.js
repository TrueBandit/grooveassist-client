import { gql, useMutation } from '@apollo/client';

export const useGraphQLActions = () => {
  
  const GENERATE_CHORDS = gql`
  mutation ($promptObj: PromptObjectInput) {
  generateChords(promptObj: $promptObj) {
    chords {
      bars,
      chord
    }
    exp,
    song
  }
}`
  
  const [generateChordsMutation, generateChordsResult] = useMutation(GENERATE_CHORDS)

  return {
    generateChordsMutation,
    generateChordsResult
  }
};