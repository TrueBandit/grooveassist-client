import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useSelector } from 'react-redux'

function Community() {

  const navigate = useNavigate();

  const userData = useSelector(state => state.userData);

  useEffect(() => {
    if (!sessionStorage.getItem("userLoggedIn")) {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Profile Page</Typography>

      <Typography variant="subtitle1">Hi, {userData.firstName + " " + userData.lastName}</Typography>
      Email: {userData.email}<br />
      ID: {userData.userID}
    </Box>
  )
}

export default Community