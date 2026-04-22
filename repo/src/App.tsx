import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'

function Logger() {
  const category = localStorage.getItem('selectedCategory')
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col items-center justify-center">
      <span className="text-6xl mb-4">
        {category === 'coffee' ? '☕' : category === 'delivery' ? '🧋' : category === 'taxi' ? '🚕' : category === 'vapes' ? '💨' : '🍺'}
      </span>
      <h1 className="text-xl font-bold capitalize">{category}</h1>
      <p className="text-neutral-400 mt-2">Logger coming soon...</p>
    </div>
  )
}

function App() {
  const hasCategory = localStorage.getItem('selectedCategory')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={hasCategory ? <Navigate to="/logger" replace /> : <Onboarding />}
        />
        <Route path="/logger" element={<Logger />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App