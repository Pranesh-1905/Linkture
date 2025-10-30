
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../App'
import Navbar from '../components/navbar'
import { Briefcase, Rocket, GraduationCap } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('vc')
  const { login } = useAuth()
  const navigate = useNavigate()

  const credentials = {
    vc: { email: 'vc@linkture.com', password: '12345', dashboard: '/vc-dashboard' },
    startup: { email: 'startup@linkture.com', password: '12345', dashboard: '/startup-dashboard' },
    student: { email: 'student@linkture.com', password: '12345', dashboard: '/student-dashboard' }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    const creds = credentials[role]
    if (email === creds.email && password === creds.password) {
      login({ email, role })
      toast.success(`Welcome back! Redirecting to your dashboard...`)
      setTimeout(() => navigate(creds.dashboard), 1000)
    } else {
      toast.error('Invalid credentials! Please check your email and password.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Login to your Linkture account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'vc', label: 'VC', icon: <Briefcase className="w-5 h-5 mr-2" /> },
                  { value: 'startup', label: 'Startup', icon: <Rocket className="w-5 h-5 mr-2" /> },
                  { value: 'student', label: 'Student', icon: <GraduationCap className="w-5 h-5 mr-2" /> }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 px-3 rounded-lg font-medium flex items-center justify-center transition ${
                      role === option.value
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Demo Credentials Info */}


            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
