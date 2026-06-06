import express from 'express';
import mongoose from 'mongoose';
import customerController from './controller/customer.controller.js'  
import orderController from './controller/order.controller.js'
import productController from './controller/product.controller.js';
import { validateId ,validateCus } from './middleware/customer.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { validateOrder ,checkAvailOrder} from './middleware/order.middleware.js'

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/day5db')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));
 
// tiền xử lý thêm file vào mongodaubuoi

app.get('/customers',customerController.getAllCustomers)

app.get('/customer/:id',validateId,customerController.getCustomerbyID)

app.get('/customer/:customerId/orders',orderController.getCustomerOrder)

app.get('/orders/highvalue',orderController.getHIval)

app.get('/products',productController.getProductbyRange)

app.post('/customers',validateCus,customerController.postnewCustomer)

app.post('/orders',validateOrder,orderController.postNewOrder)

app.put('/order/:orderId',checkAvailOrder,orderController.putOrder)

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server is running!');
});