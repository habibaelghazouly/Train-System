import prisma from "../prisma";

export const createTrip = (train_id: number, station_id: number, order: number) => {
  return prisma.trip.create({
    data: { train_id, station_id, station_order: order },
  });
};

export const getAllTrips = () => {
  return prisma.trip.findMany({
    include: { Train: true, Station: true },
  });
};
