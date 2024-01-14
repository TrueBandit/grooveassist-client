import React from 'react'
import { Box } from "@mui/material";

function ChordComp(props) {
  return (
    <Box sx={{ pt: '10px', margin: 'auto', width: '65px', height: '50px', border: 'solid 1px', backgroundColor: 'orange', borderRadius: "20px" }}>
      {props.chord.chord_name}<br />({props.chord.bars})</Box>
  )
}

export default ChordComp