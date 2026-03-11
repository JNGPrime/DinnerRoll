import { getUncachableStripeClient } from './stripeClient';
import { db } from './db';
import { sql } from 'drizzle-orm';

const DINNERROLL_PRODUCT_ID = 'prod_Tv7JeAzcB3DBTw';

export class StripeService {
  async createCustomer(email: string, metadata?: Record<string, string>) {
    const stripe = await getUncachableStripeClient();
    return await stripe.customers.create({
      email,
      metadata,
    });
  }

  async createCheckoutByPriceId(priceId: string, successUrl: string, cancelUrl: string, customerEmail?: string) {
    const stripe = await getUncachableStripeClient();

    const price = await stripe.prices.retrieve(priceId);
    const isRecurring = !!price.recurring;

    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    return await stripe.checkout.sessions.create(sessionParams);
  }

  async createSubscriptionCheckout(amountDollars: number, successUrl: string, cancelUrl: string, customerEmail?: string) {
    if (!Number.isInteger(amountDollars) || amountDollars < 3 || amountDollars > 100) {
      throw new Error('Amount must be a whole number between $3 and $100');
    }

    const stripe = await getUncachableStripeClient();
    const amountCents = amountDollars * 100;

    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product: DINNERROLL_PRODUCT_ID,
          unit_amount: amountCents,
          currency: 'usd',
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    return await stripe.checkout.sessions.create(sessionParams);
  }

  async getProduct(productId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE id = ${productId}`
    );
    return result.rows[0] || null;
  }

  async listProducts() {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE active = true`
    );
    return result.rows;
  }

  async listProductsWithPrices() {
    const result = await db.execute(
      sql`
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM stripe.products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        WHERE p.active = true
        ORDER BY p.id, pr.unit_amount
      `
    );
    return result.rows;
  }

  async getPrice(priceId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
    );
    return result.rows[0] || null;
  }
}

export const stripeService = new StripeService();
