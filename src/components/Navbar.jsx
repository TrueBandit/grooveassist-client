import * as React from 'react';
import logo from '../design/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, AppBar, Box, Toolbar, Typography, Container, IconButton } from "@mui/material";
import Divider from '@mui/material/Divider';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName');

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUserDesktop, setAnchorElUserDesktop] = React.useState(null);
  const [anchorElUserMobile, setAnchorElUserMobile] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenuDesktop = (event) => {
    setAnchorElUserDesktop(event.currentTarget);
  };
  const handleCloseUserMenuDesktop = () => {
    setAnchorElUserDesktop(null);
  };
  const handleOpenUserMenuMobile = (event) => {
    setAnchorElUserMobile(event.currentTarget);
  };
  const handleCloseUserMenuMobile = () => {
    setAnchorElUserMobile(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    handleCloseUserMenuDesktop();
    handleCloseUserMenuMobile();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: "flex", gap: "10px", alignItems: "center" }}>
            <img src={logo} alt="Logo" height={40} />
            <Typography variant="h5">Groove Assist</Typography>
          </Box>

          <Box sx={{ alignItems: "center", gap: "20px", display: { xs: 'none', md: 'flex' } }}>
            <Typography onClick={() => navigate('/generate')}
              sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Generate</Typography>
            <Typography onClick={() => navigate('/community')}
              sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Community</Typography>
            {userName ? (
              <Typography onClick={() => navigate('/myhub')}
                sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>My Creative Hub</Typography>
            ) : (<Typography onClick={() => navigate('/login')}
                  sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Login</Typography>)}
            {userName && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpenUserMenuDesktop} sx={{ p: 0, color: 'white' }}>
                  <Typography sx={{ color: 'inherit' }}>{userName}</Typography>
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-user-desktop"
                  anchorEl={anchorElUserDesktop}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUserDesktop)}
                  onClose={handleCloseUserMenuDesktop}
                >
                  <MenuItem onClick={() => { handleCloseUserMenuDesktop(); navigate('/profile'); }}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>

          <Box sx={{ alignItems: "center", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/generate'); }}>
                <Typography textAlign="center">Generate</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/community'); }}>
                <Typography textAlign="center">Community</Typography>
              </MenuItem>
              {userName ? (
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/myhub'); }}>
                  <Typography textAlign="center">My Creative Hub</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/login'); }}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
            {userName && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar-user-mobile"
                aria-haspopup="true"
                onClick={handleOpenUserMenuMobile}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar-user-mobile"
              anchorEl={anchorElUserMobile}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUserMobile)}
              onClose={handleCloseUserMenuMobile}
            >
              <MenuItem onClick={() => { handleCloseUserMenuMobile(); navigate('/profile'); }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
