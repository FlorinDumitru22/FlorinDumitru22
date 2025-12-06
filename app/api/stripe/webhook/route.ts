import { NextRequest, NextResponse } from 'next/server'
import { constructEventFromPayload } from '@/lib/stripe'
import dbConnect from '@/lib/mongodb'
import Supporter from '@/models/Supporter'
import Funding from '@/models/Funding'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    const event = await constructEventFromPayload(body, signature)

    await dbConnect()

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as unknown as {
        id: string
        metadata: { name?: string; tier: string; message?: string }
        customer_details?: { email?: string }
        amount_total: number
        customer?: string
      }

      // Create or update supporter record
      const supporter = await Supporter.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          name: session.metadata.name || 'Anonymous',
          email: session.customer_details?.email || '',
          amount: session.amount_total / 100,
          tier: session.metadata.tier,
          message: session.metadata.message,
          anonymous: !session.metadata.name,
          stripeCustomerId: session.customer,
          status: 'completed',
        },
        { upsert: true, new: true }
      )

      // Update funding totals
      const funding = await Funding.findOne()
      if (funding) {
        funding.currentAmount += supporter.amount
        funding.supporterCount += 1
        await funding.save()
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
