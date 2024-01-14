import React, { useState } from 'react';
import { TextField, Autocomplete, Grid } from "@mui/material";

function PromptInputComp({ updatePromptObject }) {

    const [localPromptObject, setLocalPromptObject] = useState({ artist: "", genre: "", level: "", bars: "", key: "" });

    const updateLocalPromptObject = (field, value) => {
        let newObject = { ...localPromptObject };
        newObject[field] = value;
        setLocalPromptObject(newObject);
        updatePromptObject(newObject);
    }

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Grid item>
                <Autocomplete
                    disablePortal
                    options={artists}
                    size="small"
                    sx={{ width: 180 }}
                    renderInput={(params) => <TextField {...params} label="Artist" />}
                    onChange={(event, newValue) => { updateLocalPromptObject('artist', newValue) }}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    options={genres}
                    size="small"
                    sx={{ width: 180 }}
                    renderInput={(params) => <TextField {...params} label="Genre" />}
                    onChange={(event, newValue) => { updateLocalPromptObject('genre', newValue) }}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    options={levels}
                    size="small"
                    sx={{ width: 180 }}
                    renderInput={(params) => <TextField {...params} label="Level" />}
                    onChange={(event, newValue) => { updateLocalPromptObject('level', newValue) }}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    options={bars}
                    size="small"
                    sx={{ width: 80 }}
                    renderInput={(params) => <TextField {...params} label="Bars" />}
                    onChange={(event, newValue) => { updateLocalPromptObject('bars', newValue) }}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    options={keys}
                    size="small"
                    sx={{ width: 80 }}
                    renderInput={(params) => <TextField {...params} label="Key" />}
                    onChange={(event, newValue) => { updateLocalPromptObject('key', newValue) }}
                />
            </Grid>
        </Grid>
    )
}

const artists = ["The Beatles", "Elvis Presley", "Michael Jackson", "Elton John", "Queen", "Madonna", "Led Zeppelin"];
const bars = ["4", "6", "8", "10", "12"];
const genres = ["Rock", "Jazz", "Blues", "Hip-Hop", "RnB"];
const levels = ["Begginer", "Intermediate", "Advanced"];
const keys = ["A", "Ab", "B", "Bb", "C", "D", "Db", "E", "Eb", "F", "G", "Gb"]

export default PromptInputComp;
