import express from 'express';
import mongoose from 'mongoose';

import Localite from '../models/Localite.js';

const router = express.Router();

export const updateLocalite = async (req, res) => {
    const { id } = req.params;
    const { localite } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No localite with id: ${id}`);

    const updatedLocalite = { nomloc:localite };

    await Localite.findByIdAndUpdate(id, updatedLocalite, { new: true });

    res.json(updatedLocalite);
}

export const deleteLocalite = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No localite with id: ${id}`);

    await Localite.findByIdAndRemove(id);

    res.json({ message: "Localite deleted successfully." });
}


export default router;