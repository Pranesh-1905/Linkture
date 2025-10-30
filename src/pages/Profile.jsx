import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/navbar'
import { useAuth } from '../App'

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: user?.email || 'user@linkture.com',
    role: user?.role || 'startup',
    bio: 'Passionate entrepreneur building the future of AI',
    company: 'TechNova AI',
    location: 'San Francisco, CA',
    website: 'https://technova.ai',
    linkedin: 'linkedin.com/in/johndoe',
    twitter: '@johndoe',
  })

  const stats = [
    { label: 'Connections', value: '142' },
    { label: 'Messages', value: '23' },
    { label: 'Profile Views', value: '856' },
    { label: 'Projects', value: '5' },
  ]

  const achievements = [
    { icon: '🏆', title: 'Early Adopter', description: 'Joined in the first month' },
    { icon: '⭐', title: 'Top Contributor', description: '50+ connections made' },
    { icon: '🎯', title: 'Goal Achiever', description: 'Completed profile' },
    { icon: '🔥', title: 'Hot Streak', description: '7 days active' },
  ]

  const activities = [
    { action: 'Connected with', target: 'Alpha Ventures', time: '2 hours ago', icon: '🤝' },
    { action: 'Updated', target: 'pitch deck', time: '1 day ago', icon: '📊' },
    { action: 'Attended', target: 'Startup Summit', time: '3 days ago', icon: '📅' },
    { action: 'Joined', target: 'AI Founders Group', time: '1 week ago', icon: '👥' },
  ]

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold capitalize">{profile.role}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </motion.button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea name="bio" value={profile.bio} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input name="company" value={profile.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input name="location" value={profile.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold text-gray-700 dark:text-gray-400">Company:</span> <span className="text-gray-900 dark:text-white">{profile.company}</span></div>
                  <div><span className="font-semibold text-gray-700 dark:text-gray-400">Location:</span> <span className="text-gray-900 dark:text-white">{profile.location}</span></div>
                  <div><span className="font-semibold text-gray-700 dark:text-gray-400">Website:</span> <span className="text-blue-600 dark:text-blue-400">{profile.website}</span></div>
                  <div><span className="font-semibold text-gray-700 dark:text-gray-400">Email:</span> <span className="text-gray-900 dark:text-white">{profile.email}</span></div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-semibold">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg cursor-pointer"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {['Share Profile', 'Download Resume', 'View Analytics', 'Settings'].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success(`${action} clicked!`)}
                    className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white font-medium transition"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
