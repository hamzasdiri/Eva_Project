import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

export const getStripeInstance = async () => {
  const stripe = await stripePromise;
  return stripe;
};
