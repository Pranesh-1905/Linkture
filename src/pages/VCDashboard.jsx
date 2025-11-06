import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Navbar from "../components/navbar";
import Card from "../components/Card";
import AnimatedPortfolioChart from "../components/AnimatedPortfolioChart";
import { TrendingUp, Rocket, DollarSign, Send, Filter } from "lucide-react";

export default function VCDashboard() {
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(22.4);
  const [portfolioValue, setPortfolioValue] = useState(41.6);
  const [activeDeals, setActiveDeals] = useState(5);

  // Generate mock portfolios with slight variations to simulate real-time updates
  useEffect(() => {
    const generateMockPortfolios = () => {
      const mockData = [
        { id: 1, name: 'TechNova AI', sector: 'AI/ML', funding: '$2M', type: 'seed', growth: '+12%' },
        { id: 2, name: 'EcoGrow', sector: 'Sustainability', funding: '$1.5M', type: 'seed', growth: '+8%' },
        { id: 3, name: 'FinFlow', sector: 'Fintech', funding: '$5M', type: 'series-a', growth: '+25%' },
        { id: 4, name: 'HealthTech Pro', sector: 'Healthcare', funding: '$3M', type: 'seed', growth: '+15%' },
        { id: 5, name: 'EdVenture', sector: 'EdTech', funding: '$8M', type: 'series-a', growth: '+18%' },
        { id: 6, name: 'CloudScale', sector: 'SaaS', funding: '$500K', type: 'pre-seed', growth: '+5%' },
        { id: 7, name: 'DataViz Labs', sector: 'Analytics', funding: '$2.5M', type: 'seed', growth: '+10%' },
        { id: 8, name: 'CryptoSecure', sector: 'Blockchain', funding: '$4M', type: 'series-a', growth: '+22%' }
      ];
      
      // Randomly shuffle to simulate real-time changes
      const shuffled = [...mockData].sort(() => Math.random() - 0.5);
      setPortfolios(shuffled);
    };

    generateMockPortfolios();
    const interval = setInterval(generateMockPortfolios, 8000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats values to simulate real-time updates
  useEffect(() => {
    const updateStats = () => {
      setTotalInvestment(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
      setPortfolioValue(prev => +(prev + (Math.random() - 0.5) * 1.2).toFixed(1));
      setActiveDeals(prev => Math.max(3, Math.min(8, prev + (Math.random() > 0.5 ? 1 : -1))));
    };

    const interval = setInterval(updateStats, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter portfolios
  const filteredPortfolios =
    filter === "all"
      ? portfolios
      : portfolios.filter((p) => p.type === filter);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      toast.success("Message sent successfully!");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">VC Dashboard</h1>
          <div className="text-gray-600 dark:text-gray-400 mb-8">Manage your portfolio and discover new opportunities</div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              key={totalInvestment}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                icon={<TrendingUp className="w-10 h-10 text-blue-600 dark:text-blue-400" />} 
                title="Total Investments" 
                description={
                  <div className="flex items-center gap-2">
                    <span>${totalInvestment}M across {portfolios.length} startups</span>
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                }
              />
            </motion.div>
            <motion.div
              key={activeDeals}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                icon={<Rocket className="w-10 h-10 text-purple-600 dark:text-purple-400" />} 
                title="Active Deals" 
                description={
                  <div className="flex items-center gap-2">
                    <span>{activeDeals} pitch decks under review</span>
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                  </div>
                }
              />
            </motion.div>
            <motion.div
              key={portfolioValue}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                icon={<DollarSign className="w-10 h-10 text-green-600 dark:text-green-400" />} 
                title="Portfolio Value" 
                description={
                  <div className="flex items-center gap-2">
                    <span>${portfolioValue}M estimated valuation</span>
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                }
              />
            </motion.div>
          </div>

          {/* Animated Chart */}
          <div className="mb-8">
            <AnimatedPortfolioChart />
          </div>

          {/* Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Companies</h2>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold flex items-center gap-1"
                >
                  <motion.span 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  Real-time
                </motion.div>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white">
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
                  key={`${company.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg border border-blue-200 dark:border-gray-500 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{company.name}</h3>
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="text-green-600 dark:text-green-400 font-bold text-sm"
                    >
                      {company.growth}
                    </motion.span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Sector:</span> {company.sector}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Funding:</span> {company.funding}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full">
                      {company.type.toUpperCase()}
                    </span>
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="flex items-center gap-1"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Message Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Send Message to Startups</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" rows="4" placeholder="Type your message here..." required />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition flex items-center gap-2">
                <Send className="w-5 h-5" /> Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}