import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";
import trainRoutes from "./routes/trains.routes";

const app = express();

app.use(express.json());

// Routes
app.use("/all", stationRoutes);
app.use("/new", stationRoutes);
app.use("/station", stationRoutes);

app.use("/trips", tripRoutes);

app.use("/all", trainRoutes);
app.use("/new", trainRoutes);
app.use("/train", trainRoutes);


export default app;
