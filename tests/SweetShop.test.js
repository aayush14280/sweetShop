const SweetShop = require('../src/SweetShop');

describe('SweetShop', () => {
  let sweetShop;

  beforeEach(() => {
    sweetShop = new SweetShop();
  });

  describe('addSweet', () => {
    test('should add a new sweet to inventory', () => {
      const result = sweetShop.addSweet('Chocolate', 10, 2.5);
      
      expect(result).toEqual({
        name: 'Chocolate',
        quantity: 10,
        price: 2.5
      });
      
      expect(sweetShop.getInventory()).toEqual({
        'Chocolate': { quantity: 10, price: 2.5 }
      });
    });

    test('should update quantity if sweet already exists', () => {
      sweetShop.addSweet('Chocolate', 10, 2.5);
      const result = sweetShop.addSweet('Chocolate', 5, 2.5);
      
      expect(result).toEqual({
        name: 'Chocolate',
        quantity: 15,
        price: 2.5
      });
      
      expect(sweetShop.getInventory()).toEqual({
        'Chocolate': { quantity: 15, price: 2.5 }
      });
    });

    test('should update price if sweet already exists', () => {
      sweetShop.addSweet('Chocolate', 10, 2.5);
      const result = sweetShop.addSweet('Chocolate', 5, 3.0);
      
      expect(result).toEqual({
        name: 'Chocolate',
        quantity: 15,
        price: 3.0
      });
      
      expect(sweetShop.getInventory()).toEqual({
        'Chocolate': { quantity: 15, price: 3.0 }
      });
    });

    test('should throw error if name is not a string', () => {
      expect(() => sweetShop.addSweet(null, 10, 2.5)).toThrow('Sweet name must be a non-empty string');
    });

    test('should throw error if quantity is not a positive integer', () => {
      expect(() => sweetShop.addSweet('Chocolate', -1, 2.5)).toThrow('Quantity must be a positive integer');
      expect(() => sweetShop.addSweet('Chocolate', 0, 2.5)).toThrow('Quantity must be a positive integer');
      expect(() => sweetShop.addSweet('Chocolate', 1.5, 2.5)).toThrow('Quantity must be a positive integer');
    });

    test('should throw error if price is not a positive number', () => {
      expect(() => sweetShop.addSweet('Chocolate', 10, -1)).toThrow('Price must be a positive number');
      expect(() => sweetShop.addSweet('Chocolate', 10, 0)).toThrow('Price must be a positive number');
    });
  });

  describe('sellSweet', () => {
    beforeEach(() => {
      sweetShop.addSweet('Chocolate', 10, 2.5);
      sweetShop.addSweet('Candy', 20, 1.0);
    });

    test('should sell a sweet and update inventory', () => {
      const result = sweetShop.sellSweet('Chocolate', 3);
      
      expect(result.name).toBe('Chocolate');
      expect(result.quantity).toBe(3);
      expect(result.unitPrice).toBe(2.5);
      expect(result.totalAmount).toBe(7.5);
      expect(result.timestamp).toBeInstanceOf(Date);
      
      expect(sweetShop.getInventory()).toEqual({
        'Chocolate': { quantity: 7, price: 2.5 },
        'Candy': { quantity: 20, price: 1.0 }
      });
    });

    test('should throw error if sweet does not exist', () => {
      expect(() => sweetShop.sellSweet('Lollipop', 3)).toThrow("Sweet 'Lollipop' not found in inventory");
    });

    test('should throw error if insufficient quantity', () => {
      expect(() => sweetShop.sellSweet('Chocolate', 15)).toThrow("Insufficient quantity of 'Chocolate' in inventory");
    });

    test('should throw error if quantity is not a positive integer', () => {
      expect(() => sweetShop.sellSweet('Chocolate', -1)).toThrow('Quantity must be a positive integer');
      expect(() => sweetShop.sellSweet('Chocolate', 0)).toThrow('Quantity must be a positive integer');
    });

    test('should update total sales amount', () => {
      sweetShop.sellSweet('Chocolate', 3);
      sweetShop.sellSweet('Candy', 5);
      
      const salesReport = sweetShop.getSalesReport();
      expect(salesReport.totalSales).toBe(12.5); // 3*2.5 + 5*1.0
    });
  });

  describe('getInventory', () => {
    test('should return empty object for new shop', () => {
      expect(sweetShop.getInventory()).toEqual({});
    });

    test('should return current inventory', () => {
      sweetShop.addSweet('Chocolate', 10, 2.5);
      sweetShop.addSweet('Candy', 20, 1.0);
      
      expect(sweetShop.getInventory()).toEqual({
        'Chocolate': { quantity: 10, price: 2.5 },
        'Candy': { quantity: 20, price: 1.0 }
      });
    });
  });

  describe('getSalesReport', () => {
    test('should return empty sales report for new shop', () => {
      const report = sweetShop.getSalesReport();
      expect(report.totalSales).toBe(0);
      expect(report.transactions).toEqual([]);
    });

    test('should return sales report with transactions', () => {
      sweetShop.addSweet('Chocolate', 10, 2.5);
      sweetShop.addSweet('Candy', 20, 1.0);
      
      sweetShop.sellSweet('Chocolate', 3);
      sweetShop.sellSweet('Candy', 5);
      
      const report = sweetShop.getSalesReport();
      expect(report.totalSales).toBe(12.5);
      expect(report.transactions.length).toBe(2);
      
      expect(report.transactions[0].name).toBe('Chocolate');
      expect(report.transactions[0].quantity).toBe(3);
      expect(report.transactions[0].totalAmount).toBe(7.5);
      
      expect(report.transactions[1].name).toBe('Candy');
      expect(report.transactions[1].quantity).toBe(5);
      expect(report.transactions[1].totalAmount).toBe(5);
    });
  });
});