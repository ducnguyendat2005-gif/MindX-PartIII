import express from 'express';
import { customers } from './data.js'; 

const app = express();
app.use(express.json());


app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const id = req.params.id;
    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }

    res.json(customer);
});

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});