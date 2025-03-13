import {DiningTable, ReservationTable, Reservation } from '../models/index.js';
import { isPositiveIntegerString } from "../utils/validation.js";
import { Op } from 'sequelize';
import sequelize from '../config/db.js';

// 1. Tạo bàn ăn
async function createDiningTable(data) {
    if (!data || typeof data !== 'object') {
        return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
    }
    // Danh sách các trường bắt buộc
    const requiredFields = ['TableNumber', 'Capacity'];
    const errorText = {
        "TableNumber": "Số hiệu bàn",
        "Capacity": "Số người tối đa",
    }
  
    // Kiểm tra từng trường
    for (let field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        return { errorCode: 400, message: `Thiếu thông tin: ${errorText[field]}` };
      }
    }

    if(!isPositiveIntegerString(data.Capacity)){
        return  { errorCode: 400, message: "Số bàn phải là số nguyên dương" };
    }

    try {
        const diningTable = await DiningTable.create({
            TableNumber: data.TableNumber,
            Capacity: data.Capacity,
            Location: data.Location
        });
        return diningTable;
      } catch (error) {
        console.error(error);
        console.error(error);
        // Kiểm tra nếu lỗi do trùng TableNumber
        if (error.name === 'SequelizeUniqueConstraintError') {
        return { errorCode: 400, message: "Số hiệu bàn đã tồn tại." };
        }
        return { errorCode: 500, message: error.message };
      }
}

// 2. Lấy tất cả bàn ăn
async function getDiningTables({ peopleCount, arrivalTime, status }) {
  try {
      // Nếu không có status, mặc định lấy cả Available & Maintenance
      const statusFilter = status ? [status] : ['Available', 'Maintenance'];

      // Điều kiện lọc bàn ăn
      const tableWhere = {
          Status: { [Op.in]: statusFilter }
      };
      if (peopleCount) {
          tableWhere.Capacity = { [Op.gte]: peopleCount }; // Lọc theo số người (nếu có)
      }

      // Lấy danh sách bàn theo điều kiện
      const tables = await DiningTable.findAll({ where: tableWhere });

      // Nếu không có arrivalTime, không cần kiểm tra đơn đặt
      if (!arrivalTime) return tables;

      // Chuyển arrivalTime về Date & tính khoảng thời gian 12 tiếng
      const timePoint = new Date(arrivalTime);
      const twelveHoursInMs = 12 * 60 * 60 * 1000;

      // Lấy danh sách bàn đã có đơn đặt trong vòng 12 tiếng
      const reservedTables = await ReservationTable.findAll({
          attributes: ['TableID'],
          include: [{
              model: Reservation,
              as: 'reservation',
              required: true,
              where: {
                  ArrivalTime: {
                      [Op.between]: [
                          new Date(timePoint.getTime() - twelveHoursInMs), // 12h trước
                          new Date(timePoint.getTime() + twelveHoursInMs)  // 12h sau
                      ]
                  },
                  Status: { [Op.ne]: 'Completed' } // Loại đơn đã hoàn thành
              }
          }]
      });

      // Lấy danh sách TableID bị bận
      const busyTableIDs = reservedTables.map(rt => rt.TableID);

      // Lọc danh sách bàn rảnh
      const availableTables = tables.filter(table => !busyTableIDs.includes(table.TableID));

      return availableTables;
  } catch (error) {
      console.error(error);
      return { errorCode: 500, message: "Lỗi hệ thống, vui lòng thử lại." };
  }
}

// 3. Lấy bàn ăn theo mã bàn
async function getDiningTableByID(TableID) {
    if (!TableID) {
        return { errorCode: 400, message: "Thiếu thông tin: TableID" };
    }
    try {
        const diningTable = await DiningTable.findByPk(TableID);
        if (!diningTable) {
            return { errorCode: 404, message: "Bàn ăn không tồn tại." };
        }
        return diningTable;
    } catch (error) {
        console.error(error);
        return { errorCode: 500, message: error.message };
    }
}

async function updateDiningTableByID(data) {
  if (!data || typeof data !== 'object') {
      return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
  }

  if (!data.TableID) {
      return { errorCode: 400, message: "Thiếu thông tin: TableID" };
  }

  const transaction = await sequelize.transaction(); // Bắt đầu transaction

  try {
      const diningTable = await DiningTable.findByPk(data.TableID, { transaction });

      if (!diningTable) {
          await transaction.rollback();
          return { errorCode: 404, message: "Bàn ăn không tồn tại." };
      }

      const updateData = {};

      // Kiểm tra dữ liệu có thay đổi không trước
      if (data.Location !== undefined && data.Location !== diningTable.Location) {
          updateData.Location = data.Location;
      }
      if (data.Capacity !== undefined && parseInt(data.Capacity) !== diningTable.Capacity) {
          updateData.Capacity = parseInt(data.Capacity);
      }
      if (data.Status !== undefined && data.Status !== diningTable.Status) {
          updateData.Status = data.Status;
      }

      // Nếu không có dữ liệu nào thay đổi, trả về lỗi ngay lập tức
      if (Object.keys(updateData).length === 0) {
          await transaction.rollback();
          return { errorCode: 400, message: "Không có dữ liệu thay đổi." };
      }

      // Nếu cập nhật Capacity hoặc Status, kiểm tra đơn đặt trong tương lai
      if (updateData.Capacity !== undefined || updateData.Status !== undefined) {
          const now = new Date();
          const futureReservation = await ReservationTable.findOne({
              where: { TableID: data.TableID },
              include: [{
                  model: Reservation,
                  as: 'reservation',
                  required: true,
                  where: {
                      ArrivalTime: { [Op.gte]: now } // Đơn có thời gian đến trong tương lai
                  }
              }],
              transaction
          });

          if (futureReservation) {
              await transaction.rollback();
              return { errorCode: 400, message: "Không thể cập nhật Capacity hoặc Status khi bàn có đơn đặt chỗ trong tương lai." };
          }
      }

      // Tiến hành cập nhật bàn ăn
      await diningTable.update(updateData, { transaction });

      await transaction.commit(); // Lưu thay đổi
      return { success: true, message: "Cập nhật bàn thành công.", diningTable };

  } catch (error) {
      await transaction.rollback(); // Hoàn tác nếu có lỗi
      console.error(error);
      return { errorCode: 500, message: "Lỗi hệ thống, vui lòng thử lại." };
  }
}



