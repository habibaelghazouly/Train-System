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

  it('GET /trips/:id should return 500 on service error', async () => {
    jest.spyOn(tripService, 'getTripById').mockRejectedValue(new Error('boom'));
    const res = await request(app).get('/trips/2');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch trips' });
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

  it('GET /trips/search should return 500 on service error', async () => {
    jest.spyOn(tripService, 'findTrips').mockRejectedValue(new Error('db fail'));
    const res = await request(app).get('/trips/search?fromStationId=1&toStationId=2');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch trips');
  });

  // POST
  it('POST /trips/new should create a trip', async () => {
    const mockTrip = { id: 2, station_id: 1, train_id: 1, station_order: 1 };
    jest.spyOn(tripService, 'addTrip').mockResolvedValue(mockTrip);

    const res = await request(app)
      .post('/trips/new')
      .send({ stationId: 1, trainId: 1, stationOrder: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ id: 2, stationID: 1, trainID: 1, stationOrder: 1 }));
  });

  it('POST /trips/new should return 400 when body missing fields', async () => {
    const res = await request(app)
      .post('/trips/new')
      .send({ stationId: 1, trainId: 1 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'stationId, trainId and stationOrder are required' });
  });

  it('POST /trips/new should return 500 on service error', async () => {
    jest.spyOn(tripService, 'addTrip').mockRejectedValue(new Error('insert fail'));
    const res = await request(app)
      .post('/trips/new')
      .send({ stationId: 1, trainId: 1, stationOrder: 1 });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'insert fail' });
  });

  // PATCH
  it('PATCH /trips/:id should update a trip', async () => {
    const mockTrip = { id: 4, station_id: 1, train_id: 1, station_order: 1 };
    jest.spyOn(tripService, 'updateTrip').mockResolvedValue(mockTrip);

    const res = await request(app)
      .patch('/trips/4')
      .send({ stationId: 1, trainId: 1, stationOrder: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 4, stationID: 1, trainID: 1, stationOrder: 1 }));
  });

  it('PATCH /trips/:id should return 400 invalid id', async () => {
    const res = await request(app)
      .patch('/trips/abc')
      .send({ stationId: 1, trainId: 1, stationOrder: 1 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid trip ID' });
  });

  it('PATCH /trips/:id should return 400 missing fields', async () => {
    const res = await request(app)
      .patch('/trips/4')
      .send({ stationId: 1, trainId: 1 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'stationId, trainId and stationOrder are required' });
  });

  it('PATCH /trips/:id should return 500 on service error', async () => {
    jest.spyOn(tripService, 'updateTrip').mockRejectedValue(new Error('upd fail'));
    const res = await request(app)
      .patch('/trips/4')
      .send({ stationId: 1, trainId: 1, stationOrder: 1 });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'upd fail' });
  });

  // DELETE
  it('DELETE /trips/:id should delete a trip', async () => {
    const mockTripD = { id: 5, station_id: 1, train_id: 1, station_order: 1 };
    jest.spyOn(tripService, 'deleteTrip').mockResolvedValue(mockTripD);

    const res = await request(app).delete('/trips/5');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 5 });
  });

  it('DELETE /trips/:id should return 400 invalid id', async () => {
    const res = await request(app).delete('/trips/abc');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid trip ID' });
  });

  it('DELETE /trips/:id should return 404 when trip not found', async () => {
    jest.spyOn(tripService, 'deleteTrip').mockResolvedValue(null as any);
    const res = await request(app).delete('/trips/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Trip not found' });
  });

  it('DELETE /trips/:id should return 500 on service error', async () => {
    jest.spyOn(tripService, 'deleteTrip').mockRejectedValue(new Error('del fail'));
    const res = await request(app).delete('/trips/5');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'del fail' });
  });
});