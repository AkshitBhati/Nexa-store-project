import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"

const Navbar = ({ name }) => {
    //FUNCTIONS FOR NAVIGATING
    const navigate = useNavigate()
    
    const navigateToHome = () => {
        navigate("/")
    }  

    //FUNCTION FOR HANDLING THE LOGIN
    const loginHandler = () => {
      if(name){
        navigate("/usercard")
      }
      else{
        navigate("/login")
      }
    } 
    
  return (
    <header className='nav'>
        <h3 onClick={navigateToHome}>Nexa Store</h3>
        <button className='nav__btn' onClick={loginHandler}>{name ? name : "Login"}</button>
    </header>
  )
}

export default Navbar
