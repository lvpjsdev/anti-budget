import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Logger from './pages/Logger'
import ShameStats from './pages/ShameStats'
import History from './pages/History'

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
        <Route path="/stats" element={<ShameStats />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App