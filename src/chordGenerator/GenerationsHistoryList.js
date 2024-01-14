import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

export default function GenerationList({ closeDrawer }) {

    const storeData = useSelector(state => state)
    const dispatch = useDispatch();

    const [generationsList, setGenerationsList] = useState([])

    useEffect(() => {
        setGenerationsList(storeData.chordGenerator.generationsHistory)
    }, [storeData.chordGenerator.generationsHistory])

    const select = async (listSelection) => {
        dispatch({ type: "UPDATE", payload: { dataObj: listSelection, entity: "changeProgressionDisplay" } });
        if (closeDrawer) {
            closeDrawer();
        }
    };

    return (
        <Box sx={{
            bgcolor: '#DFEEFF',
            height: '100vh',
            width: '300px',
        }}>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'transparent',
                }}
                dense
                subheader={
                    <ListSubheader sx={{
                        bgcolor: '#3390FF',
                        color: 'white',
                        textAlign: 'left',
                    }}>
                        Progressions History
                    </ListSubheader>
                }
            >
                {
                    generationsList.map((generation, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton onClick={() => select(generation.id)}>
                                <ListItemText primary={generation.brief_description} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );
}
