import prisma from "../../prisma";

export async function seedTrips() {
  console.log("🌱 Seeding Trips...");

  const trips = await prisma.trip.createMany({
    data: [
        {station_id: 1 , train_id: 1, station_order: 1},
        {station_id: 1 , train_id: 4, station_order: 5}, 
        {station_id: 1 , train_id: 2, station_order: 1},
        {station_id: 1 , train_id: 5, station_order: 5},
        {station_id: 1 , train_id: 3, station_order: 1},
        {station_id: 1 , train_id: 6, station_order: 5},

        {station_id: 2 , train_id: 6, station_order: 4},
        {station_id: 2 , train_id: 3, station_order: 2},

        {station_id: 3 , train_id: 3, station_order: 3},
        {station_id: 3 , train_id: 2, station_order: 3},
        {station_id: 3 , train_id: 5, station_order: 3},
        {station_id: 3 , train_id: 6, station_order: 3},
        
        {station_id: 4 , train_id: 6, station_order: 2},
        {station_id: 4 , train_id: 3, station_order: 4},

        {station_id: 5 , train_id: 1, station_order: 5},
        {station_id: 5 , train_id: 2, station_order: 5}, 
        {station_id: 5 , train_id: 3, station_order: 5},
        {station_id: 5 , train_id: 4, station_order: 1},
        {station_id: 5 , train_id: 5, station_order: 1},
        {station_id: 5 , train_id: 6, station_order: 1},

    ],
  });

  console.log("✅ Trips seeded!");
  
  return trips;
}
