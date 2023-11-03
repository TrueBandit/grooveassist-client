import React from 'react';
import sax from '../design/sax.png';
import { Typography, Box, Grid, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {

  const navigate = useNavigate();

  return (
    <div>
    
    {/* Hero Section */}
    <Box sx={{ margin: 'auto', paddingTop: "20px", paddingLeft: "30px", paddingRight: "30px", paddingBottom: "20px", height: "500px", backgroundColor: 'ghostwhite' }}>
      <Container maxWidth="xl">
      <Grid container spacing={1} alignItems="center" justifyContent="center">

        {/* Text Grid Item */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h3">
              AI-Powered Music Mastery
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Based in the heart of creativity, we're here to effortlessly enhance your compositions and connect you with a vibrant global community. Dive in and let the harmonies begin.
            </Typography>
            <br/>
            <Button variant="contained" color="secondary" onClick={() => navigate('/generate')}>Lets Go!</Button>
          </Box>
        </Grid>

        {/* Image Grid Item */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={sax} style={{ maxWidth: '100%', maxHeight: '400px', height: 'auto' }} alt="Saxophone" />
          </Box>
        </Grid>

      </Grid>
      </Container>
    </Box>
    

    </div>
  );
}

export default Landing;



/*
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
*/