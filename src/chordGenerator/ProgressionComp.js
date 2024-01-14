import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Divider, Checkbox, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CoreProgressionComp from './CoreProgressionComp';
import { useGraphQLActions } from '../utilities/GraphQL';

function ProgressionComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector(state => state);

  // Actions from GraphQL hook
  const { addNewProgression, addNewProgressionResult } = useGraphQLActions();

  // Local state for managing song and dialog
  const [displayedSong, setDisplayedSong] = useState({});
  const [progObj, setProgObj] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  // Open or close the login dialog
  const toggleLoginDialog = (isOpen) => () => setDialogOpen(isOpen);

  // Effect to set song data from store
  useEffect(() => {
    const displayedProgID = storeData.chordGenerator.displayedProgID;
    if (displayedProgID || displayedProgID === 0) {
      const updatedDisplayedSong = storeData.chordGenerator.generationsHistory.find(prog => prog.id === displayedProgID);
      if (updatedDisplayedSong) {
        setDisplayedSong(updatedDisplayedSong);
        setProgObj({
          // Object structure to be sent to the backend
          chords: updatedDisplayedSong.chords.map(chord => ({
            chord_name: chord.chord_name,
            notes: chord.notes,
            bars: chord.bars
          })),
          explanation: updatedDisplayedSong.explanation,
          similar_song: updatedDisplayedSong.similar_song,
          brief_description: updatedDisplayedSong.brief_description,

        });
      }
    }
  }, [storeData.chordGenerator.displayedProgID, storeData.chordGenerator.generationsHistory]);

  // Save song function
  const saveSong = () => {
    if (sessionStorage.getItem('userLoggedIn')) {
      if (!displayedSong.saved) {
        dispatch({
          type: 'UPDATE',
          payload: {
            id: displayedSong.id,
            newSavedStatus: !displayedSong.saved,
            entity: 'changeNewProgSave'
          }
        });
        try {
          addNewProgression({ variables: { progObj: progObj, token: storeData.userData.token } });
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      toggleLoginDialog(true)();
    }
  };

  // Effect to dispatch add user progression
  useEffect(() => {
    if (addNewProgressionResult.data) {
      dispatch({
        type: 'ADD',
        payload: {
          entity: 'addUserProgression',
          dataObj: addNewProgressionResult.data.saveNewProgression
        }
      });

    }
  }, [addNewProgressionResult.data]);

  return (
    <div>
      {displayedSong.chords && displayedSong.chords.length > 0 && <>
        <Box sx={{ margin: 'auto', paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px", width: "80%", backgroundColor: 'azure', borderRadius: "0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <CoreProgressionComp prog={displayedSong} />
          <Divider />
          <Checkbox inputProps={{ 'aria-label': 'save progression' }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={saveSong} checked={displayedSong.saved} />
          {displayedSong.saved ? <Typography variant="body1">Saved!</Typography> : <Typography variant="body1">Save this progression</Typography>}
        </Box></>}

      <Dialog open={dialogOpen} onClose={toggleLoginDialog(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        {/* Dialog content */}
        <DialogTitle id='alert-dialog-title'>{'Please log in to save a progression'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Ready to capture your AI-generated masterpiece? Let's make it official! Sign in or join our creative community now to save your progression and explore more wonders!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { toggleLoginDialog(false)(); navigate('/login'); }} autoFocus>Log In</Button>
          <Button onClick={() => { toggleLoginDialog(false)(); navigate('/signup'); }}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProgressionComp;
