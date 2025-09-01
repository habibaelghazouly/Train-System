import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";
import trainRoutes from "./routes/trains.routes";

const app = express();

app.use(express.json());

// Station routes
app.use("/stations", stationRoutes);

// Trip routes
app.use("/trips", tripRoutes);

// Train routes
app.use("/trains", trainRoutes);


export default app;
