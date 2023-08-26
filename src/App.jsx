import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from './config'
import Form from './Components/Form/Form'
import Home from './Components/Home/Home'
import Navbar from "./Components/Navbar/Navbar"
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Usercard from './Components/usercard/Usercard'
import Excel from './Components/ExcelData/Excel'
import Scanner from "./Page/Scanner"
import RtoReturn from './Components/RTO Returns/RtoReturn'

const App = () => {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    try{
      
    auth.onAuthStateChanged((user) => {
      if(user){
        const fullName = user.displayName
        const nameParts = fullName.split(" ")
        const firstName = nameParts[0]
        setUserName(firstName)
      }
      else{
        setUserName("")
      }
    })
  } catch(err){
    
    alert("Please Login")
  }
   }) 
  return (
    <BrowserRouter>
    <Navbar name={userName}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form name={userName}/>} />
      <Route path="/scan" element={<Scanner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/usercard" element={<Usercard name={userName} />} />
      <Route path="/excel" element={<Excel  />} />
      <Route path="/rtoreturn" element={<RtoReturn  />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App