
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../App'
import Navbar from '../components/navbar'
import { Briefcase, Rocket, GraduationCap } from 'lucide-react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('vc')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const credentials = {
    vc: { email: 'vc@linkture.com', password: '12345', dashboard: '/vc-dashboard' },
    startup: { email: 'startup@linkture.com', password: '12345', dashboard: '/startup-dashboard' },
    student: { email: 'student@linkture.com', password: '12345', dashboard: '/student-dashboard' }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Development helper: if entered credentials match the demo mapping,
    // bypass Firebase and simulate a successful login. This makes the demo
    // credentials work without needing real Firebase users during local dev.
    try {
      if (process.env.NODE_ENV !== 'production') {
        const matchedRole = Object.keys(credentials).find(
          (k) => credentials[k].email === email && credentials[k].password === password
        )

        if (matchedRole) {
          console.log('Demo credentials matched for role:', matchedRole)
          const userData = {
            uid: `demo-${matchedRole}`,
            email,
            displayName: email.split('@')[0],
            role: matchedRole,
          }

          // Update app context and navigate just like a real login
          login(userData)
          toast.success(`Welcome back! Redirecting to your dashboard...`)

          setTimeout(() => {
            if (matchedRole === 'vc') navigate('/vc-dashboard')
            else if (matchedRole === 'startup') navigate('/startup-dashboard')
            else navigate('/student-dashboard')
          }, 400)

          setLoading(false)
          return
        }
      }
    } catch (err) {
      console.error('Demo login helper error:', err)
      // fall through to normal login attempt
    }

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Get user data from Firebase
      const firebaseUser = userCredential.user

      // TODO: In production, fetch user role from PostgreSQL based on firebaseUser.uid
      // For now, determine role based on email or use selected role
      let userRole = role
      
      // Optional: You can also determine role from email domain
      if (email.includes('vc@')) userRole = 'vc'
      else if (email.includes('startup@')) userRole = 'startup'
      else if (email.includes('student@')) userRole = 'student'

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || email.split('@')[0],
        role: userRole
      }

      // Update app context with user data
      login(userData)
      
      toast.success(`Welcome back! Redirecting to your dashboard...`)
      
      // Navigate based on role
      setTimeout(() => {
        if (userRole === 'vc') navigate('/vc-dashboard')
        else if (userRole === 'startup') navigate('/startup-dashboard')
        else navigate('/student-dashboard')
      }, 1000)

    } catch (error) {
      console.error('Login error:', error)
      
      // Handle specific Firebase auth errors
      let errorMessage = 'Invalid credentials! Please check your email and password.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.'
      }
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Demo login function (optional - for quick testing)
  const handleDemoLogin = (demoRole) => {
    const creds = credentials[demoRole]
    setEmail(creds.email)
    setPassword(creds.password)
    setRole(demoRole)
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
