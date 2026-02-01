const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// 1. Our Data
const inventory = [
    { id: 1, name: 'Red Apples', price: 0.99 },
    { id: 2, name: 'Fresh Milk', price: 3.50 },
    { id: 3, name: 'Artisan Bread', price: 4.25 }
];

let cart = [];

// 2. The "Render" Function (Pure JS HTML Template)
const renderPage = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const inventoryHTML = inventory.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding:5px;">
            <span>${item.name} - <b>$${item.price.toFixed(2)}</b></span>
            <form action="/add" method="POST" style="margin:0;">
                <input type="hidden" name="id" value="${item.id}">
                <button type="submit" style="background:#28a745; color:white; border:none; cursor:pointer; padding:5px 10px; border-radius:4px;">Add</button>
            </form>
        </div>
    `).join('');

    const cartHTML = cart.length === 0 
        ? '<p>Basket is empty</p>' 
        : `<ul>${cart.map(i => `<li>${i.name} ($${i.price.toFixed(2)})</li>`).join('')}</ul>
           <hr>
           <h3>Total: $${total.toFixed(2)}</h3>
           <form action="/clear" method="POST"><button type="submit" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px;">Empty Basket</button></form>`;

    return `
    <!DOCTYPE html>
    <html>
    <head><title>Node Market</title></head>
    <body style="font-family:sans-serif; max-width:600px; margin:40px auto; padding:20px; border:1px solid #ccc; border-radius:10px;">
        <h1>🛒 Node Supermarket</h1>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
            <div><h2>Products</h2>${inventoryHTML}</div>
            <div style="background:#f9f9f9; padding:15px; border-radius:8px;"><h2>Cart</h2>${cartHTML}</div>
        </div>
    </body>
    </html>`;
};

// 3. Routes
app.get('/', (req, res) => {
    res.send(renderPage());
});

app.post('/add', (req, res) => {
    const product = inventory.find(p => p.id === parseInt(req.body.id));
    if (product) cart.push(product);
    res.redirect('/');
});

app.post('/clear', (req, res) => {
    cart = [];
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));