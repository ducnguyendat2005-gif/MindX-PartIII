import express from 'express';
import mongoose from 'mongoose';
import CustomerModel from './model/customer.js';
import OrderModel from './model/order.js'
import ProductModel from './model/product.js' 

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/day4db')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error:', err));
 

app.get('/customer', async (req, res) => {
    const customerList = await CustomerModel.find({})
    res.send(customerList)
});

app.get('/customer/:id', async (req,res)=>{
    const { id } = req.params;
    const foundCus = await CustomerModel.find({ id: id });
    res.send(foundCus)
})

app.get('/customer/:id/order',async (req,res)=>{
    const { id } = req.params;
    const foundOrder = await OrderModel.find({ customerId: id})
    res.send(foundOrder)
})

app.get('/customers/:customerId/orders',async (req,res) =>{
    const { customerId } = req.params;
    const foundlistOrder = await OrderModel.find({customerId :customerId})
    res.send(foundlistOrder)
})


app.get('/orders', async (req, res) => {
    const { totalPrice_gt } = req.query;
    const foundlistOrder = await OrderModel.find({totalPrice :{$gte :Number(totalPrice_gt) }})
    res.send(foundlistOrder)
});


app.get('/products', async (req, res) => {
    const { minPrice ,maxPrice } = req.query;
    const foundlistOrder = await ProductModel.find({price :{$gte :Number(minPrice),$lte:Number(maxPrice)}})
    res.send(foundlistOrder)
});


app.post('/customers', async (req, res) => {
    try {
        const {id,name ,email,age} = req.body;

        if (!name) throw new Error ('name is required');
        if (!email) throw new Error ('email is required');
        if (!age) throw new Error ('age is required')
        if (!id) throw new Error ('age is required')


        const checkEmail = await CustomerModel.findOne({email :email})
        if(checkEmail) throw new Error ('Email bi trung')

        const createCustomer = await CustomerModel.create({id,name,email,age})
        res.status(201).send({ data: createCustomer, message: 'Register successful!', success: true });
        }
    catch (error) {
        if (error.message === "422") {
            return res.status(422).send("422 error");
        }
        res.status(403).send({
            data: null,
            success: false,
            error: error.message
        });
    }
});


app.put('/order/:orderID', async (req, res) => {
    try {
        const { orderID } = req.params;
        const {customerId,productId,quantity} = req.body;

        const patchOrder = await OrderModel.findById(orderID)
        if (!patchOrder) throw new Error('khong co don hang')
        console.log(patchOrder);
        
        const newProduct = await ProductModel.findOne({id:productId})
        const newTotal = Number(newProduct.price) * quantity 
        

        patchOrder.customerId = customerId;
        patchOrder.productId = productId;
        patchOrder.quantity = quantity;
        patchOrder.totalPrice = newTotal;

        await patchOrder.save();
        res.status(201).send({ data: patchOrder, message: 'Change successful!', success: true });
    }
    catch (error) {
        if (error.message === "422") {
            return res.status(422).send("422 error");
        }
        res.status(403).send({
            data: null,
            success: false,
            error: error.message
        });
    }
});

app.delete('/customer/:customerId',async (req,res)=>{
    try {
        const {customerId} = req.params;
        
        const findUser = await CustomerModel.findById(customerId);
        if (!findUser) throw new Error ('khong tim thay user')
        
        await CustomerModel.findByIdAndDelete(customerId);
        
        res.status(201).send({ data: findUser, message: 'Da xoa thanh cong', success: true });
    }
    catch (error) {
        if (error.message === "422") {
            return res.status(422).send("422 error");
        }
        res.status(403).send({
            data: null,
            success: false,
            error: error.message
        });
    }
})


app.listen(8080, () => {
    console.log('Server is running!');
});


// tiền xử lý thêm file vào mongodaubuoi
// app.post('/customers', async (req, res) => {
//     try {
//         const { name, email, age } = req.body;
//         if (!name) throw new Error('name is required!');
//         if (!email) throw new Error('email is required!');

//         const newCustomer = await CustomerModel.create({ name, email, age });
//         res.status(201).send({
//             data: newCustomer,
//             message: 'Created!',
//             success: true
//         });
//     } catch (error) {
//         res.status(403).send({
//             message: error.message,
//             data: null,
//             success: false
//         });
//     }
// });

// app.post('/orders', async (req, res) => {
//     try {
//         const { customerId, productId, quantity, totalPrice } = req.body;
//         if (!customerId) throw new Error('something is required!');
//         if (!productId) throw new Error('something is required!');
//         if (!quantity) throw new Error('something is required!');
//         if (!totalPrice) throw new Error('something is required!');

//         const newCustomer = await OrderModel.create({ customerId, productId, quantity, totalPrice });
//         res.status(201).send({
//             data: newCustomer,
//             message: 'Created!',
//             success: true
//         });
//     } catch (error) {
//         res.status(403).send({
//             message: error.message,
//             data: null,
//             success: false
//         });
//     }
// });

// app.post('/product', async (req, res) => {
//     try {
//         const { name, price, quantity } = req.body;
//         if (!name) throw new Error('something is required!');
//         if (!price) throw new Error('something is required!');
//         if (!quantity) throw new Error('something is required!');

//         const newCustomer = await ProductModel.create({ name, price, quantity });
//         res.status(201).send({
//             data: newCustomer,
//             message: 'Created!',
//             success: true
//         });
//     } catch (error) {
//         res.status(403).send({
//             message: error.message,
//             data: null,
//             success: false
//         });
//     }
// });