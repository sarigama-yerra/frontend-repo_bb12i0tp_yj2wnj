import { useEffect, useState } from 'react'
import Calculator from './components/Calculator'
import Startup from './components/Startup'

function App() {
  const [showStartup, setShowStartup] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowStartup(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#0E0E10]">
      <Startup show={showStartup} onComplete={() => setShowStartup(false)} />
      {!showStartup && <Calculator />}
    </div>
  )
}

export default App
