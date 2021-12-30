import express from 'express';
import mongoose from 'mongoose';

import Reservation from '../models/Reservation.js';
import Client from '../models/Client.js';
import Vehicule from '../models/Vehicule.js';
import TypeVehicule from '../models/TypeVehicule.js';


const router = express.Router();

export const getReservations = async(req, res) => { 
    try {
        const Clients=[],nomclient=[];
        const Reservations = await Reservation.find();
        Reservations.map((r)=>{
            const idclient =r["client"].toString();
            Clients.push(idclient);  
        });
        for(let i=0; i<Clients.length; i++){
            let client=await Client.findById(Clients[i]);
            nomclient.push(client['nomclient']);
        }
        res.status(200).json({Reservations,Clients,nomclient});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReservation = async (req, res) => { 
    const { id } = req.params;

    try {
        const reservation = await Reservation.findById(id);
        
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getReservationsClient = async (req, res) => { 
    const { id } = req.params;
    const idV=[],Vehicules=[],Types=[],Tarifs=[],Marques=[];
    //return vehicule
    try {
        console.log(id);
        const Reservations = await Reservation.find({'client':id});

        Reservations.map((r)=>{
            const idv =r["vehicule"].toString();            
            idV.push(idv);   
        });
        for(let i=0; i<idV.length; i++){
            let vehicule=await Vehicule.findById(idV[i]);
            let typev=await TypeVehicule.findById(vehicule["typev"]);
            Vehicules.push(vehicule);
            Types.push(typev['nomtype']);
            Tarifs.push(typev["tarif"]);
            Marques.push(vehicule['marquev']);
        }
        console.log(Reservations+' : hi');
        res.status(200).json({Reservations,Types,Tarifs,Marques});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReservation = async (req, res) => {

    const { datearrive, etatres, destination, commentaire, nbrvoyageur,client,vehicule } = req.body;
    console.log(" +"+destination);
    
    try {
        const newReservation =await Reservation.create({ datearrive:new Date(datearrive), etatres:etatres, destination:destination, commentaire:commentaire, nbrvoyageur:nbrvoyageur,client:client,vehicule:vehicule})


        res.status(201).json(newReservation );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { datearrive, etatres, destination, commentaire, nbrvoyageur } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No reservation with id: ${id}`);

    const updatedReservation = { datearrive:datearrive, etatres:etatres, destination:destination, commentaire:commentaire, nbrvoyageur:nbrvoyageur };

    await Reservation.findByIdAndUpdate(id, updatedReservation, { new: true });

    res.json(updatedReservation);
}

export const deleteReservation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No reservation with id: ${id}`);

    await Reservation.findByIdAndRemove(id);

    res.json({ message: "Reservation deleted successfully." });
}


export default router;