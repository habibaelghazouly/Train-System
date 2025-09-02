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
});
