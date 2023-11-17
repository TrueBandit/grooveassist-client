import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function GenerationList() {

    return (
        <List
            sx={{ width: 150, bgcolor: 'background.paper' }}
            component="nav"
            dense={true}
            subheader={
                <ListSubheader component="div">
                    Generation History
                </ListSubheader>
            }
        >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item1" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item2" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item3" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item4" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item5" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Item6" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}
