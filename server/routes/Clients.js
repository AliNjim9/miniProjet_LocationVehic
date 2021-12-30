import express from 'express';
import { getClients, getClient, createClient, updateClient, deleteClient } from '../controllers/Clients.js';



const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.get('/:id', getClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;