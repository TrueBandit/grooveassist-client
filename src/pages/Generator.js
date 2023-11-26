import React, { useState } from 'react';
import GeneratorMain from '../generator/GeneratorMain';
import { Box, Stack, Fab } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GenerationList from '../generator/GenerationsHistoryList';
import GenerationsDrawer from '../generator/GenerationsHistoryDrawer';

function Generator() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <Fab color="secondary" size='small' sx={{
        position: 'absolute',
        top: 80,
        left: 16,
        display: { xs: 'flex', md: 'none' }
      }} onClick={toggleDrawer}>
        <LibraryMusicIcon />
      </Fab>

      <Stack direction='row' justifyContent='space-between' alignItems='start'>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}>
          <GenerationList />
        </Box>
        <Box sx={{ width: '100%', margin: '0 auto' }}>
          <GeneratorMain />
        </Box>
      </Stack>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <GenerationsDrawer open={drawerOpen} onClose={toggleDrawer} listComponent={<GenerationList closeDrawer={toggleDrawer} />} />
      </Box>
    </Box>
  );
}


export default Generator;