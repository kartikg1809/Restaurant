import express from 'express';
import { createOrder,getIncompleteOrders,completeOrder,getAnalytics } from '../controllers/orderController.js';
const router=express.Router();


router.post('/create', createOrder);
router.get('/get', getIncompleteOrders);
router.post('/update/:id', completeOrder);
router.get('/analytics', getAnalytics);

export default router;