require('dotenv').config();

function getEnv(key, fallback) {
  const value = process.env[key];
  if (value === undefined || value === null || value === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

const nodeEnv = getEnv('NODE_ENV', 'development');
const port = parseInt(getEnv('PORT', '8080'), 10);
// Optional in development; required in production
const mongoUri = getEnv('MONGODB_URI', '');
// Provide a dev default; require in production
const jwtSecret = getEnv('JWT_SECRET', nodeEnv === 'production' ? undefined : 'dev-secret');
const jwtExpiresIn = getEnv('JWT_EXPIRES_IN', '7d');
const corsOrigin = getEnv('CORS_ORIGIN', 'http://localhost:5173');

module.exports = {
  port,
  mongoUri,
  jwtSecret,
  jwtExpiresIn,
  corsOrigin,
  nodeEnv,
};
