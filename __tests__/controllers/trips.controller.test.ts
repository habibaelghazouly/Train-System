import request from 'supertest';
import app from '../../Index';
import * as tripService from '../../services/trips.service';

describe('Trips Controller Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // GET trip by id 
  it('GET /trips/:id should return a trip', async () => {
    const mockTrip = { id: 1, station_id: 1, train_id: 1, station_order: 1 };
    jest.spyOn(tripService, 'getTripById').mockResolvedValue(mockTrip);

    const res = await request(app).get('/trips/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 1, stationID: 1, trainID: 1, station_order: 1 }));
  });

  it('GET /trips/:id should return 400 if id is invalid', async () => {
    const res = await request(app).get('/trips/abc');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid station ID' });
  });

  it('GET /trips/:id should return 404 if trip not found', async () => {
    jest.spyOn(tripService, 'getTripById').mockResolvedValue(null);

    const res = await request(app).get('/trips/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Trip not found' });
  });

  // SEARCH trips 
  it('GET /trips/search should return available trips', async () => {
    const mockTrips = [
      { train_id: 1, train_name: 'Train A', start_city: 1, dest_city: 2 },
    ];
    jest.spyOn(tripService, 'findTrips').mockResolvedValue(mockTrips);

    const res = await request(app).get('/trips/search?fromStationId=1&toStationId=2');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ train_id: 1, start_city: 1, dest_city: 2 })
    ]));
  });

  it('GET /trips/search should return 400 if query params missing', async () => {
    const res = await request(app).get('/trips/search');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'fromStationId and toStationId are required query params'
    });
  });

  it('GET /trips/search should return 404 if no trips found', async () => {
    jest.spyOn(tripService, 'findTrips').mockResolvedValue([]);

    const res = await request(app).get('/trips/search?fromStationId=1&toStationId=2');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'No trips found between the specified stations' });
  });
});
