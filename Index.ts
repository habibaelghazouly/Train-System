import prisma from "./prisma";

import { seedStations } from "./prisma/seeds/station";
import { seedTrains } from "./prisma/seeds/train";
import { seedTrips } from "./prisma/seeds/trips";

async function main() {

  await seedStations();
  await seedTrains();
  await seedTrips();
  
}

main()
  .catch(console.error)
  .finally(async () => await (await import("./prisma")).default.$disconnect());

export default prisma;