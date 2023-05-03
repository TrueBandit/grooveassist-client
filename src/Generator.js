import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import ServerUtils from './utilities/ServerUtils';import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import Stack from '@mui/material/Stack';

function Generator() {

    const [promptItem, setPromptItem] = useState({artist : "" , genre : "" , level : "" , bars : "" });
    const [generatedProg, setGeneratedProg] = useState({chords : [], song_description :""});

    const gen = async () =>
    {
            const response = await axios.post('http://localhost:8000/api/generate', promptItem);
            console.log('Response:', response.data);
            const parsedResponse = JSON.parse(response.data);
            setGeneratedProg({chords : parsedResponse.song.chords, song_description : parsedResponse.song.explanation})
    }

    return (
        <div align='center'>
        <h3>Progression Generator</h3>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Autocomplete
                disablePortal
                options={artists}
                size = "small"
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Artist" />}
                onChange={(event, newValue) => {setPromptItem({...promptItem, artist : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={genres}
                size = "small"
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Genre" />}
                onChange={(event, newValue) => {setPromptItem({...promptItem, genre : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={levels}
                size = "small"
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Level" />}
                onChange={(event, newValue) => {setPromptItem({...promptItem, level : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={bars}
                size = "small"
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label="Bars" />}
                onChange={(event, newValue) => {setPromptItem({...promptItem, bars : newValue})}}
            />
            
            </Stack><br/>
            <Button variant="contained" onClick={gen} endIcon={<MusicNoteRoundedIcon />}>Generate</Button>
            <br/><br/>
            <p style={{width: '800px'}}>{generatedProg.song_description}</p>
            <br/>
            {
                generatedProg.chords.map(chord => {
                    return <>{chord.chord}<br/></>
                })
            }
        </div>
        
    );
  }
const artists = ["The Beatles","Elvis Presley","Michael Jackson","Elton John","Queen","Madonna","Led Zeppelin"];
const bars = ["4","8"];
const genres = ["Rock", "Jazz", "Blues", "Hip-Hop", "RnB"];
const levels = ["Begginer", "Intermediate", "Advanced"];
export default Generator