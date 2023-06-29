import React from 'react'

function ChordComp(props) {
  return (
    <div style={{margin:'auto' , width :'70px',height :'50px', border:'solid 0.1px', backgroundColor: 'orange', borderRadius: "20px"}}>
    {props.chord.chord}<br/>({props.chord.bars})</div>
  )
}

export default ChordComp