'use client'
import { SignedIn } from '@clerk/nextjs'
import { NegotiationForm } from '@/components/NegotiationForm'
import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [suggestion, setSuggestion] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setError('')
      console.log('Submitting data:', data)
      
      const res = await axios.post('/api/ai-suggest', data)
      console.log('API Response:', res.data)
      
      localStorage.setItem('negotiationResult', JSON.stringify(res.data))
      
      window.location.href = '/results'
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.response?.data?.error || err.message || 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-600/15 to-indigo-600/15 rounded-full blur-3xl"
          animate={{
            x: [-200, -150, -200],
            y: [-200, -250, -200],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-teal-600/15 rounded-full blur-3xl"
          animate={{
            x: [200, 150, 200],
            y: [200, 250, 200],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/8 to-blue-600/12 rounded-full blur-3xl"
          animate={{
            x: [-128, -100, -128],
            y: [-128, -150, -128],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative z-10 max-w-2xl mx-auto p-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl font-black tracking-tight mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <motion.span 
                className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-light"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Negotiation Assistant
              </motion.span>
            </motion.h1>
            <motion.div 
              className="w-24 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>
          
          <motion.div 
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-violet-900/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.15)",
              borderColor: "rgba(139, 92, 246, 0.3)"
            }}
          >
            <NegotiationForm onSubmit={handleSubmit} />
          </motion.div>
          
          <AnimatePresence>
            {loading && (
              <motion.div 
                className="mt-6 p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-xl text-blue-300 rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-900/20"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="font-medium text-white">Generating suggestions...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="mt-6 p-6 bg-gradient-to-r from-red-900/20 to-rose-900/20 backdrop-blur-xl text-red-300 rounded-2xl border border-red-500/30 shadow-xl shadow-red-900/20"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.p 
                  className="font-medium"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Error: {error}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {suggestion && (
              <motion.div 
                className="mt-6 bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-emerald-900/10"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Suggested Counter-Offer
                </motion.h2>
                <motion.div 
                  className="bg-black/30 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderColor: "rgba(75, 85, 99, 0.7)"
                  }}
                >
                  <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono">
                    {suggestion.choices?.[0]?.message?.content || JSON.stringify(suggestion, null, 2)}
                  </pre>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SignedIn>
  )
}