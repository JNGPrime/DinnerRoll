// Seed script for DinnerRoll Stripe product
// Run this once to create the $1.99 DinnerRoll product in Stripe
// Usage: npx tsx scripts/seed-stripe-products.ts

import { getUncachableStripeClient } from '../server/stripeClient';

async function createDinnerRollProduct() {
  console.log('Creating DinnerRoll product in Stripe...');
  
  const stripe = await getUncachableStripeClient();

  // Check if product already exists
  const existingProducts = await stripe.products.search({ 
    query: "name:'DinnerRoll App'" 
  });
  
  if (existingProducts.data.length > 0) {
    console.log('DinnerRoll product already exists:', existingProducts.data[0].id);
    
    // Check for existing price
    const prices = await stripe.prices.list({
      product: existingProducts.data[0].id,
      active: true
    });
    
    if (prices.data.length > 0) {
      console.log('Price already exists:', prices.data[0].id, '- $' + (prices.data[0].unit_amount! / 100).toFixed(2));
    }
    return;
  }

  // Create the DinnerRoll product
  const product = await stripe.products.create({
    name: 'DinnerRoll App',
    description: 'Lifetime access to DinnerRoll - Your personal dinner decision assistant. Spin the wheel, find recipes, and never wonder what\'s for dinner again!',
    metadata: {
      type: 'one_time_purchase',
      feature: 'full_access',
    }
  });

  console.log('Created product:', product.id);

  // Create the $1.99 one-time price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 199, // $1.99 in cents
    currency: 'usd',
    metadata: {
      display_name: 'Lifetime Access'
    }
  });

  console.log('Created price:', price.id, '- $1.99 (one-time purchase)');
  console.log('\nDinnerRoll product setup complete!');
  console.log('Product ID:', product.id);
  console.log('Price ID:', price.id);
}

createDinnerRollProduct()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error creating product:', error);
    process.exit(1);
  });
