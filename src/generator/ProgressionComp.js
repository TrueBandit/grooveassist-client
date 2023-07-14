import React from 'react'
import ChordComp from './ChordComp'
import { Box , Grid } from "@mui/material";

function ProgressionComp(props) {
  return (
    <div>
        
        { props.chords.length > 0 && <>
            <Box sx={{margin:'auto',  paddingTop : "15px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "20px" , width :{ xs: '80%', md: '60%' }, backgroundColor: 'azure', borderRadius: "5px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <Box sx={{margin:'auto', paddingTop : "10px" ,paddingLeft : "10px" ,paddingRight : "10px" , paddingBottom : "10px" , width : 'fit-content', backgroundColor: 'aliceblue',borderRadius: "5px", boxShadow : "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)"}}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
            {
              props.chords.map((chord, index) =>
              {
                return <Grid item key={index}><ChordComp chord={chord}/></Grid>
              })
            }
            </Grid>
            </Box>
            <br/>
            {props.description}
            
            </Box></>}


    </div>
  )
}

export default ProgressionComp