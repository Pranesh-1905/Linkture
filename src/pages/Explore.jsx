import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = ['all', 'startups', 'investors', 'events', 'resources']

  const items = [
    { id: 1, type: 'startup', name: 'TechNova AI', category: 'AI/ML', description: 'Building next-gen AI solutions for businesses', funding: '$2M', stage: 'Seed', image: <img src='https://cdn-icons-png.flaticon.com/512/6385/6385037.png' alt="TechNova AI logo" /> },
    { id: 2, type: 'startup', name: 'EcoGrow', category: 'Sustainability', description: 'Sustainable farming solutions using IoT', funding: '$1.5M', stage: 'Seed', image:<img src='https://cdn-icons-png.flaticon.com/512/1996/1996785.png' alt='Ecogrow'/> },
    { id: 3, type: 'investor', name: 'Alpha Ventures', category: 'VC Firm', description: 'Early-stage tech investor', investments: '50+', aum: '$100M', image:<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9q1K6805s-faPXDNcQp48IEIAcncD7-GDaQ&s'/> },
    { id: 4, type: 'startup', name: 'HealthTech Pro', category: 'Healthcare', description: 'AI-powered health diagnostics', funding: '$3M', stage: 'Series A', image: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurIpg52ppGYJnA2w4mrhm_-utRhTCf6iOGA&s' /> },
    { id: 5, type: 'event', name: 'Startup Summit 2025', category: 'Networking', description: 'Annual gathering of founders and investors', date: 'Dec 15, 2025', location: 'San Francisco', image: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReeylPiam4EM4Z8Y5VYjTxwQXOZdpqXC8n-Q&s'/>},
    { id: 6, type: 'investor', name: 'Beta Capital', category: 'Angel Network', description: 'Supporting early-stage founders', investments: '30+', aum: '$50M', image: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEJ-BgdT7L_-Wf-mDD-TFluEFcpfsZGsURw&s'/> },
    { id: 7, type: 'startup', name: 'FinFlow', category: 'Fintech', description: 'Modern banking for startups', funding: '$5M', stage: 'Series A', image: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTImPcEWpZzf_Qs-jxgUXqYLnTlNW99qWEXoQ&s'/> },
    { id: 8, type: 'resource', name: 'Pitch Deck Template', category: 'Tools', description: 'Professional pitch deck templates used by top startups', downloads: '10K+', rating: '4.9', image: <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZmeJHB8PoInJGZE2eXsW22Bt-HYcoZHl1HA&s0'/>},
  ]

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory.slice(0, -1)
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Explore</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Discover startups, investors, events, and resources</p>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search for startups, investors, or resources..."
              className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg shadow-md transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition shadow-md ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {filteredItems.length} results
          </p>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all"
                >
                  <div className="text-5xl mb-3">{item.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">{item.category}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex gap-2 flex-wrap">
                    {item.funding && <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full font-semibold">{item.funding}</span>}
                    {item.stage && <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full font-semibold">{item.stage}</span>}
                    {item.investments && <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-semibold">{item.investments} investments</span>}
                    {item.date && <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full font-semibold">{item.date}</span>}
                    {item.downloads && <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full font-semibold">{item.downloads} downloads</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 dark:text-gray-400">No results found</p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal for selected item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-6xl">{selectedItem.image}</div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedItem.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{selectedItem.category}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedItem.description}</p>
              
              <div className="space-y-2 mb-6">
                {selectedItem.funding && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Funding:</span><span className="text-gray-900 dark:text-white">{selectedItem.funding}</span></div>}
                {selectedItem.stage && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Stage:</span><span className="text-gray-900 dark:text-white">{selectedItem.stage}</span></div>}
                {selectedItem.investments && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Investments:</span><span className="text-gray-900 dark:text-white">{selectedItem.investments}</span></div>}
                {selectedItem.aum && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">AUM:</span><span className="text-gray-900 dark:text-white">{selectedItem.aum}</span></div>}
                {selectedItem.date && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Date:</span><span className="text-gray-900 dark:text-white">{selectedItem.date}</span></div>}
                {selectedItem.location && <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span><span className="text-gray-900 dark:text-white">{selectedItem.location}</span></div>}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Connect
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
