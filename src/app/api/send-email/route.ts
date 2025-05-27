import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subject, html } = await req.json()
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { email: true }
    })
    
    if (!user?.email) {
      return NextResponse.json(
        { error: 'No registered email found for user' },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: user.email,
      subject,
      html,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
