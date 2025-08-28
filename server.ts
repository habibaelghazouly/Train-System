import express from "express";
import { getAllStations } from "./services/stations.service";

const app = express();

app.get("/", async (req, res) => {
  const stations = await getAllStations();
  res.json(stations);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
