import express from 'express';
import mongoose from 'mongoose';

import Compte from '../models/Compte.js';

const router = express.Router();

export const updateCompte = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No localite with id: ${id}`);

    const updatedCompte = { password:password };

    await Localite.findByIdAndUpdate(id, updatedLocalite, { new: true });

    res.json(updatedLocalite);
}


export default router;