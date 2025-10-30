import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/navbar'
import Card from '../components/Card'
import CustomPieChart from '../components/PieChart'
import { TrendingUp, Rocket, DollarSign, Send, Filter } from 'lucide-react'

export default function VCDashboard() {
  const [filter, setFilter] = useState('all')
  const [message, setMessage] = useState('')

  const portfolios = [
    { id: 1, name: 'TechNova AI', sector: 'AI/ML', funding: '$2M', type: 'seed' },
    { id: 2, name: 'EcoGrow', sector: 'Sustainability', funding: '$1.5M', type: 'seed' },
    { id: 3, name: 'FinFlow', sector: 'Fintech', funding: '$5M', type: 'series-a' },
    { id: 4, name: 'HealthTech Pro', sector: 'Healthcare', funding: '$3M', type: 'seed' },
    { id: 5, name: 'EdVenture', sector: 'EdTech', funding: '$8M', type: 'series-a' },
    { id: 6, name: 'CloudScale', sector: 'SaaS', funding: '$500K', type: 'pre-seed' }
  ]

  const chartData = [
    { name: 'AI/ML', value: 30 },
    { name: 'Fintech', value: 25 },
    { name: 'Healthcare', value: 20 },
    { name: 'Sustainability', value: 15 },
    { name: 'EdTech', value: 10 }
  ]

  const filteredPortfolios = filter === 'all' 
    ? portfolios 
    : portfolios.filter(p => p.type === filter)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      toast.success('Message sent successfully!')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">VC Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your portfolio and discover new opportunities</p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              icon={<TrendingUp className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
              title="Total Investments"
              description="$20.5M across 12 startups"
            />
            <Card
              icon={<Rocket className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
              title="Active Deals"
              description="5 pitch decks under review"
            />
            <Card
              icon={<DollarSign className="w-10 h-10 text-green-600 dark:text-green-400" />}
              title="Portfolio Value"
              description="$45M estimated valuation"
            />
          </div>

          {/* Portfolio Distribution Chart */}
          <div className="mb-8">
            <CustomPieChart data={chartData} />
          </div>

          {/* Filter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Companies</h2>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                >
                  <option value="all">All Funds</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortfolios.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg border border-blue-200 dark:border-gray-500"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Sector:</span> {company.sector}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Funding:</span> {company.funding}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {company.type.toUpperCase()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Message Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Send Message to Startups</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows="4"
                placeholder="Type your message here..."
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
