import prisma from "../../prisma";

import { seedStations } from "./station";
import { seedTrains } from "./train";
import { seedTrips } from "./trips";

async function main() {

  await seedStations();
  await seedTrains();
  await seedTrips(); 

}

main()
  .catch(console.error)
  .finally(async () => await (await import("../../prisma")).default.$disconnect());

export default prisma;