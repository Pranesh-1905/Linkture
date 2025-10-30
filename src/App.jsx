import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, createContext, useContext } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Landing from './pages/landing'
import Login from './pages/login'
import Register from './pages/register'
import VCDashboard from './pages/VCDashboard'
import StartupDashboard from './pages/StartupDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import Profile from './pages/Profile'


const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

function App() {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Router>
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              duration: 3000,
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route 
              path="/vc-dashboard" 
              element={user?.role === 'vc' ? <VCDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/startup-dashboard" 
              element={user?.role === 'startup' ? <StartupDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/student-dashboard" 
              element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
