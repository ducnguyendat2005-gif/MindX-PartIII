import http from 'http';
import {customers, products, orders} from './data.js';

const sendJSON = (res, data, status = 200) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

const app = http.createServer((request, response) => {
    const endpoint = request.url;

    if (endpoint === '/') {
        response.end("Mainpage");
    } 
    else if (endpoint === '/customers') {
        sendJSON(response, customers);
    } 
    else if (endpoint === '/orders/highvalue') {
        let highVal = orders.filter(c => c.totalPrice > 10000000);
        sendJSON(response, highVal);
    } 
    else if (endpoint.startsWith('/customers/')) {
        const parts = endpoint.split('/')[2];
        const sublinks = endpoint.split('/')[3];

        if (sublinks === undefined) {
            let found = customers.find(c => c.id === parts);
            sendJSON(response, found);
        }
        else if (sublinks === 'orders') {
            let foundOrder = orders.filter(c => c.customerId === parts);
            sendJSON(response, foundOrder);
        }
    }
    else if (endpoint.startsWith('/products')) {
        const urlObj = new URL(endpoint, 'http://localhost:8080');
        const minPrice = urlObj.searchParams.get('minPrice');
        const maxPrice = urlObj.searchParams.get('maxPrice');

        if (minPrice === null || maxPrice === null) {
            sendJSON(response, products);
        } else {
            let filtered = products.filter(p => 
                p.price >= Number(minPrice) && p.price <= Number(maxPrice)
            );
            sendJSON(response, filtered);
        }
    }
    else {
        response.end("404-not-found");
    }
});

app.listen(8080, () => {
    console.log('Server đang chạy!');
});