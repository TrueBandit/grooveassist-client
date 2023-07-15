import React from 'react'
import Generator_main from '../generator/Generator_main'
import { Typography , Box } from "@mui/material";

function Generator() {
  return (
    <Box sx={{marginTop: 4}}>
    <Typography variant="h6">Chord Progression Generator</Typography>
    <br/>
    <Generator_main/>
    </Box>
  )
}

export default Generator


