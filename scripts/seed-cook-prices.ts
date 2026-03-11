import { getUncachableStripeClient } from '../server/stripeClient';

const DINNERROLL_PRODUCT_ID = 'prod_Tv7JeAzcB3DBTw';

async function seedCookPrices() {
  const stripe = await getUncachableStripeClient();

  const existingPrices = await stripe.prices.list({ product: DINNERROLL_PRODUCT_ID, active: true });
  
  const hasMonthly = existingPrices.data.some(p => p.unit_amount === 499 && p.recurring?.interval === 'month');
  const hasLifetime = existingPrices.data.some(p => p.unit_amount === 2999 && !p.recurring);

  if (!hasMonthly) {
    const monthly = await stripe.prices.create({
      product: DINNERROLL_PRODUCT_ID,
      unit_amount: 499,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { plan: 'cook_monthly' },
    });
    console.log('Created monthly price:', monthly.id, '$4.99/month');
  } else {
    const mp = existingPrices.data.find(p => p.unit_amount === 499 && p.recurring?.interval === 'month');
    console.log('Monthly price already exists:', mp?.id);
  }

  if (!hasLifetime) {
    const lifetime = await stripe.prices.create({
      product: DINNERROLL_PRODUCT_ID,
      unit_amount: 2999,
      currency: 'usd',
      metadata: { plan: 'cook_lifetime' },
    });
    console.log('Created lifetime price:', lifetime.id, '$29.99 one-time');
  } else {
    const lp = existingPrices.data.find(p => p.unit_amount === 2999 && !p.recurring);
    console.log('Lifetime price already exists:', lp?.id);
  }

  console.log('\nAll active prices for DinnerRoll:');
  const allPrices = await stripe.prices.list({ product: DINNERROLL_PRODUCT_ID, active: true });
  for (const p of allPrices.data) {
    const type = p.recurring ? `${p.recurring.interval}ly` : 'one-time';
    console.log(`  ${p.id}: $${(p.unit_amount! / 100).toFixed(2)} (${type}) metadata:`, p.metadata);
  }
}

seedCookPrices().catch(console.error);
