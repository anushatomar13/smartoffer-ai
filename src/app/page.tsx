'use client'
import { SignedIn } from '@clerk/nextjs'
import { NegotiationForm } from '@/components/NegotiationForm'
import { useState } from 'react'
import axios from 'axios'

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
      
      // Store the result in localStorage
      localStorage.setItem('negotiationResult', JSON.stringify(res.data))
      
      // Navigate to results page
      window.location.href = '/results'
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.response?.data?.error || err.message || 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <SignedIn>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">AI-Powered Negotiation Assistant</h1>
        <NegotiationForm onSubmit={handleSubmit} />
        
        {loading && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
            <p>Generating suggestions...</p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>Error: {error}</p>
          </div>
        )}

        {suggestion && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Suggested Counter-Offer</h2>
            <pre className="whitespace-pre-wrap">
              {suggestion.choices?.[0]?.message?.content || JSON.stringify(suggestion, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </SignedIn>
  )
}