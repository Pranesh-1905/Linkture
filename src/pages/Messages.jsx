import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/navbar'
import { Send } from 'lucide-react'

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messageText, setMessageText] = useState('')
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, sender: 'them', text: 'Hi! We saw your profile and are interested in learning more.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Great! I\'d love to discuss our Series A round.', time: '10:35 AM' },
      { id: 3, sender: 'them', text: 'Perfect! We specialize in AI startups.', time: '10:40 AM' },
      { id: 4, sender: 'them', text: 'Thanks for your interest!', time: '10:42 AM' },
    ],
    2: [
      { id: 1, sender: 'them', text: 'Your pitch deck looks impressive.', time: '9:15 AM' },
      { id: 2, sender: 'me', text: 'Thank you! Would you like to schedule a demo?', time: '9:20 AM' },
      { id: 3, sender: 'them', text: 'Let\'s schedule a call', time: '9:25 AM' },
    ],
    3: [
      { id: 1, sender: 'them', text: 'Pitch deck sent', time: '8:00 AM' },
      { id: 2, sender: 'me', text: 'Received! Will review shortly.', time: '8:05 AM' },
    ],
    4: [
      { id: 1, sender: 'them', text: 'Great presentation!', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Thank you! Looking forward to next steps.', time: 'Yesterday' },
    ],
    5: [
      { id: 1, sender: 'them', text: 'Looking forward to collaborating', time: '2d ago' },
    ],
  })
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const chats = [
    { id: 1, name: 'TechNova AI', avatar: '🤖', lastMessage: conversations[1]?.[conversations[1].length - 1]?.text || 'No messages', time: '2m ago', unread: 2 },
    { id: 2, name: 'Alpha Ventures', avatar: '💼', lastMessage: conversations[2]?.[conversations[2].length - 1]?.text || 'No messages', time: '1h ago', unread: 0 },
    { id: 3, name: 'EcoGrow Team', avatar: '🌱', lastMessage: conversations[3]?.[conversations[3].length - 1]?.text || 'No messages', time: '3h ago', unread: 1 },
    { id: 4, name: 'Beta Capital', avatar: '👥', lastMessage: conversations[4]?.[conversations[4].length - 1]?.text || 'No messages', time: '1d ago', unread: 0 },
    { id: 5, name: 'HealthTech Pro', avatar: '🏥', lastMessage: conversations[5]?.[conversations[5].length - 1]?.text || 'No messages', time: '2d ago', unread: 0 },
  ]

  const currentMessages = conversations[selectedChat] || []

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentMessages, selectedChat])

  // Get current time formatted
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: messageText.trim(),
        time: getCurrentTime()
      }
      
      setConversations(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }))
      
      toast.success('Message sent!')
      setMessageText('')
      
      // Simulate a reply after 2 seconds
      setTimeout(() => {
        const replyMessage = {
          id: Date.now() + 1,
          sender: 'them',
          text: 'Thanks for your message! We\'ll get back to you shortly.',
          time: getCurrentTime()
        }
        setConversations(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), replyMessage]
        }))
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{chat.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <div className="text-3xl">{chats.find(c => c.id === selectedChat)?.avatar}</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{chats.find(c => c.id === selectedChat)?.name}</h3>
                <p className="text-sm text-green-600 dark:text-green-400">● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {currentMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                currentMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'} rounded-2xl px-4 py-3`}>
                      <p className="break-words">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>{message.time}</p>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!messageText.trim()}
                  className={`font-bold px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2 ${
                    messageText.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
