import React from 'react';
import { useGraphQLActions } from '../utilities/GraphQL';
import { useSubscription } from '@apollo/client';
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

  const { requestSubIDResult, CHORD_GEN_SUBSCRIPTION, generateChordsMutation } = useGraphQLActions();

  const updatePromptObject = (newPromptObject) => {
    setPromptObject(newPromptObject);
  };
  // The prompt the user builds
  const [promptObject, setPromptObject] = useState({ artist: "", genre: "", level: "", bars: "", key: "" });
  const [genSubscriptionID, setGenSubID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generationsHistory = useSelector(state => state.chordGenerator.generationsHistory);

  useEffect(() => {
    if (requestSubIDResult) {
      setGenSubID(requestSubIDResult.getRequestID)
    }
  }, [requestSubIDResult])

  const { } = useSubscription(CHORD_GEN_SUBSCRIPTION, {
    skip: !genSubscriptionID,
    variables: { generatedProgId: genSubscriptionID },
    onData: (data) => {
      const newProg = {
        ...data.data.data.generatedProg,
        'saved': false,
        'id': generationsHistory.length
      };
      dispatch({ type: "ADD", payload: { dataObj: newProg, entity: "newChordGeneration" } });
      dispatch({ type: "UPDATE", payload: { dataObj: newProg.id, entity: "changeProgressionDisplay" } });
      setIsLoading(false)
    }
  })

  const submit = async () => {
    try {
      setIsLoading(true)
      await generateChordsMutation({ variables: { promptObj: promptObject, requestId: genSubscriptionID } });
    } catch (e) {
      setIsLoading(false)
      console.error(e);
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Chord Progression Generator</Typography>
      <br />
      <PromptInputComp updatePromptObject={updatePromptObject} />
      <br />
      <LoadingButton size="small" onClick={submit} endIcon={<MusicNoteRoundedIcon />} loading={isLoading} loadingPosition="end" variant="contained" color="secondary" ><span>Generate</span></LoadingButton>
      <br /><br />
      {isLoading ?
        <>
          <Typography variant="body1" sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
            Were using the newest gpt-4-1106-preview model, to bring you the most creative and musical results.<br />
            Longer processing times then usual are to be expected (up to 40 seconds).
          </Typography>
          <br /><br />
          <img src={loadGif} style={{ maxWidth: '90%', maxHeight: '420px' }} alt="loadGif" />
        </>
        :
        <ProgressionComp />}
      <br /><br />

    </Box>
  );
}

export default StreamingOpenAIComponent;
