import React from 'react'
import Generator_main from '../generator/Generator_main'
import { Typography } from "@mui/material";

function Generator() {
  return (
    <div>
    <Typography variant="h6">Chord Progression Generator</Typography>
    <br/>
    <Generator_main/>
    </div>
  )
}

export default Generator


