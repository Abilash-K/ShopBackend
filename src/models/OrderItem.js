import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';  // Database configuration

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders',  // Reference to the Orders table
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products',  // Reference to the Products table
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: function () {
      return this.quantity * this.price;
    },
  },
});

OrderItem.associate = (models) => {
    // An order item belongs to one order
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    
    // An order item belongs to one product
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  
export default OrderItem;