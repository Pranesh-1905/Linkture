import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Moon, Sun, LogOut, Compass, MessageCircle, User, Home, Network } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 transition-colors sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            >
              Linkture
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
              <Link
              to={
                user?.role === 'vc' ? '/vc-dashboard' :
                user?.role === 'startup' ? '/startup-dashboard' :
                user?.role === 'student' ? '/student-dashboard' :  
                '/dashboard'
              } 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium hidden sm:flex items-center gap-1"
            >
              <Home className="w-4 h-4" />


              Home
            </Link>
              <Link
                  to="/explore" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium hidden sm:flex items-center gap-1"
                >
                  <Compass className="w-4 h-4" />
                  Explore
                </Link>
                <Link 
                  to="/messages" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium hidden sm:flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  Messages
                </Link>
                <Link 
                  to="/posts" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium hidden sm:flex items-center gap-1"
                >
                  <Network className="w-4 h-4" />
                  Community
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium hidden sm:flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </>
            )}
            
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 hidden md:block">
                  {user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-md flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition shadow-md font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
