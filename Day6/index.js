import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { validateId ,validateCus,IdFind ,checkAPIkey} from './middleware/customer.middleware.js';
import { validateOrder ,checkAvailOrder} from './middleware/order.middleware.js';
import customerController from './controller/customer.controller.js'  
import orderController from './controller/order.controller.js';
import productController from './controller/product.controller.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/day6db')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));

app.post('/customer',validateCus,customerController.postnewCustomer);

app.get('/getAPIkey/:id',IdFind,customerController.getAPIkey)

app.get('/customers',checkAPIkey,customerController.getAllCustomers)

app.get('/customer/:id',checkAPIkey,validateId,customerController.getCustomerbyID)

app.get('/customer/:customerId/orders',checkAPIkey,orderController.getCustomerOrder)

app.get('/orders/highvalue',checkAPIkey,orderController.getHIval)

app.get('/products',checkAPIkey,productController.getProductbyRange)

app.post('/orders',checkAPIkey,validateOrder,orderController.postNewOrder)

app.post('/customer',checkAPIkey,validateCus,customerController.postnewCustomer)

app.put('/order/:orderId',checkAvailOrder,orderController.putOrder)

app.use(errorHandler);
app.listen(8080, () => {
    console.log('Server is running!');
});