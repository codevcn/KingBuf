import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const DiningTable = sequelize.define('DiningTable', {
  TableID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  TableNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        min: 1 // Đảm bảo Capacity lớn hơn 0
    }
  },
  Location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Status: {
    type: DataTypes.ENUM('Available', 'Maintenance'),
    defaultValue: 'Available',
    allowNull: false
  }
}, {
  tableName: 'DiningTables',
  timestamps: false
});

export default DiningTable;
