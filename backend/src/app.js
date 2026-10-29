const cors = require('cors');
const express = require('express');
const healthRoutes = require('./routes/health.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.use('/api', healthRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;