import React from 'react';
import { useGraphQLActions } from '../utilities/GraphQL';
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import ProgressionComp from './ProgressionComp';
import PromptInputComp from './PromptInputComp';
import loadGif from '../design/composingGif.gif';
import { Box, Typography } from "@mui/material";
import { useDispatch } from 'react-redux'

function StreamingOpenAIComponent() {

  const dispatch = useDispatch();

  const { generateChordsMutation, generateChordsResult } = useGraphQLActions();

  const updatePromptObject = (newPromptObject) => {
    setPromptObject(newPromptObject);
  };

  //the prompt the user builds- sent to server
  const [promptObject, setPromptObject] = useState({ artist: "", genre: "", level: "", bars: "", key: "" });
  //while response is streaming from the server, loading will be true
  const [streaming, setStreaming] = useState(false);

  const [chordsArray, setChordsArray] = useState([])
  const [chordsDescription, setChordsDescription] = useState("");
  const [similarSong, setSimilarSong] = useState("");


  // Listening to the mutation response when the server finished to stream
  useEffect(() => {
    if (generateChordsResult.data) {
      setChordsArray(generateChordsResult.data.generateChords.chords)
      setChordsDescription(generateChordsResult.data.generateChords.exp)
      setSimilarSong(generateChordsResult.data.generateChords.song)
      dispatch({ type: "ADD", payload: { dataObj: generateChordsResult.data, entity: "chord_generation" } })
      setStreaming(false)
    }
  }, [generateChordsResult.data]);

  const submit = async () => {
    setStreaming(true)
    try {
      await generateChordsMutation({ variables: { promptObj: promptObject } });
    } catch (e) {
      //console.error(e);
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Chord Progression Generator</Typography>
      <br />
      <PromptInputComp updatePromptObject={updatePromptObject} />
      <br />
      <LoadingButton size="small" onClick={submit} endIcon={<MusicNoteRoundedIcon />} loading={streaming} loadingPosition="end" variant="contained" color="secondary" ><span>Generate</span></LoadingButton>
      <br /><br />
      {generateChordsResult.loading ?
        <img src={loadGif} style={{ maxWidth: '85%', maxHeight: '400px' }} alt="loadGif" /> :
        <ProgressionComp chords={chordsArray} description={chordsDescription} similarsong={similarSong} />}
      <br /><br />

    </Box>
  );
}

export default StreamingOpenAIComponent;



