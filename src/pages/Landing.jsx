
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Card from '../components/Card'
import { Rocket, Briefcase, GraduationCap, Zap, Bot, Leaf } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Rocket className="w-10 h-10 text-blue-600 dark:text-blue-400" />, 
      title: 'For Startups',
      description: 'Upload pitch decks, connect with investors, and build your dream team.'
    },
    {
      icon: <Briefcase className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />, 
      title: 'For VCs',
      description: 'Discover promising startups, review pitch decks, and manage your portfolio.'
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-purple-600 dark:text-purple-400" />, 
      title: 'For Students',
      description: 'Learn about entrepreneurship, funding, and the startup ecosystem.'
    }
  ]

  const successStories = [
    {
      icon: <Zap className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />, 
      title: 'TechNova',
      description: 'Secured $2M seed funding after connecting with Alpha Ventures through Linkture. Now serving 50K+ users across 15 countries.'
    },
    {
      icon: <Bot className="w-10 h-10 text-pink-500 dark:text-pink-400" />, 
      title: 'Alpha Ventures',
      description: 'Discovered and funded 3 AI startups via Linkture, building a diverse portfolio worth $15M in just 8 months.'
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-600 dark:text-green-400" />, 
      title: 'EcoGrow',
      description: 'Found investors and mentors through Linkture, increasing user base by 150% and expanding to 5 new cities.'
    }
  ]

  const stats = [
    { value: '500+', label: 'Startups' },
    { value: '200+', label: 'Investors' },
    { value: '$50M+', label: 'Funded' },
    { value: '1000+', label: 'Students' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <span className="block mt-2">✨ Linkture</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The platform that connects startup founders, venture capitalists, and aspiring entrepreneurs to build the future together.
          </motion.p>
          
          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition"
          >
            Get Started →
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          How Linkture Created Change
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Real stories from our community
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card
              key={index}
              icon={story.icon}
              title={story.title}
              description={story.description}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of founders, investors, and students building the future.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            Sign Up Now
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
