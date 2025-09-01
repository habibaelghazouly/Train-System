import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";
import trainRoutes from "./routes/trains.routes";

const app = express();

app.use(express.json());

// Routes
app.use("/all", stationRoutes);
app.use("/trips", tripRoutes);
app.use("/new", stationRoutes);
app.use("/new", trainRoutes);
app.use("/all", trainRoutes);

export default app;
