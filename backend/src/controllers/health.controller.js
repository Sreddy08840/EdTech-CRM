const { testDatabaseConnection } = require('../config/db');

async function getHealth(_request, response, next) {
  try {
    await testDatabaseConnection();
    response.json({ status: 'ok', database: 'connected' });
  } catch (databaseError) {
    const error = new Error('Database health check failed');
    error.statusCode = 503;
    error.publicMessage = 'Database unavailable';
    error.cause = databaseError;
    next(error);
  }
}

module.exports = { getHealth };