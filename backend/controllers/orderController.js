import Order from "../models/orderModel.js";
import { errorHandler } from '../utils/errorHandler.js';
import { io } from '../index.js';

export const createOrder = async (req, res, next) => {
    try {       
        const savedOrder = await Order.create(req.body);
        io.emit('newOrder', savedOrder);
        return res.status(201).json(savedOrder);
    } catch (error) {
        next(error);
    }
}

export const getIncompleteOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ isCompleted: false });
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const completeOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { isCompleted: true },
            { new: true }
        );

        io.emit('orderCompleted', updatedOrder);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const getAnalytics = async (req, res, next) => {
    try {
        const orders = await Order.find();

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        const itemCount = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
            });
        });

        const mostSoldItems = Object.entries(itemCount)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
        
        const revenueData = [];
        const orderData = [];
        const dailyOrders = {};

        orders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0];
            dailyOrders[date] = dailyOrders[date] || { totalRevenue: 0, totalOrders: 0 };
            dailyOrders[date].totalRevenue += order.totalAmount;
            dailyOrders[date].totalOrders += 1;
        });

        for (const [date, data] of Object.entries(dailyOrders)) {
            revenueData.push(data.totalRevenue);
            orderData.push({ date, totalOrders: data.totalOrders });
        }

        return res.status(200).json({
            totalOrders,
            totalRevenue,
            mostSoldItems,
            revenueData,
            orderData,
        });
    } catch (error) {
        next(error);
    }
};
