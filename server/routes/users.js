import express from 'express';

import {signin} from '../controllers/signin.js' ;
import {signup} from '../controllers/signup.js';

//import { signin,signup } from '../controllers/users.js';

const router= express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

export default router;