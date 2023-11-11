import React from 'react'
import GeneratorMain from '../generator/GeneratorMain'
import { Typography , Box } from "@mui/material";

function Generator() {
  return (
    <Box sx={{marginTop: 4}}>
    <Typography variant="h6">Chord Progression Generator</Typography>
    <br/>
    <GeneratorMain/>
    </Box>
  )
}

export default Generator


