import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Container
} from "@mui/material";

import logo from '../design/logo.png'

function ResponsiveAppBar() {

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  });

  const LogoBox = styled(Box)(({ theme }) => ({ 
    display: "flex", 
    gap: "10px", 
    alignItems: "center"
  }));

  const DesktopMenu = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  }));

  const MobileMenu = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <StyledToolbar>
          <LogoBox>
            <img src={logo} alt="Logo" height={40}/>
            <Typography variant="h5">Groove Assist</Typography>
          </LogoBox>
          <DesktopMenu>
            <Typography>Generate</Typography>
            <Typography>Community</Typography>
            <Typography>Login</Typography>
            <Typography>Dark Mode</Typography>
          </DesktopMenu>
          <MobileMenu>
            <MenuIcon/>
          </MobileMenu>
        </StyledToolbar>
      </Container>
    </AppBar>

    
  );
}
export default ResponsiveAppBar;


