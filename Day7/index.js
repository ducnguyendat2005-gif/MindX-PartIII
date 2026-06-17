import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { validateReg,validateLogin } from './middleware/customer.middleware.js'
import { verifyApiKey } from './middleware/verifyAPIkey.middleware.js'
import { validateOrder,checkAPIOrder,validateforDel} from './middleware/order.middleware.js';
import customerController from './controller/customer.controller.js'  
import orderController from './controller/order.controller.js'

const app = express();
app.use(express.json());

app.post('/register',validateReg,customerController.registerCustomer)

app.post('/login',validateLogin,customerController.logedinAndAPIKey)

app.post('/orders',verifyApiKey,validateOrder,orderController.postNewOrder)

app.get('/users/:id/orders',verifyApiKey,checkAPIOrder,orderController.getCustomerOrder)

app.put('/orders/:id',verifyApiKey,validateOrder,orderController.putOrder)

app.delete('/orders/:id',verifyApiKey,validateforDel,orderController.deleteOrder)

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/day7db')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));

app.listen(8080, () => {
    console.log('Server is running!');
});