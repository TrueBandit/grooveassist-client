import React from 'react'
import ChordComp from './ChordComp';
import { Box, Grid, Typography } from '@mui/material';

function CoreProgressionComp(props) {
    return (
        <>
            <Box sx={{ margin: 'auto', paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", width: 'fit-content', backgroundColor: 'aliceblue', borderRadius: "5px", boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)" }}>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                    {
                        props.prog.chords.map((chord, index) => {
                            return <Grid item key={index}><ChordComp chord={chord} /></Grid>
                        })
                    }
                </Grid>
            </Box>
            <br />
            <Box sx={{ textAlign: 'left' }}>
                <u><Typography variant="subtitle1">Some Theory:</Typography></u>
                <Typography variant="body1">{props.prog.explanation}</Typography>
                <br />
                <u><Typography variant="subtitle1">Similar Song Example:</Typography></u>
                <Typography variant="body1">{props.prog.similar_song}</Typography>
            </Box>
            <br />
        </>



    )
}

export default CoreProgressionComp