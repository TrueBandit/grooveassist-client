import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../components/Navbar'
import Community from './Community'
import Generator from './Generator'
import Landing from './Landing'
import Login from './Login'
import SignUp from './SignUp';
import Profile from './Profile';
import MyHub from './MyHub';
import { useSelector } from 'react-redux'

function Main() {

  const userData = useSelector(state => state.userData);
  if (Object.keys(userData).length === 0 && userData.constructor === Object) {
    sessionStorage.removeItem("userLoggedIn")
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <Routes>
        <Route path="community" element={<Community />} />
        <Route path="generate" element={<Generator />} />
        <Route path="" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="hub" element={<MyHub />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Main