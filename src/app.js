const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { corsOrigin, nodeEnv } = require('./config/env');
const errorHandler = require('./middleware/error');
const rateLimit = require('./middleware/rateLimit');

const authRoutes = require('./routes/auth.routes');
const expenseRoutes = require('./routes/expense.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

// Security, compression, CORS, logging
app.use(helmet());
app.use(compression());
app.use(cors({ origin: corsOrigin.split(','), credentials: false }));
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));

// ✅ Root & Health endpoints
app.get('/', (req, res) => {
  res.send('🚀 Expense Tracker Backend is running!');
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ✅ API Routes with rate limiters
app.use('/api/auth', rateLimit.authLimiter, authRoutes);
app.use('/api/expenses', rateLimit.generalLimiter, expenseRoutes);
app.use('/api/categories', rateLimit.generalLimiter, categoryRoutes);

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// ✅ Central error handler
app.use(errorHandler);

module.exports = app;
