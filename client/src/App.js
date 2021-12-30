import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {Nav} from './components/navbar/nav.js';
import {Home} from './components/Home/home.js';
import {HomeManager} from './components/HomeManager/HomeManager.js';
import {HomeClient} from './components/HomeManager/HomeClient.js';
import {HomeAdmin} from './components/HomeManager/HomeAdmin.js';
import {Auth} from './components/Auth/Auth.js';
import {Form} from "./components/Form/Form.js";
import {Reservation} from "./components/Reservation/Reservation.js";
import {ClientReservation} from "./components/Reservation/ClientReservations.js";
import {Vehicule} from "./components/Vehicule/Vehicule.js";
import {NewVehicule} from "./components/Vehicule/NewVehicule.js";
import {Clients} from "./components/ClientManagement/Clients.js";



const App=()=> {

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/home" element={<HomeManager/>} />
        <Route path="/home/client" element={<HomeClient/>} />
        <Route path="/home/client/reservations/" element={<ClientReservation/>} />
        <Route path="/home/client/reservations/new" element={<Form/>} />
        <Route path="/home/admin" element={<HomeAdmin/>} />
        <Route path="/home/vehicules/" element={<Vehicule/>} />
        <Route path="/admin/reservations" element={<Reservation/>} />
        <Route path="/admin/vehicules" element={<NewVehicule/>} />
        <Route path="/admin/clients" element={<Clients/>} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
