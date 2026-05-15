import http from 'http';
import {customers,products,orders} from './data.js';

const app = http.createServer((request, response) => {
    const endpoint = request.url;

    if (endpoint === '/') {
        response.end("Mainpage");
    } 
    else if (endpoint === '/customers') {
        response.end(JSON.stringify(customers));
    } 
    else if (endpoint.startsWith('/customers/')) {
        const parts = endpoint.split('/')[2];
        const sublinks = endpoint.split('/')[3];
        console.log(parts);
        console.log(sublinks);
        if (sublinks === undefined){
            let found = customers.find(c => c.id === parts)
            response.end(JSON.stringify(found));
        }
        else if (sublinks === 'orders'){
            let foundOrder = orders.find(c => c.customerId == parts)
            response.end(JSON.stringify(foundOrder));
        }
        else if (endpoint === '/customers/orders/highvalue'){
            let highVal = orders.filter(c => c.totalPrice >= 10000000)
            response.end(JSON.stringify(highVal));
        }
    } 
    else {
        response.end("404-not-found");
    }
    }
);

app.listen(8080, () => {
    console.log('Server đang chạy!');
});