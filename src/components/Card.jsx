
import { motion } from 'framer-motion'

export default function Card({ title, description, icon, delay = 0, onClick, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

