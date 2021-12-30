import express from 'express';
import mongoose from 'mongoose';

import TypeVehicule from '../models/TypeVehicule.js';

export const updateTypeVehicule = async (req, res) => {
    const { id } = req.params;
    const { typev,tarif} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Type-Vehicule with id: ${id}`);

    const updatedTypeVehicule = { nomtype:typev,tarif:tarif};

    await TypeVehicule.findByIdAndUpdate(id, updatedTypeVehicule, { new: true });

    res.json(updatedTypeVehicule);
}

