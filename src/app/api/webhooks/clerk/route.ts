import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return new Response('Webhook secret not configured', { status: 500 })

  const headerPayload =  await headers()

const svixHeaders = {
  'svix-id': headerPayload.get('svix-id') ?? '',
  'svix-timestamp': headerPayload.get('svix-timestamp') ?? '',
  'svix-signature': headerPayload.get('svix-signature') ?? '',
};


  const wh = new Webhook(secret)
  const payload = await req.json()
  
  try {
    const event = wh.verify(JSON.stringify(payload), svixHeaders as any) as WebhookEvent

    if (event.type === 'user.created' || event.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = event.data
      
      if (!email_addresses?.[0]?.email_address) {
        return new Response('No email found in Clerk data', { status: 400 })
      }

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || null,
        },
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || null,
        },
      })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response('Invalid webhook', { status: 400 })
  }
}
