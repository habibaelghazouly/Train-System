import request from 'supertest';
import app from '../../Index';

describe('Stations Controller Integration', () => {
  describe('GET /', () => {
    it('should return stations array with 200 status when given proper parameters', async () => {
      const response = await request(app)
        .get('/')    
        .expect(200);

        expect(response.status).toBe(200);
     
    });
  });
});