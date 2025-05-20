// app/page.tsx
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
      const res = await axios.post('/api/ai-suggest', data)
      setSuggestion(res.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate suggestion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SignedIn>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">AI-Powered Negotiation Assistant</h1>
        <NegotiationForm onSubmit={handleSubmit} />
        
        {loading && <p className="mt-4 text-blue-600">Generating suggestions...</p>}
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {suggestion && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Suggested Counter-Offer</h2>
            <pre className="whitespace-pre-wrap">
              {suggestion.choices[0].message.content}
            </pre>
          </div>
        )}
      </div>
    </SignedIn>
  )
}
