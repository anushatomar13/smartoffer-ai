import dataset from '@/lib/negotiation-dataset.json'
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

// Helper function to parse experience range inputs
function parseExperienceRange(expRange: string | number): [number, number] {
  if (typeof expRange === 'string') {
    const parts = expRange.split('-').map(part => parseInt(part.trim()))
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return [parts[0], parts[1]]
    }
    const singleVal = parseInt(expRange)
    if (!isNaN(singleVal)) return [singleVal, singleVal]
  } else if (typeof expRange === 'number') {
    return [expRange, expRange]
  }
  return [0, 0]
}

function rangesOverlap(a: [number, number], b: [number, number]): boolean {
  return a[0] <= b[1] && b[0] <= a[1]
}

function parseAIResponse(rawResponse: string) {
  console.log('Raw AI Response:', rawResponse)
  
  // First attempt: Try to extract sections using regex with more flexible patterns
  let counterOffer = ''
  let strategy = ''
  let tone = ''
  
  // Pattern to match each section with more flexibility in header format
  // This handles variations in headers like "Counter-Offer:", "Counter Offer Draft:", etc.
  const counterOfferMatch = rawResponse.match(/(?:Counter[\s-]Offer(?:\s+Draft)?:?[\s\n]*)([\s\S]*?)(?=(?:Negotiation\s+Strategy|Tone\s+Guidelines):?|$)/i)
  const strategyMatch = rawResponse.match(/(?:Negotiation\s+Strategy:?[\s\n]*)([\s\S]*?)(?=(?:Tone\s+Guidelines):?|$)/i)
  const toneMatch = rawResponse.match(/(?:Tone\s+Guidelines:?[\s\n]*)([\s\S]*?)$/i)
  
  if (counterOfferMatch && counterOfferMatch[1]) {
    counterOffer = counterOfferMatch[1].trim()
  }
  
  if (strategyMatch && strategyMatch[1]) {
    strategy = strategyMatch[1].trim()
  }
  
  if (toneMatch && toneMatch[1]) {
    tone = toneMatch[1].trim()
  }
  
  // If the first method fails to extract all sections, try an alternative approach
  if (!counterOffer || !strategy || !tone) {
    console.log('First parsing method incomplete, trying alternative...')
    
    // Split by major section headers
    const sections = rawResponse.split(/(?:Counter[\s-]Offer(?:\s+Draft)?:?|Negotiation\s+Strategy:?|Tone\s+Guidelines:?)/i)
    
    // Remove the first element if it's empty (which is likely)
    if (sections[0].trim() === '') {
      sections.shift()
    }
    
    // Assign sections if we found something
    if (sections.length >= 1 && !counterOffer) {
      counterOffer = sections[0].trim()
    }
    
    if (sections.length >= 2 && !strategy) {
      strategy = sections[1].trim()
    }
    
    if (sections.length >= 3 && !tone) {
      tone = sections[2].trim()
    }
  }
  
  // Final parsing method: Try to find content by looking for number points and bullet points
  if (!strategy) {
    // Strategy often has numbered points (1., 2., 3.)
    const numberedPointsMatch = rawResponse.match(/\n\s*(?:1\.|\(1\))\s+(.*?)(?=\n\s*(?:Tone|$))/s)
    if (numberedPointsMatch) {
      strategy = numberedPointsMatch[0].trim()
    }
  }
  
  if (!tone) {
    // Tone often has bullet points
    const bulletPointsMatch = rawResponse.match(/\n\s*(?:-|\*)\s+Recommended tone:.*$/s)
    if (bulletPointsMatch) {
      tone = bulletPointsMatch[0].trim()
    }
  }
  
  // Clean up the content
  const cleanContent = (text: string) => {
    return text
      .replace(/^\s*\n+/g, '') // Remove leading newlines
      .replace(/\n+\s*$/g, '') // Remove trailing newlines
      .trim()
  }
  
  // Sometimes an email has "Subject:" at the beginning - let's make sure it stays with the counter offer
  if (counterOffer && !counterOffer.toLowerCase().includes('subject:') && rawResponse.includes('Subject:')) {
    const subjectLine = rawResponse.match(/Subject:.*?\n/i)
    if (subjectLine) {
      counterOffer = subjectLine[0] + counterOffer
    }
  }
  
  const result = {
    counterOffer: cleanContent(counterOffer),
    strategy: cleanContent(strategy),
    tone: cleanContent(tone)
  }
  
  console.log('Parsed sections:', {
    counterOfferLength: result.counterOffer.length,
    strategyLength: result.strategy.length,
    toneLength: result.tone.length
  })
  
  // If we completely failed to parse any section, use a fallback approach
  if (!result.counterOffer && !result.strategy && !result.tone) {
    console.log('All parsing methods failed, using emergency fallback')
    
    // Emergency fallback: just split the content into approximate thirds
    const lines = rawResponse.split('\n').filter(line => line.trim())
    const sectionSize = Math.ceil(lines.length / 3)
    
    result.counterOffer = lines.slice(0, sectionSize).join('\n')
    result.strategy = lines.slice(sectionSize, sectionSize * 2).join('\n')
    result.tone = lines.slice(sectionSize * 2).join('\n')
  }
  
  return result
}

export async function POST(req: NextRequest) {
  try {
    const { domain, experience, education, expectations, offerText } = await req.json()
    
    console.log('Request data:', { domain, experience, education, expectations, offerText })
    
    const userExpRange = parseExperienceRange(experience)
    
    const similarCases = dataset.filter(item => {
      const itemExpRange = parseExperienceRange(item.experience)
      return item.domain === domain && rangesOverlap(userExpRange, itemExpRange)
    }).slice(0, 3)
    
    let examples = ''
    similarCases.forEach((caseItem, index) => {
      examples += `Example ${index + 1}:\n- Position: ${caseItem.domain}\n- Offer: ${caseItem.offerText}\n\n`
    })
    
    const prompt = `
You are a professional career negotiation expert. Generate a comprehensive response with these THREE distinct sections:

Counter-Offer Draft:
Write a professional email template for salary negotiation. Start with "Subject:" and include a complete, polite email.

Negotiation Strategy:
Provide exactly 3 numbered strategic points:
1. [First leverage point]
2. [Second leverage point] 
3. [Trade-off or alternative suggestion]

Tone Guidelines:
Provide specific guidance in this format:
- Recommended tone: [tone description]
- Use phrases: [2-3 specific phrases]
- Avoid: [phrases to avoid]

Context:
- Industry: ${domain}
- Experience: ${experience} years
- Education: ${education}
- Expectations: ${expectations}
- Offer Details: ${offerText}

Relevant Examples:
${examples}

Make sure each section is clearly separated and labeled.`
    
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
    
    const rawResponse = response.data.choices[0].message.content
    const result = parseAIResponse(rawResponse)
    
    // Fallback if parsing fails completely
    if (!result.counterOffer && !result.strategy && !result.tone) {
      console.log('Parsing failed completely, using fallback')
      return NextResponse.json({
        counterOffer: rawResponse,
        strategy: 'Parsing failed. Please regenerate the response.',
        tone: 'Parsing failed. Please regenerate the response.'
      })
    }
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Groq API Error:', error)
    return NextResponse.json(
      { error: 'AI suggestion failed. Please try again.' },
      { status: 500 }
    )
  }
}