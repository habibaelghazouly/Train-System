import { createStation, getAllStations } from "./models/station";
import { createTrain, getAllTrains } from "./models/train";
import { createTrip, getAllTrips } from "./models/trip";

async function main() {

  console.log(await getAllStations());
  console.log(await getAllTrains());
  console.log(await getAllTrips());
}

main().catch(console.error);