async function delDiningTable(TableID) {
  if (!TableID) {
      return { errorCode: 400, message: "Thiếu thông tin: TableID" };
  }
  
  const transaction = await sequelize.transaction(); // Bắt đầu transaction

  try {
      // Tìm bàn ăn
      const diningTable = await DiningTable.findByPk(TableID, { transaction });
      if (!diningTable) {
          await transaction.rollback();
          return { errorCode: 404, message: "Bàn ăn không tồn tại." };
      }


      // Kiểm tra xem bàn có đang được gán vào đơn đặt chỗ nào không
      const assignedReservation = await ReservationTable.findOne({
          where: { TableID },
          transaction
      });

      if (assignedReservation) {
          await transaction.rollback();
          return { errorCode: 400, message: "Không thể xóa bàn vì đang được gán vào đơn đặt chỗ." };
      }

      // Xóa bàn nếu không có đơn đặt nào
      await diningTable.destroy({ transaction });

      await transaction.commit(); // Xác nhận thay đổi
      return { message: "Xóa bàn thành công." };

  } catch (error) {
      await transaction.rollback(); // Hoàn tác nếu có lỗi
      console.error(error);
      return { errorCode: 500, message: "Lỗi hệ thống, vui lòng thử lại." };
  }
}


// 6. lấy danh sách bàn trống chỗ
async function getAvailableDiningTables(inputTime, numberOfPeople) {
  if (!inputTime) {
    return { errorCode: 400, message: "Thiếu thông tin: Thời gian." };
  }
  
  // Xây dựng điều kiện truy vấn bàn dựa trên trạng thái và số người nếu có
  const tableCondition = { Status: 'Available' };
  if (numberOfPeople !== undefined) {
    tableCondition.Capacity = { [Op.gte]: numberOfPeople };
  }

  // Chuyển inputTime thành đối tượng Date
  const desiredTime = new Date(inputTime);
  // Giới hạn thời gian chặn (12 giờ) tính bằng mili-giây
  const twelveHoursInMs = 12 * 60 * 60 * 1000;

  if (isNaN(desiredTime.getTime())) {
    return { errorCode: 400, message: "Định dạng thời gian không hợp lệ." };
  }
  
  try {
    
    // Truy vấn DiningTable kèm theo ReservationTable (và bên trong có Reservation)
    const tables = await DiningTable.findAll({
      where: tableCondition,
      include: [{
        model: ReservationTable,
        as: 'reservationTable',
        required: false,  // sử dụng left join
        include: [{
          model: Reservation,
          as: 'reservation',
          required: false
        }]
      }]
    });
    
    // Lọc ra các bàn có thể đặt:
    // Nếu bàn chưa có đơn đặt nào, hoặc tất cả đơn đặt của bàn đều cách desiredTime >= 12 giờ
    const availableTables = tables.filter(table => {
      if (!table.reservationTable) return true;
      
      // Ép sang mảng để xử lý thống nhất
      let reservations = Array.isArray(table.reservationTable)
        ? table.reservationTable
        : [table.reservationTable];
      
      // Nếu có bất kỳ đơn đặt nào mà khoảng cách giữa ArrivalTime và desiredTime < 12 giờ thì bàn không khả dụng
      for (let rt of reservations) {
        // Nếu bản ghi có status là Completed thì bỏ qua
        if (rt.Status === 'Completed') continue;

        if (rt.reservation) {
          const resTime = new Date(rt.reservation.ArrivalTime);
          if (Math.abs(desiredTime - resTime) < twelveHoursInMs) {
            return false;
          }
        }
      }
      return true;
    });
    
    // Sau khi lọc, chỉ trả về danh sách các bàn (DiningTable)
    const result = availableTables.map(table => ({
      TableID: table.TableID,
      TableNumber: table.TableNumber,
      Capacity: table.Capacity,
      Location: table.Location,
      Status: table.Status
    }));
    
    return result;
  } catch (error) {
    console.error(error);
    return { errorCode: 500, message: error.message };
  }
}
  

export {createDiningTable, getDiningTables, updateDiningTableByID, delDiningTable, getDiningTableByID, getAvailableDiningTables};