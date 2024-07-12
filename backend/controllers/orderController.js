import Order from "../models/orderModel.js";
import { errorHandler } from '../utils/errorHandler.js';

export const createOrder = async (req, res, next) => {
    try {       
        const savedOrder = await Order.create(req.body);
        return res.status(201).json(savedOrder);
    } catch (error) {
        next(error);
    }
}
