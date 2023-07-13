import React from 'react';
import { useGraphQLActions } from './GeneratorGraphQL';
import { useSubscription } from '@apollo/client';
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import ProgressionComp from './ProgressionComp';
import PromptInputComp from './PromptInputComp';

function StreamingOpenAIComponent() {
  
  const { generateResponseMutation, generateResponseResult, requestIDMutation, requestIDResult, SUBSCRIBE_CHORDS_STREAM } = useGraphQLActions();
  //getting the user input from the input component
  const updatePromptObject = (newPromptObject) => {
    setPromptObject(newPromptObject);
  };
  //the prompt the user builds- sent to server
  const [promptObject, setPromptObject] = useState({artist : "" , genre : "" , level : "" , bars : "" , key : "" });
  //the concatenate of the response stream fragments 
  const [streamString, setStreamString] = useState("");
  //while response is streaming from the server, loading will be true
  const [streaming, setStreaming] = useState(false);
  //unique request id per device to distinct subscription streaming
  const [requestID, setRequestID] = useState("")
  //array of generated chords
  const [chordsArray, setChordsArray] = useState([])
  //chords description string
  const [descString, setDescString] = useState("");
  //temp stream delta string
  const [deltaString, setDeltaString] = useState("");
  //temp stream string
  const [tempStr, setTempStr] = useState("");
  //helps with reading the chords part in the stream
  const [readingChords, setReadingChords] = useState("not started");
  //helps with reading the chords description part in the stream
  const [tempCounter, setTempCounter] = useState(0);


  const {} = useSubscription(SUBSCRIBE_CHORDS_STREAM, {
    variables: { id: requestID },
    onData: (data) => {
      const delta = data.data.data.responseStream
      setStreamString(prevstreamString => prevstreamString + delta)
    } 
  })

  useEffect(() => {
    requestIDMutation()
  }, [])

  useEffect(() => {
    if (requestIDResult.data) {
      setRequestID(requestIDResult.data.getRequestID)
    }
  }, [requestIDResult.data])
  
  useEffect(() => {
    //current delta string
    let delta = streamString.replace(deltaString,"")
    setDeltaString(streamString)

      if (readingChords == "ongoing") {
        //accumulating deltas until a chord is found
        let temp1 = tempStr + delta
        setTempStr(temp1)

        //finding a chord and pusing it into the chords array
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
        //locating where the descriptive part of the chords start
        let aidCounter = tempCounter + delta.length
          if (aidCounter>9)
            {
              setDescString(prevdescString => prevdescString + delta)}
          else
            {
              setTempCounter(prevTempCounter => prevTempCounter += delta.length)}
      }

      if (delta.includes("[")) {
        setReadingChords("ongoing")
      }
      else if (delta.includes("]")) {
        setReadingChords("done")
        setTempStr("")
      }
      
}, [streamString])

  // Listening to the mutation response when the server finished to stream
  useEffect(() => {
    if (generateResponseResult.data) {
      setStreaming(false)
    }
  }, [generateResponseResult.data]);

  const submit = () => {
    setChordsArray([])
    setTempCounter(0)
    setStreamString("")
    setDescString("")
    setReadingChords("not started")
    setStreaming(true)
    generateResponseMutation({ variables: { "promptObj" : promptObject , "requestId" : requestID} });
  };

  return (
    <div>  
      <PromptInputComp updatePromptObject={updatePromptObject} />
      <br/>
      <LoadingButton size="small" onClick={submit} endIcon={<MusicNoteRoundedIcon />} loading={streaming} loadingPosition="end" variant="contained"><span>Generate</span></LoadingButton>
      <br/><br/>
      <ProgressionComp chords={chordsArray} description={descString}/>
      <br/><br/><br/>
      <div style={{margin: "auto", width :'80%', color:"LightSteelBlue"}}>
        {streamString}
      </div>
      <br/><br/>
            
    </div>
  );
}

export default StreamingOpenAIComponent;

