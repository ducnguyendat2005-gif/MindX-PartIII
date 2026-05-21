import express from 'express';
const app = express()
import data from './data.js'
import crypto from 'crypto';
app.use(express.json());

app.get('/customer', (req, res) => {
    res.send(data.customers);
});

app.get('/customer/:id', (req, res) => {
    const {id} = req.params;
    const found = data.customers.find(d => d.id === id)
    res.send(found);
});

app.get('/customer/:id/orders', (req, res) => {
    const {id} = req.params;
    const foundOrder = data.orders.find(d => d.customerId === id)
    res.send(foundOrder);
});

app.get('/orders/highvalue', (req, res) => {
    const {price} = req.query;
    const filtered = data.orders.filter(d => d.totalPrice >= price);
    res.send(filtered);
});

app.get('/orders/products', (req, res) => {
    const { minPrice, maxPrice } = req.query;
    console.log(minPrice);
    console.log(maxPrice);
    const filtered = data.orders.filter(d => d.totalPrice >= minPrice && d.totalPrice <= maxPrice);
    
    res.send(filtered);
});

app.post('/customers', (req, res) => {
    const body = req.body;
    const newUser = {
        id: crypto.randomUUID(), // sinh ra id ngẫu nhiên kiểu "9fceb585-042f-4f10-9cb5-37c529d93166"
        ...body                  // spread các field còn lại từ body (name, email, age,...)
    };
    console.log(newUser);
    data.customers.push(newUser);
    res.send(data.customers);
});

app.post('/orders', (req,res) =>{
    const body = req.body;
    const ref = data.products.find(d => body.productId === d.id)

    console.log(body);
    console.log(ref);

    if (body.quantity > ref.quantity){
        res.send("don_hang_vuot_qua_so_luong")
    }

    const newOrders = {
        ...body,               
        totalPrice: body.quantity * ref.price                
    };
    console.log(newOrders);
    data.orders.push(newOrders);
    res.send(data.orders);
})

app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const fieldsUpdate = req.body;

    const currentOrder = data.orders.find(item => item.id === id); 

    if (!currentOrder) {
        return res.status(404).send({ message: 'Không tìm thấy order', success: false });
    }

    for (const key in fieldsUpdate) {
        currentOrder[key] = fieldsUpdate[key];
    }

    res.send(data.orders); // ← trả về đúng array
});

app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const currentIndex = data.customers.findIndex(item => item.id === id);
    if (currentIndex === -1) {
        return res.status(404).send({ message: 'Không tìm thấy customer', success: false });
    }
    data.customers.splice(currentIndex, 1);
    res.send(data.customers);
});
// app.post('/users', (req, res) => {
//     const body = req.body;
//     console.log(body);
//     data.push(body);
//     res.send(data);
// });

// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const fieldsUpdate = req.body;
//     console.log(id);
//     console.log(fieldsUpdate);
//     // const currentUser = data.find(item => item.id === Number(id));
//     // for (const key in fieldsUpdate) {
//     //     currentUser[key] = fieldsUpdate[key];
//     // }
//     res.send(data);
// });


app.listen(8080, () => {
    console.log('Server is running!');
});