import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HubIcon from '@mui/icons-material/Hub';
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer({ open, onClose, navbarHeight }) {
    const navigate = useNavigate();
    const userName = sessionStorage.getItem('userName');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200, pt: `${navbarHeight}px` }}
            role="presentation"
            onClick={onClose} // Close the drawer
            onKeyDown={onClose} // Close the drawer on key down
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/generate')}>
                        <ListItemIcon>
                            <MusicNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Generate'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/community')}>
                        <ListItemIcon>
                            <Diversity1Icon />
                        </ListItemIcon>
                        <ListItemText primary={'Community'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {userName ? (
                <List>
                    <ListSubheader>{userName}</ListSubheader>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/myhub')}>
                            <ListItemIcon>
                                <HubIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Creative Hub'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/profile')}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Profile'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleLogout()}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItemButton>
                    </ListItem>
                </List>

            ) : (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/login')}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Login'} />
                        </ListItemButton>
                    </ListItem>
                </List>

            )}

        </Box>
    );

    return (
        <React.Fragment>
            <Drawer
                anchor='right' // Set the drawer to open from the right
                open={open} // Use the open prop
                onClose={onClose} // Use the onClose prop
            >
                {list('right')}
            </Drawer>
        </React.Fragment>
    );
}
