import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: String,
    productId: String,
    quantity: Number,
    totalPrice: Number,
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;