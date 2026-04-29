import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import Layout    from './components/Layout'
import Login     from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients   from './pages/Clients'
import Contacts  from './pages/Contacts'
import Invoices  from './pages/Invoices'
import Settings  from './pages/Settings'

/* ── Protected Route ──────────────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight:'100vh', display:'flex', alignItems:'center',
        justifyContent:'center', background:'var(--color-bg)'
      }}>
        <div className="spinner" />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

/* ── Router ───────────────────────────────────────────────────── */
const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/"          element={<Dashboard />} />
        <Route path="/clients"   element={<Clients />} />
        <Route path="/contacts"  element={<Contacts />} />
        <Route path="/invoices"  element={<Invoices />} />
        <Route path="/settings"  element={<Settings />} />
        {/* Catch-all */}
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

/* ── App ──────────────────────────────────────────────────────── */
const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            boxShadow: 'var(--shadow-md)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: 'white' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: 'white' },
          },
          duration: 3500,
        }}
      />
    </BrowserRouter>
  </AuthProvider>
)

export default App
