/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../Styles/Signin.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import Loading from '../Loading';
import { Link, useNavigate } from 'react-router-dom'
import logo from "../images/logo.png";
import GoogleLogin from 'react-google-login';


const apiUrlForgotPassword = 'https://image-viewer.onrender.com/forgot-password'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [err, setErr] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isForgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)

  const userLogin = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await res.json()
    console.log(data)
    if (data.Error === "All fields are mandatory" || !data) {
      window.alert("All fields are mandatory")
      console.log("Invalid user")
    } else if (data.Error === "credencial error") {
      console.log("Invalid user")

    } else {
      const token = data.Token
      console.log(token)
      localStorage.setItem('token', token)
      // localStorage.setItem('user',userData)
      window.alert("Login Successful")
      console.log("Login Successful")
      navigate("/dashboard")
    }

    const handleForgotPasswordSubmit = async (e) => {
      e.preventDefault()
      setForgotPasswordLoading(true)
      await axios.post(apiUrlForgotPassword, { email: forgotPasswordEmail }).then(res => res.data)
        .then(data => {
          setForgotPasswordSuccess(true)
        })
        .catch(err => {
          console.log(err)
          setErr('Error occured while resetting the password. Please try again later')
        })
        .finally(() => setForgotPasswordLoading(false))
    }

    const responseGoogle = (response) => {
      console.log(response);
    };

  }
  return (
    <>
      <div className="sign-in-parent">
        <div className="sign-in-form-container">
          <center>
            <h1 className='index-logo' style={{ margin: 0 }} ><img src={logo} alt="Logo" width='300em' height='100em' /></h1>
            <p style={{ opacity: 0.8 }}>Enter Your Credentials to access your account</p><br />
            <form method='POST'>
              <input className='focus' type="email" name='email' placeholder='User Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
              <input id='login-password' className='focus' type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              {isLoading && <Loading />}
              <button type="submit" className="submit-button scale-onhover" onClick={userLogin}>Sign In</button><br />
              <p style={{ color: 'red' }}>{err} </p>
              <Link to='/forgot-password' style={{ textDecoration: 'none' }}>Reset Password</Link>
              <br />
              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Login with Google"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </form>
          </center>
        </div>
        <div>
          <p className="para">
            Don't have an account ?
            <Link to="/register" style={{ textDecoration: 'none', padding: "0.5rem" }}>
              SignUp
            </Link>
          </p>
        </div>
      </div>

    </>
  )
}

export default Login