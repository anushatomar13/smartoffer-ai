'use client'
import { useState } from 'react'
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import axios from 'axios'

export default function Home() {
  const [offer, setOffer] = useState('')
  const [suggestion, setSuggestion] = useState<any>(null)
  const { user } = useUser()

  const handleSubmit = async () => {
    const res = await axios.post('/api/ai-suggest', { offerText: offer })
    setSuggestion(res.data)
    // Save to DB here via another API route if desired
  }

  return (
    <>
      <SignedIn>
        <div className="max-w-xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Job Offer Negotiator AI</h1>
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={8}
            placeholder="Paste your job offer email here..."
            value={offer}
            onChange={e => setOffer(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Get Counter-Offer
          </button>
          {suggestion && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <h2 className="font-semibold">Counter-Offer Message</h2>
              <p className='bg-black'>{suggestion.choices?.[0]?.message?.content}</p>
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="mb-4">Please sign in to use the app.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </>
  )
}
