import React from 'react'
import GenComp from '../generator/Generator_main'
import { Typography } from "@mui/material";

function Generator() {
  return (
    <div>
    <Typography variant="h6">Chord Progression Generator</Typography>
    <br/>
    <GenComp/>
    </div>
  )
}

export default Generator


