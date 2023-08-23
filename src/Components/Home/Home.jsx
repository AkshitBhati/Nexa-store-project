import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const Home = () => {
    //FUNCTIONS FOR ROUTING
    const navigate = useNavigate()
    
    const addFormData = () => {
        navigate("/form")
    }

    const scanner = () => {
        navigate("/scan")
    }
  return (
    <div className='home'>
        <div className='home__add'>
            <button onClick={addFormData} className="home__btn">ADD DATA</button>
        </div>
        <div className='home__scan'>
            <button className="home__btn" onClick={scanner}>SCAN</button>
        </div>
    </div>
  )
}

export default Home