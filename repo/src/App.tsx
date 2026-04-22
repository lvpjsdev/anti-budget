import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Logger from './pages/Logger'
import ShameStats from './pages/ShameStats'
import History from './pages/History'
import BottomNav from './components/BottomNav'

function AppLayout() {
  return (
    <div className="min-h-screen pb-16">
      <Outlet />
      <BottomNav />
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
        <Route element={<AppLayout />}>
          <Route path="/logger" element={<Logger />} />
          <Route path="/stats" element={<ShameStats />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App