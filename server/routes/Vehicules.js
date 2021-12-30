import express from 'express';
import { getVehicules, getVehicule, createVehicule, updateVehicule, deleteVehicule } from '../controllers/Vehicules.js';

const router = express.Router();

router.get('/', getVehicules);
router.post('/', createVehicule);
router.get('/:id', getVehicule);
router.patch('/:id', updateVehicule);
router.delete('/:id', deleteVehicule);

export default router;