import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../Navbar'
import Community from './Community'
import Generator from './Generator'
import Landing from './Landing'
import Login from './Login'

function Main() {

  return (
    <div style={{textAlign:'center'}}>
    <Navbar/>
    <br/>
    <Routes>
      <Route path="community" element={<Community/>} />
      <Route path="generate" element={<Generator/>} />
      <Route path="" element={<Landing/>} />
      <Route path="login" element={<Login/>} />
      <Route path="landing" element={<Landing/>} />
    </Routes>
    </div>
  )
}

export default Main