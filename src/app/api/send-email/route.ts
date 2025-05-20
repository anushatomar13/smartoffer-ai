import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json()
  const data = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to,
    subject,
    html,
  })
  return NextResponse.json(data)
}
