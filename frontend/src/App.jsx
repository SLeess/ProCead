import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './Users'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className="App">
        <Users/>
      </div>
    </>
  )
}

export default App
