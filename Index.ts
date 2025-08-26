import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


import { createStation, getAllStations } from "./models/station";
import { createTrain, getAllTrains } from "./models/train";
import { createTrip, getAllTrips } from "./models/trip";

async function main() {

  console.log("Stations:", await getAllStations());
  console.log("Trains:", await getAllTrains());
  console.log("Trips:", await getAllTrips());
}

main()
  .catch(console.error)
  .finally(async () => await (await import("./prisma")).default.$disconnect());

export default prisma;