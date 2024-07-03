import express from 'express';
import {signup,signout} from '../controllers/userController.js';
const router=express.Router();


router.post('/signup',signup);
router.get('/signout',signout);

export default router;