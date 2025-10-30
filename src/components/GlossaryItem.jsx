
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function GlossaryItem({ term, definition }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-2 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition rounded"
        whileHover={{ x: 4 }}
      >
        <span className="font-semibold text-gray-900 dark:text-white">{term}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 px-2 text-gray-600 dark:text-gray-300">
              {definition}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
