import request from 'supertest';
import app from '../../Index';
import * as stationService from '../../services/stations.service';

describe('Stations Controller Integration ', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // GET ALL
  it('GET /stations should return stations array', async () => {
    const mockStations = [{ id: 1, name: 'Station A' }];
    jest.spyOn(stationService, 'getAllStations').mockResolvedValue(mockStations);

    const res = await request(app).get('/stations');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Station A' })
      ])
    );
  });

  // POST new station
  it('POST /stations should create a station', async () => {
    const mockStation = { id: 1, name: 'Station B' };
    jest.spyOn(stationService, 'addStation').mockResolvedValue(mockStation);

    const res = await request(app)
      .post('/stations/new')
      .send({ name: 'Station B' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ id: 1, name: 'Station B' }));
  });

  // GET by id
  it('GET /stations/:id should return a station', async () => {
    const mockStation = { id: 2, name: 'Station C' };
    jest.spyOn(stationService, 'getStationById').mockResolvedValue(mockStation);

    const res = await request(app).get('/stations/2');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 2, name: 'Station C' }));
  });

  // PATCH
  it('PUT /stations/:id should update a station', async () => {
    const mockStation = { id: 3, name: 'Updated Station' };
    jest.spyOn(stationService, 'updateStation').mockResolvedValue(mockStation);

    const res = await request(app)
      .patch('/stations/3')
      .send({ name: 'Updated Station' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 3, name: 'Updated Station' }));
  });

  // DELETE
  it('DELETE /stations/:id should delete a station', async () => {
    const mockStation = { id: 4, name: 'Station D' };
    jest.spyOn(stationService, 'deleteStation').mockResolvedValue(mockStation);

    const res = await request(app).delete('/stations/4');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 4, name: 'Station D' }));
  });

  describe('Failure cases', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('GET /stations returns 500 on service error', async () => {
      jest.spyOn(stationService, 'getAllStations').mockRejectedValue(new Error('db fail'));
      const res = await request(app).get('/stations');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch stations' });
    });

    it('GET /stations/:id returns 400 for invalid id', async () => {
      const res = await request(app).get('/stations/abc');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid station ID' });
    });

    it('GET /stations/:id returns 404 when not found', async () => {
      jest.spyOn(stationService, 'getStationById').mockResolvedValue(null);
      const res = await request(app).get('/stations/999999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Station not found' });
    });

    it('GET /stations/:id returns 500 on service error', async () => {
      jest.spyOn(stationService, 'getStationById').mockRejectedValue(new Error('boom'));
      const res = await request(app).get('/stations/5');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch stations' });
    });

    it('POST /stations returns 400 when name missing', async () => {
      const res = await request(app).post('/stations/new').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'name is required' });
    });

    it('POST /stations returns 400 when name blank', async () => {
      const res = await request(app).post('/stations/new').send({ name: '   ' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'name is required' });
    });

    it('POST /stations returns 500 on service error', async () => {
      jest.spyOn(stationService, 'addStation').mockRejectedValue(new Error('insert fail'));
      const res = await request(app).post('/stations/new').send({ name: 'X' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'insert fail' });
    });

    it('PATCH /stations/:id returns 400 invalid id', async () => {
      const res = await request(app).patch('/stations/abc').send({ name: 'New' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid station ID' });
    });

    it('PATCH /stations/:id returns 400 missing name', async () => {
      const res = await request(app).patch('/stations/10').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Station name is required' });
    });

    it('PATCH /stations/:id returns 500 on service error', async () => {
      jest.spyOn(stationService, 'updateStation').mockRejectedValue(new Error('upd fail'));
      const res = await request(app).patch('/stations/10').send({ name: 'Updated' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'upd fail' });
    });

    it('DELETE /stations/:id returns 400 invalid id', async () => {
      const res = await request(app).delete('/stations/xyz');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid station ID' });
    });

    it('DELETE /stations/:id returns 404 when not found', async () => {
      jest.spyOn(stationService, 'deleteStation').mockResolvedValue(null as any);
      const res = await request(app).delete('/stations/12345');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Station not found' });
    });

    it('DELETE /stations/:id returns 500 on service error', async () => {
      jest.spyOn(stationService, 'deleteStation').mockRejectedValue(new Error('del fail'));
      const res = await request(app).delete('/stations/5');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'del fail' });
    });
  });
});
