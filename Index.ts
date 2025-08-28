import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";


const app = express();

app.use(express.json());

// Routes
app.use("/", stationRoutes);
app.use("/trips", tripRoutes);

export default app;
