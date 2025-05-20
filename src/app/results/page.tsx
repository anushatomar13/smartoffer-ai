'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Copy, Mail, RefreshCw } from 'lucide-react'

export default function ResultsPage() {
  const [data, setData] = useState<{
    counterOffer: string
    strategy: string
    tone: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('negotiationResult')
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        
        // Ensure we have all three sections
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
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      // Remove section headers from content
      .replace(/Counter-Offer Draft:\s*/i, '')
      .replace(/Negotiation Strategy:\s*/i, '')
      .replace(/Tone Guidelines:\s*/i, '')
      // Clean up extra whitespace
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

  // Format counter offer email content
  const formatEmail = (text: string) => {
    if (!text) return 'No counter-offer was generated.'
    
    const cleanedText = cleanText(text)
    
    // Check if we need to add a Subject line
    if (!cleanedText.toLowerCase().includes('subject:')) {
      return 'Subject: Regarding Job Offer - Counter Proposal\n\n' + cleanedText
    }
    
    return cleanedText
  }

  // Format strategy content as bullet points
  const formatStrategy = (text: string) => {
    if (!text) return []
    
    const cleanedText = cleanText(text)
    
    // Split by numbering patterns (1., 2., etc.) or bullet points
    const points = cleanedText
      .split(/\n\s*(?:\d+\.|[-•*])\s*/g)
      .filter(line => line.trim())
      .map(line => line.trim())
    
    // If we couldn't find any points, try splitting by newlines
    if (points.length === 0 || (points.length === 1 && points[0] === cleanedText)) {
      return cleanedText.split('\n').filter(line => line.trim())
    }
    
    return points
  }
  
  // Format tone guidelines as bullet points
  const formatTone = (text: string) => {
    if (!text) return []
    
    const cleanedText = cleanText(text)
    
    // Split by bullet points or dashes at the beginning of lines
    const points = cleanedText
      .split(/\n\s*[-•*]\s*/g)
      .filter(line => line.trim())
      .map(line => line.trim())
    
    // If we couldn't find any points, try splitting by newlines
    if (points.length === 0 || (points.length === 1 && points[0] === cleanedText)) {
      return cleanedText.split('\n').filter(line => line.trim())
    }
    
    return points
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <h1 className="text-2xl font-semibold">Loading your negotiation strategy...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">No Results Found</h1>
            <p className="text-slate-300 mb-6">Please generate a negotiation strategy first.</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                ← Start New Negotiation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const emailContent = formatEmail(data.counterOffer)
  const strategyPoints = formatStrategy(data.strategy)
  const tonePoints = formatTone(data.tone)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Negotiation Strategy
            </h1>
            <p className="text-slate-400 mt-2">AI-generated professional counter-offer and strategy</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
              ← New Negotiation
            </Button>
          </Link>
        </div>

        {/* Counter-Offer Draft */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Counter-Offer Draft
            </h2>
            <Button
              onClick={() => copyToClipboard(emailContent, 'offer')}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'offer' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-slate-100 leading-relaxed font-mono text-sm sm:text-base">
                {emailContent}
              </div>
            </div>
          </div>
          
          <SendEmailButton content={emailContent} />
        </div>

        {/* Negotiation Strategy */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-green-400">
              Negotiation Strategy
            </h2>
            <Button
              onClick={() => copyToClipboard(data.strategy, 'strategy')}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'strategy' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6">
            {strategyPoints.length > 0 ? (
              <div className="space-y-4">
                {strategyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-slate-100 leading-relaxed">
                      {point.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">No strategy generated</p>
            )}
          </div>
        </div>

        {/* Tone Guidelines */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-purple-400">
              Tone Guidelines
            </h2>
            <Button
              onClick={() => copyToClipboard(data.tone, 'tone')}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'tone' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6">
            {tonePoints.length > 0 ? (
              <div className="space-y-3">
                {tonePoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <p className="text-slate-100 leading-relaxed">
                      {point.replace(/^-\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">No tone guidelines generated</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => copyToClipboard(emailContent, 'full')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Email Draft
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Strategy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SendEmailButton({ content }: { content: string }) {
  const [loading, setLoading] = useState(false)

  const handleSendEmail = async () => {
    if (!content) {
      alert('No content to send')
      return
    }
    
    setLoading(true)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          to: prompt("Please enter your email address:"),
          subject: 'Negotiation Counter-Offer Draft',
          html: content.replace(/\n/g, '<br>')
        })
      })
      alert('Email sent successfully!')
    } catch (error) {
      console.error('Email error:', error)
      alert('Failed to send email')
    }
    setLoading(false)
  }

  return (
    <Button 
      onClick={handleSendEmail}
      className="mt-6 bg-green-600 hover:bg-green-700 text-white"
      disabled={loading || !content}
    >
      <Mail className="w-4 h-4 mr-2" />
      {loading ? 'Sending...' : 'Send via Email'}
    </Button>
  )
}