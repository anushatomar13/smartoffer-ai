// app/api/ai-suggest/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { offerText } = await req.json()
    
    // Updated prompt
    const prompt = `Analyze this job offer and suggest a professional counter-offer. Offer:
${offerText}
Respond in this exact format:
### Counter-Offer Draft
[your text here]
### Tone Suggestions
[your tips here]`

    // Correct Groq API endpoint and model
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions', // Fixed URL
      {
        model: 'llama3-70b-8192', // Updated model name
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Groq API Error:', error)
    return NextResponse.json(
      { error: 'AI suggestion failed' },
      { status: 500 }
    )
  }
}
