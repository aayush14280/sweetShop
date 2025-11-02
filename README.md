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


