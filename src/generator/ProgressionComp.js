import React from 'react'
import ChordComp from './ChordComp'
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux'

function ProgressionComp() {

  const dispatch = useDispatch();

  const storeData = useSelector(state => state)

  const [displayedSong, setDisplayedSong] = useState({})

  useEffect(() => {
    if (storeData.chordGenerator.displayedProgID || storeData.chordGenerator.displayedProgID === 0) {
      const updatedDisplayedSong = storeData.chordGenerator.generationsHistory.find(
        prog => prog.id === storeData.chordGenerator.displayedProgID
      );

      if (updatedDisplayedSong) {
        setDisplayedSong(updatedDisplayedSong);
      }
    }
  }, [storeData.chordGenerator.displayedProgID, storeData.chordGenerator.generationsHistory]);


  const saveSong = () => {
    if (sessionStorage.getItem("userLoggedIn")) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: displayedSong.id,
          newSavedStatus: !displayedSong.saved,
          entity: "changeNewProgSave"
        }
      });
    } else {
      alert("You must be logged in to save a progression.")
    }
  };

  return (
    <div>
      {displayedSong.chords && displayedSong.chords.length > 0 && <>
        <Box sx={{ margin: 'auto', paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px", width: "80%", backgroundColor: 'azure', borderRadius: "0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <Box sx={{ margin: 'auto', paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", width: 'fit-content', backgroundColor: 'aliceblue', borderRadius: "5px", boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)" }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              {
                displayedSong.chords.map((chord, index) => {
                  return <Grid item key={index}><ChordComp chord={chord} /></Grid>
                })
              }
            </Grid>
          </Box>
          <br />
          <Box sx={{ textAlign: 'left' }}>
            <u><Typography variant="subtitle1">Some Theory:</Typography></u>
            <Typography variant="body1">{displayedSong.explanation}</Typography>
            <br />
            <u><Typography variant="subtitle1">Similar Song Example:</Typography></u>
            <Typography variant="body1">{displayedSong.similar_song}</Typography>
          </Box>
          <br />
          <Divider />
          <Checkbox inputProps={{ 'aria-label': 'save progression' }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={saveSong} checked={displayedSong.saved} />
        </Box></>}
    </div>
  )
}

export default ProgressionComp