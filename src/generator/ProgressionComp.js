import React from 'react'
import ChordComp from './ChordComp'
import { Box, Grid } from "@mui/material";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function ProgressionComp() {

  const storeData = useSelector(state => state)

  const [displayedSong, setDisplayedSong] = useState({})

  useEffect(() => {
    setDisplayedSong(storeData.chordGenerator.currentlySelectedSong)
  }, [storeData.chordGenerator.currentlySelectedSong])

  return (
    <div>
      {displayedSong.chords && displayedSong.chords.length > 0 && <>
        <Box sx={{ margin: 'auto', paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px", width: "80%", backgroundColor: 'azure', borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
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
          {displayedSong.exp}
          <br /><br />
          {displayedSong.song}
        </Box></>}
    </div>
  )
}

export default ProgressionComp