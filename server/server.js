import mongoose  from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import express  from "express";

import userRoutes from './routes/users.js';
import reservationRoutes  from './routes/Reservations.js';
import vehiculeRoutes  from './routes/Vehicules.js';
import typevehiculeRoutes  from './routes/TypeVehicules.js';
import localiteRoutes  from './routes/Localite.js';

import clientRoutes  from './routes/Clients.js';

const app = express();

//require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
//app.use(express.json());

//app.use(require("./routes/record"));
// get driver connection 
app.use('/client',clientRoutes);
app.use('/user',userRoutes);
app.use('/reservation',reservationRoutes);
app.use('/vehicule',vehiculeRoutes);
app.use('/typevehicule',typevehiculeRoutes);
app.use('/localite',localiteRoutes);



const CONNECTION_URL='mongodb+srv://ali:ali@cluster0.atffd.mongodb.net/myDB?retryWrites=true&w=majority';
//const CONNECTION_URL = 'mongodb+srv://islem:islem@cluster0.lxjee.mongodb.net/FirstProject';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port,'0.0.0.0', () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));

