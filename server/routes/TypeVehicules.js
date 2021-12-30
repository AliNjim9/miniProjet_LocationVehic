import express from 'express';
import { updateTypeVehicule } from '../controllers/TypeVehicule.js';

const router = express.Router();

router.patch('/:id', updateTypeVehicule);

export default router;