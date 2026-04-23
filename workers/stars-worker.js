// Cloudflare Workers for Telegram Stars payment webhook
// Deploy to Cloudflare Workers (free tier: 100K requests/day)

const TELEGRAM_BOT_TOKEN = ''; // Add your bot token via Cloudflare secrets
const PREMIUM_SECRET = ''; // Secret to verify webhook calls

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS for preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create invoice link for premium purchase
    if (url.pathname === '/api/create-invoice' && request.method === 'POST') {
      try {
        const { tier_id, user_id } = await request.json();
        
        const prices = {
          'premium_monthly': [{ label: 'Premium Monthly', amount: 99 }],
          'premium_lifetime': [{ label: 'Premium Lifetime', amount: 499 }]
        };
        
        if (!prices[tier_id]) {
          return new Response(JSON.stringify({ error: 'Invalid tier' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const payload = JSON.stringify({ tier_id, user_id, ts: Date.now() });
        
        const invoiceData = {
          title: tier_id === 'premium_monthly' ? 'Premium Monthly' : 'Premium Lifetime',
          description: 'Anti-Budget Premium Access',
          payload: btoa(payload),
          provider_token: '', // Empty for Stars (XTR)
          currency: 'XTR',
          prices: prices[tier_id]
        };

        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createInvoiceLink`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoiceData)
          }
        );

        const result = await response.json();
        
        if (result.ok) {
          return new Response(JSON.stringify({ invoiceLink: result.result }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ error: result.description }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Telegram webhook handler
    if (url.pathname === '/webhook' && request.method === 'POST') {
      try {
        const update = await request.json();
        
        // Check pre_checkout_query (optional, for large orders)
        if (update.pre_checkout_query) {
          const query = update.pre_checkout_query;
          await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerPreCheckoutQuery`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ok: true, pre_checkout_query_id: query.id })
            }
          );
        }

        // Handle successful payment
        if (update.message?.successful_payment) {
          const payment = update.message.successful_payment;
          const payload = JSON.parse(atob(payment.invoice_payload));
          
          // Grant premium to user (store in KV or external DB)
          const userId = payload.user_id;
          const tierId = payload.tier_id;
          
          console.log(`Payment received: user=${userId}, tier=${tierId}`);
          
          // TODO: Store premium status in KV
          // await PREMIUM.put(`premium:${userId}`, JSON.stringify({
          //   tier: tierId,
          //   paidAt: Date.now()
          // }));
          
          // Send confirmation message
          await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: update.message.from.id,
                text: '✅ Payment successful!\n\n🎉 Thank you for supporting Anti-Budget!\n\nYour premium is now active.'
              })
            }
          );
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error('Webhook error:', err);
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Verify premium status
    if (url.pathname === '/api/premium' && request.method === 'GET') {
      const userId = url.searchParams.get('user_id');
      
      if (!userId) {
        return new Response(JSON.stringify({ premium: false }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // TODO: Check from KV
      // const data = await PREMIUM.get(`premium:${userId}`);
      // if (data) {
      //   const premium = JSON.parse(data);
      //   // Check expiry for monthly
      //   if (premium.tier === 'premium_monthly' && Date.now() > premium.expiresAt) {
      //     return new Response(JSON.stringify({ premium: false }));
      //   }
      //   return new Response(JSON.stringify({ premium: true, tier: premium.tier }));
      // }

      return new Response(JSON.stringify({ premium: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};