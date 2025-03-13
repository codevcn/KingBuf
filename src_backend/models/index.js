import Admin from './Admin.js';
import Reservation from './Reservation.js';
import DiningTable from './DiningTable.js';
import ReservationTable from './ReservationTable.js';

// 1. Một Reservation có thể có 1 ReservationTable
Reservation.hasOne(ReservationTable, {
  foreignKey: 'ReservationID',
  as: 'reservationTable'
});
ReservationTable.belongsTo(Reservation, {
  foreignKey: 'ReservationID',
  as: 'reservation'
});

// 2. Một DiningTable có thể có nhiều ReservationTable
DiningTable.hasMany(ReservationTable, {
  foreignKey: 'TableID',
  as: 'reservationTable'
});
ReservationTable.belongsTo(DiningTable, {
  foreignKey: 'TableID',
  as: 'diningTable'
});

// 3. Một Admin có thể gán nhiều ReservationTable
Admin.hasMany(ReservationTable, {
  foreignKey: 'AdminID',
  as: 'reservationTable'
});
ReservationTable.belongsTo(Admin, {
  foreignKey: 'AdminID',
  as: 'admin'
});

export { Admin, Reservation, DiningTable, ReservationTable };
