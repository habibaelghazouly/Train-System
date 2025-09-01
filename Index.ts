import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";
import newStationRoutes from "./routes/newStation.routes";
import newTrainRoutes from "./routes/newTrain.routes";
import trainRoutes from "./routes/trains.routes";

const app = express();

app.use(express.json());

// Routes
app.use("/all", stationRoutes);
app.use("/trips", tripRoutes);
app.use("/new", newStationRoutes);
app.use("/new", newTrainRoutes);
app.use("/all", trainRoutes);

export default app;
