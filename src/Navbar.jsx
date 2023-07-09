import * as React from 'react';
import logo from './design/logo.png'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography,
  Container
} from "@mui/material";

function ResponsiveAppBar() {

  const navigate = useNavigate();

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
          
            <LogoBox onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              <img src={logo} alt="Logo" height={40}/>
              <Typography variant="h5">Groove Assist</Typography>
            </LogoBox>

            <DesktopMenu> 
              <Typography onClick={() => navigate('/generate')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Generate</Typography>
              <Typography onClick={() => navigate('/community')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Community</Typography>
              <Typography onClick={() => navigate('/login')} 
                sx={{ cursor: 'pointer' , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Login</Typography>
              <Typography>Dark Mode</Typography>
            </DesktopMenu>

            <MobileMenu>
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu">
              <MenuIcon />
              </IconButton>
            </MobileMenu>


        </StyledToolbar>
      </Container>
    </AppBar>

    
  );
}
export default ResponsiveAppBar;


