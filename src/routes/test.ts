import { Hono } from 'hono';
import { pool } from '../config/database';

const test = new Hono();

// Simple test endpoint
test.get('/', (c) => {
  return c.json({
    message: 'Test API is working!',
    timestamp: new Date().toISOString()
  });
});

// Test database connection
test.get('/db', async (c) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    return c.json({
      message: 'Database connection successful',
      result: rows
    });
  } catch (error) {
    return c.json({
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Test endpoint with params
test.get('/echo/:message', (c) => {
  const message = c.req.param('message');
  return c.json({
    echo: message,
    length: message.length
  });
});

// Test POST endpoint
test.post('/data', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({
      message: 'Data received',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      message: 'Invalid JSON',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 400);
  }
});

export default test;
