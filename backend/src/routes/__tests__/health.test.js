/**
 * Backend API Tests
 * 
 * Test the health check endpoint
 */

import request from 'supertest';
import express from 'express';

describe('Server Health Check', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    app.get('/', (req, res) => {
      const currentDate = new Date();
      res.status(200).json({
        message: 'Server is up and running!',
        serverClock: currentDate.toString(),
      });
    });
  });
  
  test('GET / should return server status', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('serverClock');
    expect(response.body.message).toBe('Server is up and running!');
  });

  test('GET / should return valid JSON', async () => {
    const response = await request(app).get('/');
    
    expect(response.type).toMatch(/json/);
  });

});
