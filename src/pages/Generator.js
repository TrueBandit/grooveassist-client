import React, { useState } from 'react';
import GeneratorMain from '../generator/GeneratorMain';
import { Box, Stack, Fab } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GenerationList from '../generator/GenerationsHistoryList';
import GenerationsDrawer from '../generator/GenerationsHistoryDrawer';

function Generator() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <Fab color="secondary" size='small' sx={{
        position: 'absolute',
        top: 80,
        left: 16,
        display: { s: 'flex', md: 'none' }
      }} onClick={toggleDrawer}>
        <LibraryMusicIcon />
      </Fab>

      <Stack direction='row' justifyContent='space-between' alignItems='start'>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}><GenerationList /></Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}></Box>
        <GeneratorMain />
        <Box></Box>
      </Stack>

      <GenerationsDrawer open={drawerOpen} onClose={toggleDrawer} listComponent={<GenerationList />} />
    </Box>
  )
}

export default Generator;
