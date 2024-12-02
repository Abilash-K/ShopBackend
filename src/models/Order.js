import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users", // Table name for User model
            key: "id",
        },
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: { msg: "Total amount must be a valid number" },
            min: { args: [0], msg: "Total amount must be a positive value" },
        },
    },
    status: {
        type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Define associations
Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "orderItems" });
};

export default Order;
