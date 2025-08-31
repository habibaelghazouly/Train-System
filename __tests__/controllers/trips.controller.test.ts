import request from 'supertest';
import app from '../../Index';

describe('Trips Controller Integration', () => {
  describe('GET /trips/search', () => {
    it('should return trips array with 200 status when given proper parameters', async () => {
      const response = await request(app)
        .get('/trips/search')
        .query({
          fromStationId: '1',
          toStationId: '5'
        })
        .expect(200);

      // Expect raw array
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const trip = response.body[0];
        expect(trip).toHaveProperty('train_id');
        expect(trip).toHaveProperty('train_name');
        expect(trip).toHaveProperty('start_city', 1);
        expect(trip).toHaveProperty('dest_city', 5);
      }
    });

    it('should return 400 with error object when missing required parameters', async () => {
      const response = await request(app)
        .get('/trips/search')
        .expect(400);

      expect(response.body).toEqual({
        error: "fromStationId and toStationId are required query params"
      });
    });
  });
});