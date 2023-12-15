import React from 'react'
import { Typography, Box } from "@mui/material";
import construction from '../design/construction.png';

function Community() {
  return (
    <Box sx={{ marginTop: 4 }}>
      {/*<Typography variant="h6">Community</Typography>*/}
      <img src={construction} style={{ maxWidth: '100%', maxHeight: '400px' }} alt="construction" />
    </Box>
  )
}

export default Community