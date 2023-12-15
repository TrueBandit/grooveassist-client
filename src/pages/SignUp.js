import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useGraphQLActions } from '../utilities/GraphQL';
import { useDispatch } from 'react-redux'

export default function SignUp() {

  const dispatch = useDispatch();

  const { addUser, addUserResult } = useGraphQLActions();

  const navigate = useNavigate();

  const [newUser, setnewUser] = useState({ fname: "", lname: "", email: "", password: "" })

  const handleSubmit = async () => {
    if (newUser.fname && newUser.lname && newUser.email && newUser.password) {
      try {
        await addUser({ variables: { newUser: newUser } });
      } catch (e) {
        //console.error(e);
      }
    }
  };


  //Navigate out if user already logged in
  useEffect(() => {
    if (sessionStorage.getItem("userLoggedIn")) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (addUserResult.error) {
      if (addUserResult.error.message.includes('A user with this email already exists')) {
        alert("Email already exists.");
      } else {
        console.error(addUserResult.error);
      }
    }
    if (addUserResult.data) {
      const userObject = {
        userID: addUserResult.data.addUser.user._id,
        firstName: addUserResult.data.addUser.user.fname,
        lastName: addUserResult.data.addUser.user.lname,
        email: addUserResult.data.addUser.user.email,
        token: addUserResult.data.addUser.user.token
      }
      dispatch({ type: "ADD", payload: { dataObj: userObject, entity: "login" } });
      navigate('/');
    }
  }, [addUserResult.data, addUserResult.error]);


  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => { setnewUser({ ...newUser, fname: e.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={e => { setnewUser({ ...newUser, lname: e.target.value }) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => { setnewUser({ ...newUser, email: e.target.value }) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={e => { setnewUser({ ...newUser, password: e.target.value }) }}
              />
            </Grid>

          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                <Typography variant="body2">Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}