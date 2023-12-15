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

export default function SignIn() {

  const dispatch = useDispatch();

  const { logUser, logUserResult } = useGraphQLActions();

  const navigate = useNavigate();

  const [userLoginObject, setUserLoginObject] = useState({ email: "", password: "" })

  const handleSubmit = async () => {
    if (userLoginObject.email && userLoginObject.password) {  // Check if email and password are provided
      try {
        await logUser({ variables: { userLoginObject: userLoginObject } });
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
    if (logUserResult.error) {
      if (logUserResult.error.message.includes('Invalid username or password')) {
        alert("Wrong email or password.");
      } else {
        console.error(logUserResult.error);
      }
    }
    if (logUserResult.data) {
      const userObject = {
        userID: logUserResult.data.login.user._id,
        firstName: logUserResult.data.login.user.fname,
        lastName: logUserResult.data.login.user.lname,
        email: logUserResult.data.login.user.email,
        token: logUserResult.data.login.token
      }
      dispatch({ type: "ADD", payload: { dataObj: userObject, entity: "login" } });
      navigate('/');
    }
  }, [logUserResult.data, logUserResult.error]);

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
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => { setUserLoginObject({ ...userLoginObject, email: e.target.value }) }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => { setUserLoginObject({ ...userLoginObject, password: e.target.value }) }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <Link to="#">
                <Typography variant="body2">Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                <Typography variant="body2">Don't have an account? Sign Up</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

  );
}