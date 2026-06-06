import express from 'express';
import mongoose from 'mongoose';
import accountController from './controller/account.controller.js'
import { validateAcc } from './middleware/accountChecking.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js'
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/day10db')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));
 
app.post('/customer',validateAcc,accountController.creatAccount)

app.use(errorHandler);
app.listen(8080, () => {
    console.log('Server is running!');
});