import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Cliente Stripe para frontend
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

// Cliente Stripe para backend (server-side)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})
