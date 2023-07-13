import React from 'react'
import ChordComp from './ChordComp'
import { Stack } from "@mui/material";

function ProgressionComp(props) {
  return (
    <div>
        
        { props.chords.length > 0 && <>
            <div style={{margin:'auto',  paddingTop : "15px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "20px" , width :'80%', backgroundColor: 'azure', borderRadius: "5px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div style={{margin:'auto', paddingTop : "10px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "10px" , backgroundColor: 'aliceblue',borderRadius: "5px", boxShadow : "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.19)"}}>
            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center" flexWrap="wrap">
            {
              props.chords.map((chord, index) =>
              {
                return <ChordComp key={index} chord={chord}/>
              })
            }
            </Stack>
            </div>
            <br/>
            {props.description}
            
            </div></>}


    </div>
  )
}

export default ProgressionComp