'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Copy, Mail, RefreshCw, CheckCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'

export default function ResultsPage() {
  const { user, isLoaded } = useUser()
  const [data, setData] = useState<{
    counterOffer: string
    strategy: string
    tone: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem('negotiationResult')
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        
        const result = {
          counterOffer: parsedData.counterOffer || 'No counter-offer was generated.',
          strategy: parsedData.strategy || 'No strategy was generated.',
          tone: parsedData.tone || 'No tone guidelines were generated.'
        }
        
        setData(result)
        console.log("Loaded data from localStorage:", result)
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
    setLoading(false)
  }, [])

  const cleanText = (text: string) => {
    if (!text) return ''
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/Counter-Offer Draft:\s*/i, '')
      .replace(/Negotiation Strategy:\s*/i, '')
      .replace(/Tone Guidelines:\s*/i, '')
      .replace(/\n\s*\n/g, '\n')
      .trim()
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(cleanText(text))
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatEmail = (text: string) => {
    if (!text) return 'No counter-offer was generated.'
    
    const cleanedText = cleanText(text)
    
    if (!cleanedText.toLowerCase().includes('subject:')) {
      return 'Subject: Regarding Job Offer - Counter Proposal\n\n' + cleanedText
    }
    
    return cleanedText
  }

  const formatStrategy = (text: string) => {
    if (!text) return []
    
    const cleanedText = cleanText(text)
    
    const points = cleanedText
      .split(/\n\s*(?:\d+\.|[-•*])\s*/g)
      .filter(line => line.trim())
      .map(line => line.trim())
    
    if (points.length === 0 || (points.length === 1 && points[0] === cleanedText)) {
      return cleanedText.split('\n').filter(line => line.trim())
    }
    
    return points
  }
  
  const formatTone = (text: string) => {
    if (!text) return []
    
    const cleanedText = cleanText(text)
    
    const points = cleanedText
      .split(/\n\s*[-•*]\s*/g)
      .filter(line => line.trim())
      .map(line => line.trim())
    
    if (points.length === 0 || (points.length === 1 && points[0] === cleanedText)) {
      return cleanedText.split('\n').filter(line => line.trim())
    }
    
    return points
  }

  const handleSendEmail = async (content: string) => {
    if (!content || !isLoaded || !user) {
      alert(isLoaded && !user ? 'User is not logged in' : 'No content to send')
      return
    }
    
    const userEmail = user.primaryEmailAddress?.emailAddress
    if (!userEmail) {
      alert('Could not find your email address')
      return
    }
    
    setSendingEmail(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          to: userEmail,
          subject: 'Negotiation Counter-Offer Draft',
          html: content.replace(/\n/g, '<br>')
        })
      })
      
      const result = await response.json()
      if (response.ok) {
        alert(`Email sent successfully to ${userEmail}!`)
      } else {
        throw new Error(result.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Email error:', error)
      alert('Failed to send email: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
    setSendingEmail(false)
  }

  if (loading) {
    return (
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
        
        <div className="relative z-10 max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-400 rounded-full mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading your negotiation strategy...
            </motion.h1>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
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
        
        <div className="relative z-10 max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 shadow-2xl shadow-red-900/10"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.15)",
                borderColor: "rgba(239, 68, 68, 0.3)"
              }}
            >
              <motion.h1 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                No Results Found
              </motion.h1>
              <motion.p 
                className="text-gray-400 mb-8 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Please generate a negotiation strategy first.
              </motion.p>
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-violet-900/25">
                    ← Start New Negotiation
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  const emailContent = formatEmail(data.counterOffer)
  const strategyPoints = formatStrategy(data.strategy)
  const tonePoints = formatTone(data.tone)

  return (
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
      
      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-8">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 mt-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.h1 
              className="text-5xl font-black tracking-tight mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Your Negotiation
              </span>
              <motion.span 
                className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-light"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Strategy
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              AI-generated professional counter-offer and strategy
            </motion.p>
            <motion.div 
              className="w-24 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mt-4"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </div>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 text-gray-300 hover:bg-gray-800/60 hover:text-white hover:border-gray-600 px-6 py-3 rounded-xl">
                ← New Negotiation
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Counter-Offer Draft */}
        <motion.div 
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-blue-900/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
            borderColor: "rgba(59, 130, 246, 0.3)"
          }}
        >
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-7 h-7 text-blue-400" />
              </motion.div>
              Counter-Offer Draft
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => copyToClipboard(emailContent, 'offer')}
                className="bg-black/30 border border-gray-700/50 text-gray-300 hover:bg-black/50 hover:border-gray-600 backdrop-blur-sm"
              >
                <AnimatePresence mode="wait">
                  {copied === 'offer' ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Copied!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ 
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderColor: "rgba(75, 85, 99, 0.7)"
            }}
          >
            <div className="prose prose-invert max-w-none">
              <motion.div 
                className="whitespace-pre-wrap text-gray-100 leading-relaxed font-mono text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {emailContent}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Email Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: sendingEmail ? 1 : 1.02 }}
              whileTap={{ scale: sendingEmail ? 1 : 0.98 }}
            >
              <Button 
                onClick={() => handleSendEmail(emailContent)}
                className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-900/25 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={sendingEmail || !emailContent || !isLoaded || !user}
              >
                <AnimatePresence mode="wait">
                  {sendingEmail ? (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                      Sending...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send to {isLoaded && user?.primaryEmailAddress?.emailAddress || 'your email'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <AnimatePresence>
              {isLoaded && !user && (
                <motion.p 
                  className="text-amber-400 mt-2 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Please log in to send email.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Negotiation Strategy */}
        <motion.div 
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-green-900/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.15)",
            borderColor: "rgba(34, 197, 94, 0.3)"
          }}
        >
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Negotiation Strategy
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => copyToClipboard(data.strategy, 'strategy')}
                className="bg-black/30 border border-gray-700/50 text-gray-300 hover:bg-black/50 hover:border-gray-600 backdrop-blur-sm"
              >
                <AnimatePresence mode="wait">
                  {copied === 'strategy' ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Copied!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ 
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderColor: "rgba(75, 85, 99, 0.7)"
            }}
          >
            {strategyPoints.length > 0 ? (
              <div className="space-y-4">
                {strategyPoints.map((point, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0 shadow-lg shadow-green-900/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {i + 1}
                    </motion.div>
                    <p className="text-gray-100 leading-relaxed">
                      {point.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p 
                className="text-gray-400 italic text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                No strategy generated
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.15)",
            borderColor: "rgba(147, 51, 234, 0.3)"
          }}
        >
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tone Guidelines
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => copyToClipboard(data.tone, 'tone')}
                className="bg-black/30 border border-gray-700/50 text-gray-300 hover:bg-black/50 hover:border-gray-600 backdrop-blur-sm"
              >
                <AnimatePresence mode="wait">
                  {copied === 'tone' ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Copied!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ 
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderColor: "rgba(75, 85, 99, 0.7)"
            }}
          >
            {tonePoints.length > 0 ? (
              <div className="space-y-3">
                {tonePoints.map((point, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + (i * 0.08) }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2.5 flex-shrink-0 shadow-lg shadow-purple-900/50"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <p className="text-gray-100 leading-relaxed">
                      {point.replace(/^-\s*/, '')}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p 
                className="text-gray-400 italic text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                No tone guidelines generated
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-gray-900/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(75, 85, 99, 0.15)",
            borderColor: "rgba(75, 85, 99, 0.3)"
          }}
        >
          <motion.h3 
            className="text-xl font-bold text-gray-200 mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Quick Actions
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              <Button
                onClick={() => copyToClipboard(emailContent, 'full')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-900/25"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Email Draft
              </Button>
            </motion.div>
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Button className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:text-white hover:border-gray-600 px-6 py-3 rounded-xl">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Strategy
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}