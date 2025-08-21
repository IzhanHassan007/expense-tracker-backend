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

app.use(helmet());
app.use(compression());
app.use(cors({ origin: corsOrigin.split(','), credentials: false }));
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', rateLimit.generalLimiter);
app.use('/api/auth', rateLimit.authLimiter, authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

app.use(errorHandler);

module.exports = app;




