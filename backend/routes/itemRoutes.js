import express from 'express';
import { getItem,updateItem,deleteItem,createItem } from '../controllers/itemController';
const router=express.Router();


router.post('/create', createItem);
router.delete('/delete/:id', deleteItem);
router.post('/update/:id',updateItem);
router.get('/get/:id', getItem);
// router.get('/get', getListings);


export default router;