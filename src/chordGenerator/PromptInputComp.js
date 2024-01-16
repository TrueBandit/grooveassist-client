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

const artists = [
    "Adele",
    "Amy Winehouse",
    "Ariana Grande",
    "Beyoncé",
    "Billie Eilish",
    "Bob Dylan",
    "Bruno Mars",
    "David Bowie",
    "Ed Sheeran",
    "Elton John",
    "Elvis Presley",
    "Frank Sinatra",
    "Led Zeppelin",
    "Madonna",
    "Michael Jackson",
    "Nirvana",
    "Prince",
    "Queen",
    "Steely Dan",
    "Taylor Swift",
    "The Beatles",
    "The Rolling Stones",
    "U2"
];
const genres = [
    "Blues",
    "Classical",
    "Country",
    "Disco",
    "Electronic",
    "Folk",
    "Funk",
    "Gospel",
    "Hip-Hop",
    "Indie",
    "Jazz",
    "Latin",
    "Metal",
    "Pop",
    "Punk",
    "RnB",
    "Reggae",
    "Rock",
    "Soul",
    "World Music"
];

const bars = ["4", "6", "8", "10", "12"];
const levels = ["Begginer", "Intermediate", "Advanced"];
const keys = ["A", "Ab", "B", "Bb", "C", "D", "Db", "E", "Eb", "F", "G", "Gb"]

export default PromptInputComp;
