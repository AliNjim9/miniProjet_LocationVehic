import express from 'express';
import {  updateLocalite} from '../controllers/Localites.js';

const router = express.Router();


router.patch('/:id', updateLocalite);

export default router;