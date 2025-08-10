import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateClaim from './pages/CreateClaim'
import PendingClaim from './pages/PendingClaim'
import ClosedClaim from './pages/ClosedClaim'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/create-claim" element={<CreateClaim />} />
      <Route path="/pending-claims" element={<PendingClaim />} />
      <Route path="/closed-claims" element={<ClosedClaim />} />
      </Routes>
      </BrowserRouter>
        
    </div>
  )
}

export default App
