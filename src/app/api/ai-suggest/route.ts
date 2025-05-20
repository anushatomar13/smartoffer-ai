import dataset from '@/lib/negotiation-dataset.json'
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

// Helper function to parse experience range inputs
function parseExperienceRange(expRange: string | number): [number, number] {
  if (typeof expRange === 'string') {
    // Handles ranges like "3-5" and single values like "5"
    const parts = expRange.split('-').map(part => parseInt(part.trim()))
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return [parts[0], parts[1]]
    }
    const singleVal = parseInt(expRange)
    if (!isNaN(singleVal)) return [singleVal, singleVal]
  } else if (typeof expRange === 'number') {
    return [expRange, expRange]
  }
  return [0, 0] // fallback for invalid formats
}

// Function to check if ranges overlap
function rangesOverlap(a: [number, number], b: [number, number]): boolean {
  return a[0] <= b[1] && b[0] <= a[1]
}

export async function POST(req: NextRequest) {
  try {
    const { domain, experience, education, expectations, offerText } = await req.json()
    
    // Parse user's experience (handles numbers and strings)
    const userExpRange = parseExperienceRange(experience)

    // Retrieve similar cases from dataset
    const similarCases = dataset.filter(item => {
      const itemExpRange = parseExperienceRange(item.experience)
      return (
        item.domain === domain &&
        rangesOverlap(userExpRange, itemExpRange)
      )
    }).slice(0, 3)

    // Build examples string for the prompt
    let examples = ''
    similarCases.forEach((caseItem, index) => {
      examples += `Example ${index + 1}:\n` +
        `- Position: ${caseItem.domain}\n` +
        `- Experience Range: ${caseItem.experience} years\n` +
        `- Original Offer: ${caseItem.offerText}\n\n`
    })

    // Construct the final prompt for the LLM
    const prompt = `
Generate a professional counter-offer using this context:
**Candidate Profile**
- Industry: ${domain}
- Experience: ${experience} years
- Education: ${education}
- Key Expectations: ${expectations}

**Job Offer Details**
${offerText}

**Relevant Historical Examples**
${examples}

**Required Response Format**
### Counter-Offer Draft
[Professional email template with placeholders for numbers and specific terms]

### Negotiation Strategy
1. Primary leverage points based on industry standards
2. Recommended trade-offs considering experience range
3. Ideal timeline for resolution

### Tone Guidelines
- Recommended tone: [select from: professional/persuasive/collegial]
- Effective phrases: [3-5 industry-specific terms from examples]
- Avoid: [out-of-context comparisons/emotional language]
`

    // Call Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 2000
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
      { error: 'AI suggestion failed. Please try again.' },
      { status: 500 }
    )
  }
}
