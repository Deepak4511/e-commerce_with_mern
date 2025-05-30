

const paypal = require('@paypal/checkout-server-sdk');

// Create sandbox environment with client ID and secret
const environment = new paypal.core.SandboxEnvironment(
  'AY05R0CcsSQil9cspsBVX4r4Itvng9TpqVwq1VvivpvAAibe9PxyzJ1D43XdRJhf7JIAV_Ncm0GwP4ZL',
  'EPWWg9Ce7qGTKCUumYErWH-X-H3W-QbZUC7EhbB963JWArxyX1A-N3cv8vDsxygwuCMZSgAujl7GfW0g'
);

// Create PayPal client using the environment
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
