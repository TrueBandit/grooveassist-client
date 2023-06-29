import React from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import Stack from '@mui/material/Stack';
import ChordComp from './ChordComp'

const GENERATE_CHORDS = gql`
mutation ($promptObj: PromptObjectInput) {
  generateResponse(PromptObj: $promptObj)
}`
const SUBSCRIBE_CHORDS_STREAM = gql`
subscription responseStream{
  responseStream
}
`
function StreamingOpenAIComponent() {
  //the prompt the user builds
  const [promptObject, setPromptObject] = useState({artist : "" , genre : "" , level : "" , bars : "" , key : "" });
  //the sting that is built from concatenating the response stream fragments 
  const [streamString, setStreamString] = useState("");
  //while response is streaming from the server, loading will be true
  const [streaming, setStreaming] = useState(false);
  //temp stream delta string
  const [deltaString, setDeltaString] = useState("");
  //chords description string
  const [descString, setDescString] = useState("");
  //array of generated chords
  const [chordsArray, setChordsArray] = useState([])
  //temp stream string
  const [tempStr, setTempStr] = useState("");
  //reading the chords part in the stream
  const [readingChords, setReadingChords] = useState("not started");
    //reading the chords part in the stream
  const [semek, setSemek] = useState(0);

  const [generateResponse, generateResponseResult] = useMutation(GENERATE_CHORDS)


  const {} = useSubscription(SUBSCRIBE_CHORDS_STREAM, {
    onData: (data) => {
      const delta = data.data.data.responseStream
      setStreamString(prevstreamString => prevstreamString + delta)
    } 
  })

  useEffect(() => {

    let delta = streamString.replace(deltaString,"")
    setDeltaString(streamString)
    let aidCounter = 0

      if (readingChords == "ongoing") {
        let temp1 = tempStr + delta
        setTempStr(temp1)

        if (temp1.includes("}")) {
          let temp2 = temp1.replaceAll(/\s/g,"")
          if (temp2.charAt(temp2.length - 1) == ",") {
            temp2 = temp2.substring(0,temp2.length-1);
          }
            try {
              let tempChordObj = JSON.parse(temp2)
              setChordsArray(current => [...current, tempChordObj])
            } catch (error) {
              console.log(error)
            }
          setTempStr("");
          }
        }
      else if (readingChords == "done") {
          let aidCounter = semek + delta.length
          setSemek(prevsemek => prevsemek += delta.length)
          if (aidCounter>9)
            {
              setDescString(prevdescString => prevdescString + delta)
            }
      }

      if (delta.includes("[")) {
        setReadingChords("ongoing")
      }
      if (delta.includes("]")) {
        setReadingChords("done")
        setTempStr("")
      }
      
}, [streamString])

  // Listening to the mutation response when the server finished to stream
  useEffect(() => {
    if (generateResponseResult.data) {
      setStreaming(false)
      setDescString(descString.slice(0, -2))
    }
  }, [generateResponseResult.data]);

  const submit = () => {
    setChordsArray([])
    setSemek(0)
    setStreamString("")
    setDescString("")
    setReadingChords("not started")
    setStreaming(true)
    generateResponse({ variables: { "promptObj" : promptObject} });
  };

  return (
    <div>
        <h3>Progression Generator</h3>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" flexWrap="wrap">
            <Autocomplete
                disablePortal
                options={artists}
                size = "small"
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Artist" />}
                onChange={(event, newValue) => {setPromptObject({...promptObject, artist : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={genres}
                size = "small"
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Genre" />}
                onChange={(event, newValue) => {setPromptObject({...promptObject, genre : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={levels}
                size = "small"
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Level" />}
                onChange={(event, newValue) => {setPromptObject({...promptObject, level : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={bars}
                size = "small"
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label="Bars" />}
                onChange={(event, newValue) => {setPromptObject({...promptObject, bars : newValue})}}
            />
            <Autocomplete
                disablePortal
                options={keys}
                size = "small"
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label="Key" />}
                onChange={(event, newValue) => {setPromptObject({...promptObject, key : newValue})}}
            />
            </Stack>
            <br/>
            <LoadingButton size="small" onClick={submit} endIcon={<MusicNoteRoundedIcon />} loading={streaming} loadingPosition="end" variant="contained"><span>Generate</span></LoadingButton>
            <br/><br/>
            <div style={{margin:'auto',  paddingTop : "15px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "20px" , width :'80%', backgroundColor: 'azure', borderRadius: "5px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div style={{margin:'auto', paddingTop : "10px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "10px" , width :'60%', backgroundColor: 'aliceblue',borderRadius: "5px", boxShadow : "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.19)"}}>
            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center" flexWrap="wrap">
            {
              chordsArray.map((chord, index) =>
              {
                return <ChordComp key={index} chord={chord}/>
              })
            }
            </Stack>
            </div>
            <br/>
            {descString}
            
            </div>
            <br/><br/><br/><br/>
            <div style={{margin: "auto", width :'80%', color:"LightSteelBlue"}}>
            {streamString}
            </div>
            <br/><br/>
            
        </div>
  );
}
const artists = ["The Beatles","Elvis Presley","Michael Jackson","Elton John","Queen","Madonna","Led Zeppelin"];
const bars = ["4","6","8","10","12"];
const genres = ["Rock", "Jazz", "Blues", "Hip-Hop", "RnB"];
const levels = ["Begginer", "Intermediate", "Advanced"];
const keys = ["A","Ab","B","Bb","C","D","Db","E","Eb","F","G","Gb"]
export default StreamingOpenAIComponent;

