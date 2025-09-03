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

  // Failure cases
  describe('Failure cases', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('GET /trains returns 500 on service error', async () => {
      jest.spyOn(trainService, 'getAllTrains').mockRejectedValue(new Error('boom'));
      const res = await request(app).get('/trains');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch trains' });
    });

    it('GET /trains/:id returns 400 for invalid id', async () => {
      const res = await request(app).get('/trains/abc');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid train ID' });
    });

    it('GET /trains/:id returns 404 when not found', async () => {
      jest.spyOn(trainService, 'getTrainById').mockResolvedValue(null);
      const res = await request(app).get('/trains/9999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Train not found' });
    });

    it('GET /trains/:id returns 500 on service error', async () => {
      jest.spyOn(trainService, 'getTrainById').mockRejectedValue(new Error('fail'));
      const res = await request(app).get('/trains/7');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch train' });
    });

    it('POST /trains returns 400 when name missing', async () => {
      const res = await request(app).post('/trains/new').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'name is required' });
    });

    it('POST /trains returns 400 when name blank', async () => {
      const res = await request(app).post('/trains/new').send({ name: '   ' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'name is required' });
    });

    it('POST /trains returns 500 on service error', async () => {
      jest.spyOn(trainService, 'addTrain').mockRejectedValue(new Error('insert fail'));
      const res = await request(app).post('/trains/new').send({ name: 'X' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'insert fail' });
    });

    it('PATCH /trains/:id returns 400 invalid id', async () => {
      const res = await request(app).patch('/trains/abc').send({ name: 'New' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid train ID' });
    });

    it('PATCH /trains/:id returns 400 missing name', async () => {
      const res = await request(app).patch('/trains/10').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Train name is required' });
    });

    it('PATCH /trains/:id returns 400 blank name', async () => {
      const res = await request(app).patch('/trains/10').send({ name: '   ' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Train name is required' });
    });

    it('PATCH /trains/:id returns 500 on service error', async () => {
      jest.spyOn(trainService, 'updateTrain').mockRejectedValue(new Error('upd fail'));
      const res = await request(app).patch('/trains/10').send({ name: 'Updated' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'upd fail' });
    });

    it('DELETE /trains/:id returns 400 invalid id', async () => {
      const res = await request(app).delete('/trains/xyz');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid train ID' });
    });

    it('DELETE /trains/:id returns 404 when not found', async () => {
      jest.spyOn(trainService, 'deleteTrain').mockResolvedValue(null as any);
      const res = await request(app).delete('/trains/12345');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Train not found' });
    });

    it('DELETE /trains/:id returns 500 on service error', async () => {
      jest.spyOn(trainService, 'deleteTrain').mockRejectedValue(new Error('del fail'));
      const res = await request(app).delete('/trains/5');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'del fail' });
    });
  });
});
