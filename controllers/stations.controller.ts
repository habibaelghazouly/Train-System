import prisma from '../prisma';
import { Request, Response } from 'express';

//GET all stations 
const getAllStations = async (req:Request, res:Response) => {
  try {
    const stations = await prisma.station.findMany(
      {
        distinct: ['name'],
        orderBy: { name: 'asc' }
      }
    );

    res.json(stations);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
};

export default getAllStations;