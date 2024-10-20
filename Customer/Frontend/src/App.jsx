import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/HOME/Home'; // assuming you have a Home component
import DriverSignUp from './components/HOME/Driversignup';
import DriverSignin from './components/HOME/Driversignin';
import Customerdashboard from './components/Customer-dashboard/Home';
import Driverdashboard from './components/Driver-Dashboard/Home';
function App() {


  return (
    <>
      <Router>
      <Routes>
      <Route  path='/' element={<Home/>}/>
        <Route path="/driver-signup" element={<DriverSignUp />} />
        <Route path="/driver-signin" element={<DriverSignin />} />
        <Route path="/customer-dashboard" element={<Customerdashboard/>} />
        <Route path="/driver-dashboard" element={<Driverdashboard/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
