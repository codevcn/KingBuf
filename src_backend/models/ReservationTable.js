import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Reservation from './Reservation.js';
import DiningTable from './DiningTable.js';
import Admin from './Admin.js';

const ReservationTable = sequelize.define('ReservationTable', {
  ReservationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  TableID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  AdminID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'ReservationTable',
  timestamps: false
});

export default ReservationTable;
