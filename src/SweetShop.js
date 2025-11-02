/**
 * SweetShop class for managing sweets inventory and sales
 */
class SweetShop {
  constructor() {
    this.inventory = {};
    this.sales = [];
    this.totalSales = 0;
  }

  /**
   * Add or update a sweet in the inventory
   * @param {string} name - Name of the sweet
   * @param {number} quantity - Quantity to add
   * @param {number} price - Price per unit
   * @returns {object} - Updated sweet information
   * @throws {Error} - If inputs are invalid
   */
  addSweet(name, quantity, price) {
    // Validate inputs
    if (!name || typeof name !== 'string') {
      throw new Error('Sweet name must be a non-empty string');
    }
    
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }
    
    if (typeof price !== 'number' || price <= 0) {
      throw new Error('Price must be a positive number');
    }
    
    // Add or update sweet in inventory
    if (this.inventory[name]) {
      this.inventory[name].quantity += quantity;
      this.inventory[name].price = price; // Update price if changed
    } else {
      this.inventory[name] = { quantity, price };
    }
    
    return { name, ...this.inventory[name] };
  }

  /**
   * Sell a sweet from inventory
   * @param {string} name - Name of the sweet
   * @param {number} quantity - Quantity to sell
   * @returns {object} - Sale information
   * @throws {Error} - If sweet doesn't exist or insufficient quantity
   */
  sellSweet(name, quantity) {
    // Validate inputs
    if (!name || typeof name !== 'string') {
      throw new Error('Sweet name must be a non-empty string');
    }
    
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }
    
    // Check if sweet exists in inventory
    if (!this.inventory[name]) {
      throw new Error(`Sweet '${name}' not found in inventory`);
    }
    
    // Check if enough quantity is available
    if (this.inventory[name].quantity < quantity) {
      throw new Error(`Insufficient quantity of '${name}' in inventory`);
    }
    
    // Update inventory
    this.inventory[name].quantity -= quantity;
    
    // Calculate sale amount
    const saleAmount = this.inventory[name].price * quantity;
    
    // Record sale
    const saleRecord = {
      name,
      quantity,
      unitPrice: this.inventory[name].price,
      totalAmount: saleAmount,
      timestamp: new Date()
    };
    
    this.sales.push(saleRecord);
    this.totalSales += saleAmount;
    
    return saleRecord;
  }

  /**
   * Get current inventory
   * @returns {object} - Current inventory
   */
  getInventory() {
    return { ...this.inventory };
  }

  /**
   * Get sales report
   * @returns {object} - Sales report with total sales and transactions
   */
  getSalesReport() {
    return {
      totalSales: this.totalSales,
      transactions: [...this.sales]
    };
  }
}

module.exports = SweetShop;