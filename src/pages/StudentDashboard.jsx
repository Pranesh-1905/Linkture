import { motion } from 'framer-motion'
import Navbar from '../components/navbar'
import Card from '../components/Card'
import { 
  Rocket, DollarSign, TrendingUp, Target, BarChart, 
  Handshake, BookOpen, Lightbulb, Search, Users, Zap 
} from 'lucide-react'

export default function StudentDashboard() {
  const learningModules = [
    {
      icon: <Rocket className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      title: 'Startup Ecosystem Basics',
      description: 'Understand the fundamentals of startups, from ideation to product-market fit. Learn about lean startup methodology and agile development.'
    },
    {
      icon: <DollarSign className="w-10 h-10 text-green-600 dark:text-green-400" />,
      title: 'Funding Types & Stages',
      description: 'Explore different funding stages: bootstrapping, pre-seed, seed, Series A/B/C. Understand when and how startups raise capital.'
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: 'Investment Basics',
      description: 'Learn how VCs evaluate startups, calculate valuations, and make investment decisions. Understand terms like equity, dilution, and cap tables.'
    },
    {
      icon: <Target className="w-10 h-10 text-red-600 dark:text-red-400" />,
      title: 'Business Model Canvas',
      description: 'Master the Business Model Canvas framework to design, visualize, and pivot your business model effectively.'
    },
    {
      icon: <BarChart className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
      title: 'Growth & Metrics',
      description: 'Discover key metrics every startup should track: CAC, LTV, churn rate, burn rate, and runway. Learn how to measure product-market fit.'
    },
    {
      icon: <Handshake className="w-10 h-10 text-orange-600 dark:text-orange-400" />,
      title: 'Pitching & Networking',
      description: 'Develop skills to create compelling pitch decks and deliver persuasive presentations. Learn networking strategies for entrepreneurs.'
    }
  ]

  const resources = [
    {
      title: 'Recommended Reading',
      items: [
        'The Lean Startup by Eric Ries',
        'Zero to One by Peter Thiel',
        'The Hard Thing About Hard Things by Ben Horowitz',
        'Venture Deals by Brad Feld'
      ]
    },
    {
      title: 'Online Courses',
      items: [
        'Y Combinator Startup School',
        'Stanford\'s How to Start a Startup',
        'Coursera: Entrepreneurship Specialization',
        'edX: MITx Entrepreneurship 101'
      ]
    },
    {
      title: 'Useful Tools',
      items: [
        'Pitch Deck Templates (Sequoia, Y Combinator)',
        'Financial Modeling Templates',
        'Market Research Tools (CB Insights, Crunchbase)',
        'Startup Communities (Product Hunt, Indie Hackers)'
      ]
    }
  ]

  const successTips = [
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />,
      tip: 'Start with a problem you\'re passionate about solving'
    },
    {
      icon: <Search className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      tip: 'Validate your idea with real customers before building'
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      tip: 'Focus on building an MVP (Minimum Viable Product) first'
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-500 dark:text-green-400" />,
      tip: 'Track metrics from day one to measure progress'
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />,
      tip: 'Build a diverse team with complementary skills'
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
      tip: 'Embrace failure as a learning opportunity'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Student Learning Zone</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Your journey into entrepreneurship starts here</p>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Welcome, Future Entrepreneur!</h2>
            </div>
            <p className="text-lg opacity-90">
              Explore comprehensive learning modules, resources, and insights to kickstart your entrepreneurial journey. 
              Learn from successful founders and understand how to navigate the startup ecosystem.
            </p>
          </div>

          {/* Learning Modules */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Learning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModules.map((module, index) => (
                <Card
                  key={index}
                  icon={module.icon}
                  title={module.title}
                  description={module.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Success Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tips for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {successTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-600 dark:border-blue-400"
                >
                  <div className="flex items-start gap-3">
                    {tip.icon}
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{tip.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{resource.title}</h3>
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white rounded-xl shadow-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Ready to Take the Next Step?</h3>
            <p className="text-lg opacity-90 mb-6">
              Connect with mentors, join startup competitions, and start building your ideas today!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find a Mentor
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition flex items-center gap-2">
                <Users className="w-5 h-5" />
                Join Community
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
