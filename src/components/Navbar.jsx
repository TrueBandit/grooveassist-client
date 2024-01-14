import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Container, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../design/logo.png';
import MainDrawer from '../components/MainMobileDrawer';
import { useDispatch, useSelector } from 'react-redux'

function ResponsiveAppBar() {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Ref for the navbar to measure its height
  const navbarRef = React.useRef(null);

  // State for managing the user menu and mobile drawer
  const [anchorElUserDesktop, setAnchorElUserDesktop] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Get the height of the navbar
  const getNavbarHeight = () => navbarRef.current ? navbarRef.current.clientHeight : 0;

  // Function to toggle the mobile drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Handlers for user menu
  const handleOpenUserMenuDesktop = (event) => setAnchorElUserDesktop(event.currentTarget);
  const handleCloseUserMenuDesktop = () => setAnchorElUserDesktop(null);

  // Logout handler
  const handleLogout = () => {
    dispatch({ type: "REMOVE", payload: { entity: "logout" } });
    handleCloseUserMenuDesktop();
    navigate('/');
  };

  return (
    <AppBar position="sticky" ref={navbarRef} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* Logo and title */}
          <Box onClick={() => { setDrawerOpen(false); navigate('/') }} sx={{ cursor: 'pointer', display: "flex", gap: "10px", alignItems: "center" }}>
            <img src={logo} alt="Logo" height={40} />
            <Typography variant="h5">Groove Assist</Typography>
          </Box>

          {/* Desktop navigation links */}
          <Box sx={{ alignItems: "center", gap: "20px", display: { xs: 'none', md: 'flex' } }}>
            <Typography onClick={() => navigate('/generate')} sx={navLinkStyle}>Generate</Typography>
            <Typography onClick={() => navigate('/community')} sx={navLinkStyle}>Community</Typography>

            {/* Conditional rendering based on user authentication */}
            {sessionStorage.getItem("userLoggedIn") ? (
              <Typography onClick={() => navigate('/hub')} sx={navLinkStyle}>Creative Hub</Typography>
            ) : (
              <Typography onClick={() => navigate('/login')} sx={navLinkStyle}>Login</Typography>
            )}

            {/* User menu for authenticated users */}
            {sessionStorage.getItem("userLoggedIn") && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpenUserMenuDesktop} sx={{ p: 0, color: 'white' }}>
                  <Typography sx={{ color: 'inherit' }}>{userData.firstName}</Typography>
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-user-desktop"
                  anchorEl={anchorElUserDesktop}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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

          {/* Mobile menu icon and drawer */}
          <Box sx={{ alignItems: "center", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MainDrawer open={drawerOpen} onClose={toggleDrawer(false)} navbarHeight={getNavbarHeight()} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Styling for navigation links
const navLinkStyle = { cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } };

export default ResponsiveAppBar;
