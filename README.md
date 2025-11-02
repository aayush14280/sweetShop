# SweetShop
A JavaScript implementation of a sweet shop inventory and sales management system built using Test-Driven Development (TDD) principles for the Incubyte AI Kata assessment.

## Project Structure
```
sweetShopJavaScript/
├── src/
│   ├── SweetShop.js       # Main SweetShop class implementation
│   └── server.js          # Server entry point
├── tests/
│   └── SweetShop.test.js  # Jest tests for SweetShop class
├── package.json           # Project configuration and dependencies
└── README.md              # Project documentation
```

## Features
- Add or update sweets in inventory with name, quantity, and price
- Sell sweets from inventory and record sales transactions
- Get current inventory status
- Generate sales reports with total sales and transaction history
- Input validation and error handling

## TDD Workflow
This project was developed using Test-Driven Development:
1. **Write a failing test**: Tests were written first to define the expected behavior
2. **Implement the code**: Code was written to make the tests pass
3. **Refactor**: Code was improved while ensuring tests still pass
4. **Repeat**: The process was repeated for each feature

## Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

To run the sweet shop server:
```bash
node src/server.js
```

## Running Tests

Run tests once:
```bash
npm test
```

Run tests in watch mode (automatically re-runs when files change):
```bash
npm run test:watch
```

## Usage Example
```javascript
const SweetShop = require('./src/SweetShop');

// Create a new sweet shop
const shop = new SweetShop();

// Add sweets to inventory
shop.addSweet('Chocolate', 10, 2.5);
shop.addSweet('Candy', 20, 1.0);

// Sell sweets
shop.sellSweet('Chocolate', 3);

// Get inventory
const inventory = shop.getInventory();
console.log(inventory);

// Get sales report
const salesReport = shop.getSalesReport();
console.log(salesReport);
```

## API Reference

### `addSweet(name, quantity, price)`
Adds or updates a sweet in the inventory.
- **Parameters**:
  - `name` (string): Name of the sweet
  - `quantity` (number): Quantity to add
  - `price` (number): Price per unit
- **Returns**: Object with updated sweet information
- **Throws**: Error if inputs are invalid

### `sellSweet(name, quantity)`
Sells a sweet from inventory.
- **Parameters**:
  - `name` (string): Name of the sweet
  - `quantity` (number): Quantity to sell
- **Returns**: Object with sale information
- **Throws**: Error if sweet doesn't exist or insufficient quantity

### `getInventory()`
Gets current inventory.
- **Returns**: Object with current inventory

### `getSalesReport()`
Gets sales report.
- **Returns**: Object with total sales and transaction history
