import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/HOME/Home'; // assuming you have a Home component
import DriverSignUp from './components/HOME/Driversignup';
import DriverSignin from './components/HOME/Driversignin';


function App() {


  return (
    <>
      <Router>
      <Routes>
      <Route  path='/' element={<Home/>}/>
        <Route path="/driver-signup" element={<DriverSignUp />} />
        <Route path="/driver-signin" element={<DriverSignin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
