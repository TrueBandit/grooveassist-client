import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

function Community() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userID")) {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Profile Page</Typography>
      <br />
      Hi, {sessionStorage.getItem("userName")}<br />
      ID: {sessionStorage.getItem("userID")}

    </Box>
  )
}

export default Community