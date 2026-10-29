import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import testRoutes from './routes/test';

dotenv.config();

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Routes
app.get('/', (c) => {
  return c.json({
    message: 'Central Services Backend API',
    version: '1.0.0',
    endpoints: {
      test: '/api/test',
      testDb: '/api/test/db',
      testEcho: '/api/test/echo/:message',
      testPost: '/api/test/data'
    }
  });
});

app.route('/api/test', testRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({
    message: 'Route not found',
    path: c.req.path
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({
    message: 'Internal server error',
    error: err.message
  }, 500);
});

const port = parseInt(process.env.PORT || '3000');

// Start server
async function startServer() {
  console.log('🚀 Starting Central Services Backend...');
  
  // Test database connection
  await testConnection();
  
  console.log(`🌐 Server running on http://localhost:${port}`);
  
  serve({
    fetch: app.fetch,
    port
  });
}

startServer();
