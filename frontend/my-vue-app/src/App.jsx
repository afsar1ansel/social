import { useState } from 'react'
import './App.css'
import Nav from './Nav'
import AllRoute from './router/AllRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>
    <AllRoute/>
    </>
  )
}

export default App
