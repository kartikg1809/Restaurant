import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    
},{timestamps:true});

const Order=mongoose.model('Order',itemSchema);

export default Order;
