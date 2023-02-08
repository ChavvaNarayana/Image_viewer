import React from 'react'
// import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard.js'
import Postview from "./PostView/postview.jsx";
import Uploadview from "./Uploadview/Uploadview.jsx";
import FPassword from "./components/FPassword"
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        {/* <Route path="about" element={<About />} /> */}
        <Route path="register" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/postview" element={<Postview />} />
        <Route path= "/uploadview" element ={<Uploadview />}/>
        <Route path= "/forgot-password" element ={<FPassword />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App