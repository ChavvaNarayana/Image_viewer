import React, { useState } from 'react'
import '../Styles/Signup.css';
import 'bootstrap/dist/css/bootstrap.css'
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    name: "", email: "", password: "", Cpassword: ""
  })

  let name, value;
  const handelInput = (e) => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handelsubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, Cpassword } = user

    const res = await fetch("http://localhost:5000/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password, Cpassword
      })
    })

    const data = await res.json()
    console.log(data.Error)

    if (data.Error === "All fields are mandatory" || !data) {
      window.alert("All fields are mandatory")
      console.log("Invalid registatuation")
    } else if (data.Error === "Please fill correct password") {
      window.alert("Please fill correct password")
    } else {
      window.alert("Registatuation Successful")
      console.log("Registatuation  Successful")
      navigate("/")
    }

  }
  return (
    <>
      <div className="sign-up-parent" >
        <h2 style={{ opacity: 0.8 }}>Create New Account</h2><br />
        <div className="sign-up-form-container">
          <center>
            <h1 className='index-logo' style={{ margin: 30 }} ><img src={logo} alt="Logo" width='300em' height='100em' /></h1>
            <form method='POST'>
              <input type="text" className='focus' name='name' placeholder='Name' value={user.name} onChange={handelInput} /><br />
              <input className='focus' type="email" name='email' placeholder='Email id' value={user.email} onChange={handelInput} /><br />
              <input className='focus' type="password" name='password' id='register-password' placeholder='Password' value={user.password} onChange={handelInput} minLength={6} /><br />
              <input id="Cpassword" className='focus' type="Password" name='Cpassword' placeholder='Confirm Password' value={user.Cpassword} onChange={handelInput} /><br />
              <button type="submit" className="submit-button scale-onhover" onClick={handelsubmit}>Sign Up</button>
            </form>
          </center>
        </div>
        <div>

        </div>
        <p className="para">
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </div >
    </>
  )
}

export default Signup