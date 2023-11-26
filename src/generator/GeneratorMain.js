import React from 'react';
import { useGraphQLActions } from '../utilities/GraphQL';
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import ProgressionComp from './ProgressionComp';
import PromptInputComp from './PromptInputComp';
import loadGif from '../design/composingGif.gif';
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'

function StreamingOpenAIComponent() {

  const dispatch = useDispatch();

  const { generateChordsMutation, generateChordsResult } = useGraphQLActions();

  const updatePromptObject = (newPromptObject) => {
    setPromptObject(newPromptObject);
  };
  // The prompt the user builds
  const [promptObject, setPromptObject] = useState({ artist: "", genre: "", level: "", bars: "", key: "" });

  const generationsHistory = useSelector(state => state.chordGenerator.generationsHistory);

  useEffect(() => {
    if (generateChordsResult.data && generateChordsResult.data.generateChords) {
      const newProg = {
        ...generateChordsResult.data.generateChords,
        'saved': false,
        'id': generationsHistory.length
      };
      dispatch({ type: "ADD", payload: { dataObj: newProg, entity: "newChordGeneration" } });
      dispatch({ type: "UPDATE", payload: { dataObj: newProg.id, entity: "changeProgressionDisplay" } });
    }
  }, [generateChordsResult.data]);

  const submit = async () => {
    try {
      await generateChordsMutation({ variables: { promptObj: promptObject } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Chord Progression Generator</Typography>
      <br />
      <PromptInputComp updatePromptObject={updatePromptObject} />
      <br />
      <LoadingButton size="small" onClick={submit} endIcon={<MusicNoteRoundedIcon />} loading={generateChordsResult.loading} loadingPosition="end" variant="contained" color="secondary" ><span>Generate</span></LoadingButton>
      <br /><br />
      {generateChordsResult.loading ?
        <img src={loadGif} style={{ maxWidth: '85%', maxHeight: '400px' }} alt="loadGif" /> :
        <ProgressionComp />}
      <br /><br />

    </Box>
  );
}

export default StreamingOpenAIComponent;
