import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express()
app.use(express.json());



app.get("", (req, res) => {
    const data = {school: "Mindx technology school "}
    res.send(data);
});

app.get('/customer', (req, res) => {
    fetch('http://localhost:3000/customers').then((rs) => {
        return rs.json()
    }).then((data) => {
        res.send({data});
    });
});


app.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    fetch(`http://localhost:3001/customers/${id}`)
        .then(rs => rs.json())
        .then(data => res.send({ data }));
});


app.get('/customer/:id/orders', (req, res) => {
    const { id } = req.params;
    fetch(`http://localhost:3001/orders?customerId=${id}`)
        .then(rs => rs.json())
        .then(data => res.send({ data }));
});


app.get('/orders/highvalue', async (req, res) => {
    const { price } = req.query;
    const rs = await fetch('http://localhost:3001/orders');
    const data = await rs.json();
    const foundOrder = data.filter(d => d.totalPrice >= price)
    res.send(foundOrder);
});


app.get('/orders/products', async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    console.log(minPrice);
    console.log(maxPrice);
    const rs = await fetch('http://localhost:3001/orders');
    const data = await rs.json();
    const filtered = data.filter(d => d.totalPrice >= minPrice && d.totalPrice <= maxPrice);
    
    res.send(filtered);
});


app.post('/customers', async (req, res) => {
    try {
        const body = {id : uuidv4() , ...req.body};
        const rsSample = await fetch('http://localhost:3001/customers');
        const sample = await rsSample.json();
        for (let i of sample) {
            if (body.email === i.email) {
                throw new Error ("422");
            }
        }
        const rs = await fetch('http://localhost:3001/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await rs.json();
        res.status(201).send(data);}
    catch (error) {
        if (error.message === "422") {
            return res.status(422).send("422 error");
        }
        res.status(500).send("Internal Server Error");
    }
});




app.post('/orders', async (req, res) => {
    try {
        const cont = req.body;
        const rsOrders = await fetch('http://localhost:3001/products');
        const Orders = await rsOrders.json();
        const foundOrder = Orders.find(d => d.id === cont.productId)

        console.log(cont);
        console.log(foundOrder);

        if (foundOrder === undefined){throw new Error ("khong tim thay don hang")}
        if (cont.quantity > foundOrder.quantity){throw new Error ("mat hang dang thieu")}
        
        const totalPrice = cont.quantity * foundOrder.price

        const rs = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: uuidv4(),...cont ,totalPrice})
        });
        const resdata = await rs.json();
        res.status(201).send(resdata);
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


app.put('/orders/:id', async (req,res)=> {
    try {
        const { id } = req.params;
        const fieldsUpdate = req.body;

        const rslistOrders = await fetch('http://localhost:3001/orders');
        const listOrders = await rslistOrders.json();

        const rsPrice = await fetch('http://localhost:3001/products');
        const Price = await rsPrice.json();
        
        const baseOrder = listOrders.find(d => d.id === id)
        console.log(baseOrder);
        if (baseOrder === undefined){throw new Error ("khong tim thay don hang")}

        const foundPrice = Price.find(d => d.id === fieldsUpdate.productId)
        console.log(foundPrice);
        const totalPrice = fieldsUpdate.quantity * foundPrice.price

        const rs = await fetch(`http://localhost:3001/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id ,...fieldsUpdate ,totalPrice})
        });
        const resdata = await rs.json();
        res.status(201).send(resdata);
        
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

app.delete('/customers/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        console.log(id);

        const rslistCustomers = await fetch('http://localhost:3001/customers');
        const listCustomers = await rslistCustomers.json();

        const findUser = listCustomers.find(d => d.id === id)
        if (findUser === undefined){
            throw new Error ("khong tim thay user")
        }

        const rs = await fetch(`http://localhost:3001/customers/${id}`, {
            method: 'DELETE'  // không cần headers hay body
        }); 

        res.status(200).send({ 
            success: true, 
            message: "Xoa thanh cong" 
        });
    } catch (error){
        res.status(403).send({
            data: null,
            success: false,
            error: error.message
        });
    }
});

app.post('/register', (req, res) => {
    try {
        const {userName, email, passWord} = req.body;
        // kiểm tra dữ liệu đầu vào nhận từ body
        if(!userName) throw new Error('userName is required!');
        if(!email) throw new Error('email is required!');
        if(!password) throw new Error('password is required!');
        
        const newUser = users.push({
            userName,
            email,
            passWord
        });
        res.status(201).send({
            data: newUser,
            success: true,
            error: 'Đăng ký tài khoản thành công'
        });
    } catch (error){
        res.status(403).send({
            data: null,
            success: false,
            error: error.message
        });
    }
});
app.listen(8080, () => {
    console.log('Server is running!');
});