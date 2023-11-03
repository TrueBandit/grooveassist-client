import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../components/Navbar'
import Community from './Community'
import Generator from './Generator'
import Landing from './Landing'
import Login from './Login'
import SignUp from './SignUp';
import { Height } from '@mui/icons-material';

function Main() {

  return (
    <div style={{textAlign:'center'}}>
    <Navbar/>
    <Routes>
      <Route path="community" element={<Community/>} />
      <Route path="generate" element={<Generator/>} />
      <Route path="" element={<Landing/>} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<SignUp/>} />
    </Routes>
    </div>
  )
}

export default Main