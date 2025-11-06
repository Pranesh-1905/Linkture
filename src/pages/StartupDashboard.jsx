import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/navbar'
import GlossaryItem from '../components/GlossaryItem'
import { FileText, Upload, UserPlus, Users, X, BookOpen } from 'lucide-react'

export default function StartupDashboard() {
  const [profile, setProfile] = useState({
    name: 'John Startup',
    field: 'AI/ML',
    startupName: 'TechNova AI'
  })
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alice Johnson', role: 'CTO' },
    { id: 2, name: 'Bob Smith', role: 'Lead Developer' }
  ])
  const [newMember, setNewMember] = useState({ name: '', role: '' })

  const glossaryTerms = [
    {
      term: 'Seed Funding',
      definition: 'Initial capital raised by a startup to prove its concept and develop its product. Typically ranges from $500K to $2M.'
    },
    {
      term: 'Series A',
      definition: 'First significant round of venture capital financing. Companies raising Series A have a track record and are ready to scale.'
    },
    {
      term: 'Valuation',
      definition: 'The estimated worth of a company, calculated by multiplying the price per share by the total number of shares outstanding.'
    },
    {
      term: 'Pitch Deck',
      definition: 'A brief presentation used to provide investors with an overview of your business plan, product, fundraising needs, and key metrics.'
    },
    {
      term: 'Burn Rate',
      definition: 'The rate at which a company is spending its capital before generating positive cash flow from operations.'
    },
    {
      term: 'Equity',
      definition: 'Ownership interest in a company, typically in the form of stock. Startups often exchange equity for investment capital.'
    },
    {
      term: 'Term Sheet',
      definition: 'A non-binding agreement outlining the terms and conditions of an investment, including valuation, investment amount, and investor rights.'
    },
    {
      term: 'MVP (Minimum Viable Product)',
      definition: 'A version of a product with just enough features to satisfy early customers and provide feedback for future development.'
    }
  ]

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    if (newMember.name && newMember.role) {
      setTeamMembers([...teamMembers, { id: Date.now(), ...newMember }])
      setNewMember({ name: '', role: '' })
      toast.success('Team member added successfully!')
    }
  }

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
    toast.success('Team member removed')
  }

  const handleUploadPitchDeck = () => {
    toast.success('Pitch deck uploaded successfully!')
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Startup Dashboard</h1>
          <div className="text-gray-600 dark:text-gray-400 mb-8">Build your profile and connect with investors</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Field/Industry
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={profile.field}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Startup Name
                  </label>
                  <input
                    type="text"
                    name="startupName"
                    value={profile.startupName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Pitch Deck Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pitch Deck</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your pitch deck to attract investors</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUploadPitchDeck}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition flex items-center gap-2 mx-auto"
                >
                  <Upload className="w-5 h-5" />
                  Upload Pitch Deck
                </motion.button>
              </div>
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">Tip:</span> Include market size, traction, team, and financial projections in your pitch deck.
                </p>
              </div>
            </div>
          </div>

          {/* Team Formation Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Formation</h2>
            </div>
            
            {/* Current Team Members */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Current Team</h3>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Add New Member Form */}
            <form onSubmit={handleAddMember} className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Add Team Member</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Member Name"
                  required
                />
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Role"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Member
              </motion.button>
            </form>
          </div>

          {/* Glossary Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Terms Glossary</h2>
            </div>
            <div className="text-gray-600 dark:text-gray-400 mb-6">Essential terms every startup founder should know</div>
            <div>
              {glossaryTerms.map((item, index) => (
                <GlossaryItem
                  key={index}
                  term={item.term}
                  definition={item.definition}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
