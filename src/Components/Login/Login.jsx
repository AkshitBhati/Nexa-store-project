import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'
import "./Login.css"

const Login = () => {
     //Creating state for email and password
     const [email ,setEmail] = useState("")
     const [password ,setPassword] = useState("")
     const [err ,setErr] = useState([])

     const navigate = useNavigate()
    const registerHandler = () => {
        navigate("/register")
    }

    const  loginHandler = () => {
        if (email === "" || password === "") {
          alert("Fill all fields");
        } else {
          signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredentials) => {
              navigate('/')
              
            })
            .catch((error) => {
              
              if (error.code === "auth/invalid-email") {
                setErr("Invalid email format");
              } else if (error.code === "auth/wrong-password") {
                setErr("Password should be at least 6 characters");
              } else{
              setErr("User not found")  
              }
            })
            
        }
      };
  return (
    <div className='login'>
    <h1 className='login__heading'>Login</h1>
    <form className='login__form'>
        
        <label >Email</label>
        <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label >Password</label>
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        {err && <p className="login__error">{err}</p>}
        {/* <p className='login__msg' onClick={registerHandler}>New User? Register?</p> */}
    </form>
    <div className='login__btn--container'>
    <button className='login__btn' onClick={loginHandler}>Submit</button>

    </div>
   
</div>
  )
}

export default Login