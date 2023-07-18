export default () => ({
  env: process.env.NODE_ENV || 'development',
  logger: {
    redact: [
      'req.*.apikey',
      'req.*.api_key',
      'req.*.password',
      'req.*.passphrase',
      'req.*.secret',
      'res.*.apikey',
      'res.*.api_key',
      'res.*.password',
      'res.*.passphrase',
      'res.*.secret',
    ],
  },
  app: {
    port: Number(process.env.PORT),
  },
  auth: {
    apiKeys: process.env.API_KEYS || '',
    issuerUrl: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
  database: {
    mongodb: {
      url: process.env.DATABASE_URL || '',
    },
  },
});
