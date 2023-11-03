import * as React from 'react';
import logo from '../design/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, AppBar, Box, Toolbar, Typography, Container, IconButton } from "@mui/material";

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
                // getContentAnchorEl={null}
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
                <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/generate')}}><Typography textAlign="center">Generate</Typography></MenuItem>
                <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/community')}}><Typography textAlign="center">Community</Typography></MenuItem>
                <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/login')}}><Typography textAlign="center">Login</Typography></MenuItem>
              </Menu>
            </Box>


        </Toolbar>
      </Container>
    </AppBar>

    
  );
}
export default ResponsiveAppBar;


