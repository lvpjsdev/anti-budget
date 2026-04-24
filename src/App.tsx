import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSettings } from './hooks/useDb';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Logger from './pages/Logger';
import ShameStats from './pages/ShameStats';
import History from './pages/History';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { settings, loading } = useSettings();

  console.log('App render', { loading, settings })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-tg-bg text-tg-text">
        <p>Loading...</p>
      </div>
    );
  }

  const hasSelectedCategory = settings?.selectedCategoryId;

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          {/* Redirect root to appropriate page based on onboarding status */}
          <Route path="/" element={
            hasSelectedCategory ? <Navigate to="/logger" replace /> : <Navigate to="/onboarding" replace />
          } />
          {/* Protected routes with layout */}
          <Route element={<Layout />}>
            <Route path="/logger" element={<Logger />} />
            <Route path="/stats" element={<ShameStats />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
