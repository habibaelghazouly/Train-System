import request from 'supertest';
import app from '../../Index';
import * as trainService from '../../services/trains.service';

describe('Trains Controller Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // GET ALL
  it('GET /trains should return trains array', async () => {
    const mockTrains = [{ id: 1, name: 'Train A' }];
    jest.spyOn(trainService, 'getAllTrains').mockResolvedValue(mockTrains);

    const res = await request(app).get('/trains');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Train A' })
      ])
    );
  });

  // POST
  it('POST /trains should create a train', async () => {
    const mockTrain = { id: 2, name: 'Train B' };
    jest.spyOn(trainService, 'addTrain').mockResolvedValue(mockTrain);

    const res = await request(app)
      .post('/trains/new')
      .send({ name: 'Train B' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ id: 2, name: 'Train B' }));
  });

  // GET BY ID 
  it('GET /trains/:id should return a train', async () => {
    const mockTrain = { id: 3, name: 'Train C' };
    jest.spyOn(trainService, 'getTrainById').mockResolvedValue(mockTrain);

    const res = await request(app).get('/trains/3');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 3, name: 'Train C' }));
  });

  //  PATCH 
  it('PATCH /trains/:id should update a train', async () => {
    const mockTrain = { id: 4, name: 'Updated Train' };
    jest.spyOn(trainService, 'updateTrain').mockResolvedValue(mockTrain);

    const res = await request(app)
      .patch('/trains/4')
      .send({ name: 'Updated Train' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 4, name: 'Updated Train' }));
  });

  // DELETE
  it('DELETE /trains/:id should delete a train', async () => {
    const mockTrain = { id: 5, name: 'Train D' };
    jest.spyOn(trainService, 'deleteTrain').mockResolvedValue(mockTrain);

    const res = await request(app).delete('/trains/5');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 5, name: 'Train D' }));
  });
});
