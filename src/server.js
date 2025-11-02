const express = require('express');
const path = require('path');
const SweetShop = require('./SweetShop');
const app = express();
const port = 3000;

// Create a new SweetShop instance
const sweetShop = new SweetShop();

// Initialize with some sweets
sweetShop.addSweet('Chocolate', 50, 2.50);
sweetShop.addSweet('Candy', 100, 1.00);
sweetShop.addSweet('Lollipop', 75, 0.75);
sweetShop.addSweet('Gummies', 60, 2.00);
sweetShop.addSweet('Caramel', 40, 1.75);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route handlers for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/inventory', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inventory.html'));
});

app.get('/sales', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sales.html'));
});

// API endpoint to get inventory
app.get('/api/inventory', (req, res) => {
    res.json(sweetShop.getInventory());
});

// API endpoint to get sales report
app.get('/api/sales', (req, res) => {
    const salesReport = sweetShop.getSalesReport();
    let totalSales = 0;
    let transactions = [];
    
    if (salesReport && salesReport.transactions) {
        transactions = salesReport.transactions.map(transaction => ({
            name: transaction.name,
            quantity: transaction.quantity,
            price: transaction.unitPrice,
            totalAmount: transaction.totalAmount,
            timestamp: transaction.timestamp
        }));
        totalSales = salesReport.totalSales || 0;
    }
    
    res.json({
        sales: transactions,
        totalSales: totalSales
    });
});

// API endpoint to add a sweet
app.post('/api/sweets/add', (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        sweetShop.addSweet(name, quantity, price);
        res.json({ success: true, message: 'Sweet added successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// API endpoint to sell a sweet
app.post('/api/sweets/sell', (req, res) => {
    try {
        const { name, quantity } = req.body;
        sweetShop.sellSweet(name, quantity);
        res.json({ success: true, message: 'Sweet sold successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Sweet Shop server running at http://localhost:${port}`);
});