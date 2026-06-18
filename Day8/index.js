import express from 'express';
import mongoose from 'mongoose';
import customerController from './controller/customer.controller.js'  
import orderController from './controller/order.controller.js';
import { validateReg,validateLogin } from './middleware/customer.middleware.js'
import { verifyToken } from './middleware/verifyToken.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { checkValidOrderUser,validateOrder,validatePutOrder,validateDelOrder } from './middleware/order.middleware.js'

const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGO_URI);

app.post('/register',validateReg,customerController.registerCustomer)

app.post('/login',validateLogin,customerController.CustomerLogin)

app.get('/users/:id/orders',verifyToken,checkValidOrderUser,orderController.getCustomerOrder)

app.post('/order',verifyToken,validateOrder,orderController.postnewOrder)

app.put('/orders/:id',verifyToken,validatePutOrder,orderController.putOrder)

app.delete('/orders/:id',verifyToken,validateDelOrder,orderController.delOrder)

app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));

app.listen(process.env.PORT, () => {
    console.log('Server is running!');
});