import * as React from 'react';
import logo from './design/logo.png'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container
} from "@mui/material";

function ResponsiveAppBar() {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          
            <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: "flex", gap: "10px", alignItems: "center" }}>
              <img src={logo} alt="Logo" height={40}/>
              <Typography variant="h5">Groove Assist</Typography>
            </Box>

            <Box sx={{alignItems: "center", gap: "20px", display: { xs: 'none', md: 'flex' }}}> 
              <Typography onClick={() => navigate('/generate')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Generate</Typography>
              <Typography onClick={() => navigate('/community')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Community</Typography>
              <Typography onClick={() => navigate('/login')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Login</Typography>
              <Typography>Dark Mode</Typography>
            </Box>

            <Box sx={{alignItems: "center", gap: "10px", display: { xs: 'flex', md: 'none' }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}><Typography textAlign="center" onClick={() => navigate('/generate')}>Generate</Typography></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><Typography textAlign="center" onClick={() => navigate('/community')}>Community</Typography></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><Typography textAlign="center" onClick={() => navigate('/login')}>Login</Typography></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><Typography textAlign="center">Dark Mode</Typography></MenuItem>
              </Menu>
            </Box>


        </Toolbar>
      </Container>
    </AppBar>

    
  );
}
export default ResponsiveAppBar;


