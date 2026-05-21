import express from 'express';
const app = express();
app.use(express.json());

const data = [
    { id: 1, name: "Nguyễn Văn Hùng", age: 52, birthYear: 1974 },
    { id: 2, name: "Lê Thị Mai", age: 48, birthYear: 1978 },
    { id: 3, name: "Trần Thanh Hải", age: 50, birthYear: 1976 },
    { id: 4, name: "Phạm Minh Đức", age: 53, birthYear: 1973 },
    { id: 5, name: "Vũ Thu Hương", age: 49, birthYear: 1977 }
];

app.get('/', (req, res) => {
    const data = { hello: "supbitch" }
    res.send(data);
});
//Viết API endpoint /users/old để lấy danh sách user mà có tuổi >= 50.
// app.get('/users/old', (req, res) => {
//     const age = req.query.age || 50;
//     res.send(data.filter(old => old.age >= age));
// });

app.post('/users', (req, res) => {
    const body = req.body;
    console.log(body);
    data.push(body);
    res.send(data);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const fieldsUpdate = req.body;
    console.log(id);
    console.log(fieldsUpdate);
    // const currentUser = data.find(item => item.id === Number(id));
    // for (const key in fieldsUpdate) {
    //     currentUser[key] = fieldsUpdate[key];
    // }
    res.send(data);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = data.find(item => item.id === Number(id));
    // kiểm tra tồn tại user hay không
    if(!user) {
        res.status(404).send({
            message:'Không tìm thấy user',
            success: false,
            data: null
        });
    } else{
        res.status(200).send({
            message:'Tìm thấy user',
            success: true,
            data: user
        });
    }
});

app.listen(8080, () => {
    console.log('Server is running!');
});