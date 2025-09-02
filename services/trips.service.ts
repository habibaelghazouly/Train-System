import prisma from "../prisma";

// GET trip by id
export async function getTripById(id: number) {
  return prisma.trip.findUnique({
    where: { id },
  });
}

// GET available trips 
export async function findTrips(fromStationId: number, toStationId: number) {
  
  const trains = await prisma.train.findMany({
    include: { trips: true }, 
  });

  const validTrains = trains.filter(train => {
    const start = train.trips.find(trip => trip.station_id === fromStationId);
    const dest = train.trips.find(trip => trip.station_id === toStationId);

    return start && dest && start.station_order < dest.station_order;
  });

  return validTrains.map(train => ({
    train_id: train.id,
    train_name: train.name,
    start_city: fromStationId,
    dest_city: toStationId,
  }));
}
