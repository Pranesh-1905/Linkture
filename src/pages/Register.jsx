import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useAuth } from '../App'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { UserPlus, Mail, Lock, User, Briefcase, GraduationCap, TrendingUp } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    setLoading(true)

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      )
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      })

      // TODO: In production, save user role to PostgreSQL
      // const token = await userCredential.user.getIdToken()
      // await fetch('/api/users', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     firebase_uid: userCredential.user.uid,
      //     email: formData.email,
      //     username: formData.name,
      //     role: formData.role
      //   })
      // })

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: formData.name,
        role: formData.role
      }

      // Update app context
      login(userData)

      toast.success('Account created successfully!')
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        if (formData.role === 'vc') navigate('/vc-dashboard')
        else if (formData.role === 'startup') navigate('/startup-dashboard')
        else navigate('/student-dashboard')
      }, 1500)

    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to create account. Please try again.'
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use a stronger password.'
      }
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'blue' },
    { value: 'startup', label: 'Startup Founder', icon: TrendingUp, color: 'purple' },
    { value: 'vc', label: 'Venture Capitalist', icon: Briefcase, color: 'indigo' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block p-4 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-lg mb-4"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Join Linkture
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start connecting
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <motion.label
                      key={option.value}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
                        formData.role === option.value
                          ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                      } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={handleChange}
                        className="sr-only"
                        disabled={loading}
                      />
                      <Icon className={`w-5 h-5 mr-3 ${
                        formData.role === option.value
                          ? `text-${option.color}-600 dark:text-${option.color}-400`
                          : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        formData.role === option.value
                          ? `text-${option.color}-700 dark:text-${option.color}-300`
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {option.label}
                      </span>
                      {formData.role === option.value && (
                        <motion.div
                          layoutId="role-indicator"
                          className={`absolute right-4 w-2 h-2 rounded-full bg-${option.color}-600`}
                        />
                      )}
                    </motion.label>
                  )
                })}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
