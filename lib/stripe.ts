import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const TIER_PRICES = {
  seed: 2500, // €25.00
  sapling: 5000, // €50.00
  tree: 10000, // €100.00
  forest: 25000, // €250.00
}

export async function createCheckoutSession(params: {
  tier: keyof typeof TIER_PRICES | 'custom'
  customAmount?: number
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  metadata?: Record<string, string>
}) {
  const { tier, customAmount, successUrl, cancelUrl, customerEmail, metadata } = params
  
  const amount = tier === 'custom' && customAmount ? customAmount * 100 : TIER_PRICES[tier as keyof typeof TIER_PRICES]
  
  if (!amount) {
    throw new Error('Invalid tier or custom amount')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Support Tier: ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
            description: 'Carpathian Timber Frame Project Support',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      tier,
      ...metadata,
    },
  })

  return session
}

export async function constructEventFromPayload(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

export { stripe }
