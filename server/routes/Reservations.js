import express from 'express';
import { getReservations, getReservation,getReservationsClient, createReservation, updateReservation, deleteReservation } from '../controllers/Reservations.js';

const router = express.Router();

router.get('/', getReservations);
router.post('/', createReservation);
router.get('/client/:id', getReservationsClient);
router.get('/:id', getReservation);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;