import express from 'express';
import mongoose from 'mongoose';

import Vehicule from '../models/Vehicule.js';
import TypeVehicule from '../models/TypeVehicule.js';
import Localite from '../models/Localite.js';

export const getVehicules = async(req, res) => { 
    try {
        
        const Vehicules = await Vehicule.find();
        var localites=[],typevehicules=[],nomLocalites=[],typev=[],tarif=[];

        Vehicules.map((v)=>{
            const idloc =v["localite"].toString();
            const idtypev =v["typev"].toString();
            localites.push(idloc);
            typevehicules.push(idtypev);
            
             
        });
        for(let i=0; i<localites.length; i++){
            let nomloc=await Localite.findById(localites[i]);
            let typevehicule=await TypeVehicule.findById(typevehicules[i]);
            typev.push(typevehicule['nomtype']);
            tarif.push(typevehicule['tarif']);
            nomLocalites.push(nomloc['nomloc']);
            console.log("typev: "+typevehicule);
        }
        
        console.log(nomLocalites);    //console.log(Vehicules[0]['typev']);
        res.status(200).json({Vehicules,nomLocalites,typev,tarif,localites,typevehicules});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVehicule = async (req, res) => { 
    const { id } = req.params;

    try {
        const vehicule = await Vehicule.findOneById(id);
        
        res.status(200).json(vehicule);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVehicule = async (req, res) => {
    
    const { marquev,puissancev,nbplace,localite,typev,tarif } = req.body;
    console.log(req.body);
    
    try {
        const newTypeV=await TypeVehicule.create({nomtype:typev,tarif:tarif});
        const newLocalite=await Localite.create({nomloc:localite});
        const newVehicule =await Vehicule.create({ marquev:marquev, puissancev:puissancev, nbplace:nbplace, localite:newLocalite._id, typev:newTypeV._id});


        res.status(201).json(newVehicule);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateVehicule = async (req, res) => {
    const { id } = req.params;
    const { marquev,puissancev,nbplace } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No vehicule with id: ${id}`);

    const updatedVehicule = { marquev:marquev, puissancev:puissancev, nbplace:nbplace };

    await Vehicule.findByIdAndUpdate(id, updatedVehicule, { new: true });

    res.json(updatedVehicule);
}

export const deleteVehicule = async (req, res) => {
    const { id } = req.params;
    const vehicule= await Vehicule.findById(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No vehicule with id: ${id}`);
    await Vehicule.findByIdAndRemove(id);
    res.json({ message: "Vehicule deleted successfully." });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Type-Vehicule with id: ${id}`);
    await TypeVehicule.findByIdAndRemove(vehicule["typev"]);
    console.log("TypeVehicule with id: "+vehicule["typev"]+" deleted successfully");

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Type-Vehicule with id: ${id}`);
    await Localite.findByIdAndRemove(vehicule["localite"]);
    console.log("TypeVehicule with id: "+vehicule["localite"]+" deleted successfully");
    
}
