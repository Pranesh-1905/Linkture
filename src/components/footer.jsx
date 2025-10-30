
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4"
            >
              Linkture
            </motion.h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Connecting startup founders, venture capitalists, and students in one powerful platform.
              Build your network, find funding, and learn from the best.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © {currentYear} Linkture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
    