import React from 'react'
import { Typography, Container } from "@mui/material";


function Landing() {
  return (
    <Container sx={{marginTop: 4, marginBottom: 3}}>
      <Typography variant="subtitle1">
      Welcome to Groove Assist, where the power of artificial intelligence becomes your personal assistant in creativity!<br/><br/>
      Our state-of-the-art application empowers artists like you to create stunning, custom groove progressions effortlessly.<br/><br/>
      Whether you're composing a new masterpiece or seeking a fresh spark of inspiration, 
      Groove Assist uses advanced AI technology to generate innovative and unique musical sequences tailored just for you.<br/><br/>
      But it's not just about creation - we believe in the power of community. With Groove Assist,
      you can save your compositions and share them with a thriving global community of music enthusiasts.<br/><br/>
      Dive into a world of shared creativity, discover new ideas from your peers,
      and even find your next collaboration partner.<br/><br/>
      Let your creative journey evolve with Groove Assist, where music and technology harmoniously sync, unlocking endless possibilities.<br/><br/>
      Join us now and let the music play!
      </Typography>
    </Container>
  )
}

export default Landing