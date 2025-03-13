import { Op } from 'sequelize';
import { Reservation, ReservationTable, DiningTable } from '../models/index.js';
import { validatePhoneNumber, isPositiveIntegerString, isIntegerString } from '../utils/validation.js';
import sequelize from '../config/db.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);
//1. Đặt chỗ
async function reserve(data) {
  // Kiểm tra xem data có phải là đối tượng hợp lệ không
  if (!data || typeof data !== 'object') {
    return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
  }

  // Danh sách các trường bắt buộc
  const requiredFields = ['Cus_FullName', 'Cus_Phone', 'ArrivalTime', 'NumAdults', 'NumChildren'];
  const errorText = {
    "Cus_FullName": "Họ và tên",
    "Cus_Phone": "Số điện thoại",
    "ArrivalTime": "Thời gian đặt bàn",
    "NumAdults": "Số lượng người lớn",
    "NumChildren": "Số lượng trẻ em"
  }

  // Kiểm tra từng trường
  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return { errorCode: 400, message: `Thiếu thông tin: ${errorText[field]}` };
    }
  }
  if (!validatePhoneNumber(data['Cus_Phone'])) {
    return { errorCode: 400, message: 'Số điện thoại không hợp lệ.' };
  }
  if (!isPositiveIntegerString(data.NumAdults))
    return {
      errorCode: 400, message: 'Số lượng người lớn phải lớn hơn hoặc bằng 1.'
    };
  if (!isIntegerString(data.NumChildren))
    return {
      errorCode: 400, message: 'Số lượng trẻ em phải lớn hơn hoặc bằng 0.'
    };
  try {
    // Chuyển đổi ArrivalTime thành đối tượng Date
    const arrivalTime = new Date(data.ArrivalTime);

    // Lấy thời điểm 15 phút trước đó
    const fifteenMinutesAgo = new Date(arrivalTime);
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);

    // Kiểm tra xem có đơn nào của cùng số điện thoại trong vòng 15 phút trước không
    const recentReservation = await Reservation.findOne({
      where: {
        Cus_Phone: data.Cus_Phone,
        ArrivalTime: {
          [Op.between]: [fifteenMinutesAgo, arrivalTime] // Kiểm tra khoảng thời gian 15 phút trước
        }
      }
    });

    if (recentReservation) {
      return { errorCode: 409, message: 'Bạn chỉ có thể đặt chỗ sau 15 phút từ lần đặt trước.' };
    }


    const reservation = await Reservation.create({
      Cus_FullName: data.Cus_FullName,
      Cus_Phone: data.Cus_Phone,
      ArrivalTime: data.ArrivalTime,
      NumAdults: data.NumAdults,
      NumChildren: data.NumChildren,
      Note: data.Note,
    });
    return reservation;
  } catch (error) {
    return { errorCode: 500, message: error.message };
  }
}


// 2. tra cứu đặt chỗ
async function getReservationsByUserInfo(data) {
  if (!data || typeof data !== 'object') {
    return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
  }

  // Danh sách các trường bắt buộc
  const requiredFields = ['Cus_FullName', 'Cus_Phone'];
  const errorText = {
    "Cus_FullName": "Họ và tên",
    "Cus_Phone": "Số điện thoại",
  }

  // Kiểm tra từng trường
  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return { errorCode: 400, message: `Thiếu thông tin: ${errorText[field]}` };
    }
  }
  if (!validatePhoneNumber(data['Cus_Phone'])) {
    return { errorCode: 400, message: 'Số điện thoại không hợp lệ.' };
  }
  try {
    const reservations = await Reservation.findAll({
      where: {
        Cus_Phone: data.Cus_Phone,
        Cus_FullName: data.Cus_FullName
      },
      include: [
        {
          model: ReservationTable,
          as: 'reservationTable',
          include: [
            {
              model: DiningTable,
              as: 'diningTable'
            }
          ]
        }
      ]
    });
    return reservations;
  } catch (error) {
    console.log(error)
    return { errorCode: 500, message: error.message };
  }
}

// 3. lấy danh sách tất cả đơn đặt chỗ
async function getAllReservation({ Status, Cus_Phone, timeRange }) {
  try {
    // Tạo điều kiện lọc
    const whereCondition = {};

    // Lọc theo Status (nếu có)
    if (Status) {
      whereCondition.Status = Status;
    }

    // Lọc theo Cus_Phone (nếu có)
    if (Cus_Phone) {
      whereCondition.Cus_Phone = Cus_Phone;
    }
    timeRange = parseInt(timeRange);
    // Lọc theo khoảng thời gian (nếu có timeRange)
    if (timeRange && typeof timeRange === 'number') {
      const now = dayjs().tz('Asia/Ho_Chi_Minh');
      console.log(now.format('YYYY-MM-DD HH:mm:ss'));  // Kiểm tra thời gian

      // Tính toán pastTime & futureTime bằng dayjs
      const pastTime = now.subtract(Math.abs(timeRange), 'hour').toDate();
      const futureTime = now.add(Math.abs(timeRange), 'hour').toDate();

      whereCondition.ArrivalTime = {
        [Op.between]: [pastTime, futureTime]
      };
    }


    // Truy vấn dữ liệu theo điều kiện lọc
    const reservations = await Reservation.findAll({ where: whereCondition });
    return reservations;
  } catch (error) {
    console.error(error);
    return { errorCode: 500, message: "Lỗi hệ thống, vui lòng thử lại." };
  }
}

// 4. từ chối 1 đơn đặt chỗ
async function rejectReservation(data) {
  if (!data || typeof data !== 'object') {
    return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
  }

  // Danh sách các trường bắt buộc
  const requiredFields = ['ReservationID', 'reject_reason'];
  const errorText = {
    "ReservationID": "Mã đặt bàn",
    "reject_reason": "Lý do từ chối",
  }

  // Kiểm tra từng trường
  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return { errorCode: 400, message: `Thiếu thông tin: ${errorText[field]}` };
    }
  }
  try {
    const reservation = await Reservation.findByPk(data.ReservationID);
    if (!reservation) {
      return { errorCode: 404, message: "Đơn đặt chỗ không tồn tại." };
    }
    const status = reservation.Status;
    if (status === "Rejected") {
      return { errorCode: 400, message: "Đơn đặt chỗ đã bị từ chối." };
    }
    await reservation.update({
      reject_reason: data.reject_reason,
      Status: "Rejected"
    })
    return reservation;
  } catch (error) {
    console.log(error);
    return { errorCode: 500, message: error.message };
  }
}
// 5. gán đơn đặt chỗ vô bàn

async function assignReservationToTable(reservationID, tableIDList, adminID) {
  const transaction = await sequelize.transaction(); // Mở transaction
  try {
    // Kiểm tra đơn đặt
    const reservation = await Reservation.findByPk(reservationID, { transaction });
    if (!reservation) {
      await transaction.rollback();
      return { errorCode: 404, message: "Đơn đặt chỗ không tồn tại." };
    }
    if (reservation.Status === "Rejected") {
      await transaction.rollback();
      return { errorCode: 400, message: "Đơn đặt chỗ đã bị từ chối." };
    }

    // Nếu danh sách bàn rỗng, chỉ cần xóa bàn cũ rồi return
    if (!tableIDList || tableIDList.length === 0) {
      await ReservationTable.destroy({
        where: { ReservationID: reservationID },
        transaction
      });
      await transaction.commit();
      return { success: true, message: "Đã xóa toàn bộ bàn khỏi đơn đặt." };
    }

    // Tổng số người trong đơn đặt
    const totalGuests = reservation.NumAdults + reservation.NumChildren;

    // Lấy thông tin bàn & kiểm tra sức chứa
    let totalCapacity = 0;
    const unavailableTables = [];

    for (const tableID of tableIDList) {
      const table = await DiningTable.findByPk(tableID, { transaction });
      if (!table) {
        unavailableTables.push({ tableID, reason: "Bàn ăn không tồn tại." });
        continue;
      }
      if (table.Status === "Maintenance") {
        unavailableTables.push({ tableID, reason: "Bàn ăn đang bảo trì." });
        continue;
      }

      totalCapacity += table.Capacity;
    }

    // Kiểm tra nếu tổng sức chứa nhỏ hơn số khách
    if (totalCapacity < totalGuests) {
      await transaction.rollback();
      return { errorCode: 400, message: "Tổng số ghế của các bàn không đủ chỗ cho đơn đặt." };
    }

    // Xóa các bản ghi không thuộc danh sách bàn mới
    await ReservationTable.destroy({
      where: { ReservationID: reservationID },
      transaction
    });

    // Kiểm tra xung đột thời gian
    const newArrivalTime = new Date(reservation.ArrivalTime);
    const twelveHoursInMs = 12 * 60 * 60 * 1000;

    for (const tableID of tableIDList) {
      const existingAssignments = await ReservationTable.findAll({
        where: { TableID: tableID },
        include: [{ model: Reservation, as: 'reservation', required: true }],
        transaction
      });

      let conflict = false;
      for (let assignment of existingAssignments) {
        const existingArrivalTime = new Date(assignment.reservation.ArrivalTime);
        if (Math.abs(newArrivalTime - existingArrivalTime) < twelveHoursInMs) {
          unavailableTables.push({ tableID, reason: "Bàn không trống vào thời gian này." });
          conflict = true;
          break;
        }
      }
      if (conflict) continue;

      // Gán bàn cho đơn đặt
      await ReservationTable.create({ ReservationID: reservationID, TableID: tableID, AdminID: adminID }, { transaction });
    }

    if (unavailableTables.length > 0) {
      await transaction.rollback();
      return { errorCode: 400, message: unavailableTables };
    }

    await transaction.commit();
    return { success: true, message: "Gán bàn thành công." };
  } catch (error) {
    await transaction.rollback();
    console.error("Lỗi khi gán bàn:", error);
    return { errorCode: 500, message: "Lỗi hệ thống, vui lòng thử lại." };
  }
}

async function updateReservation(data) {
  if (!data || typeof data !== 'object') {
    return { errorCode: 400, message: "Dữ liệu đầu vào không hợp lệ." };
  }

  const requiredFields = ['ReservationID'];
  const errorText = { "ReservationID": "Mã đặt bàn" };

  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return { errorCode: 400, message: `Thiếu thông tin: ${errorText[field]}` };
    }
  }

  try {
    const reservation = await Reservation.findByPk(data.ReservationID);
    if (!reservation) {
      return { errorCode: 404, message: "Đơn đặt chỗ không tồn tại." };
    }
    if (reservation.Status === "Rejected") {
      return { errorCode: 400, message: "Đơn đặt chỗ đã bị từ chối." };
    }

    let updateData = {};
    let hasChanges = false;

    // Kiểm tra xem có bàn nào được gán chưa
    const assignedTables = await ReservationTable.findAll({
      where: { ReservationID: reservation.ReservationID },
      include: [{ model: DiningTable, as: 'diningTable', attributes: ['Capacity'] }]
    });
    console.log(assignedTables)
    const hasAssignedTables = assignedTables.length > 0;
    data.NumAdults = parseInt(data.NumAdults);
    data.NumChildren = parseInt(data.NumChildren);

    if (isNaN(data.NumAdults)) {
      data.NumAdults = reservation.NumAdults;
  }
  if (isNaN(data.NumChildren)) {
      data.NumChildren = reservation.NumChildren;
  }
  
    // Kiểm tra và cập nhật NumAdults, NumChildren
    if (data.NumAdults || data.NumChildren) {

      const totalNewPeople = (data.NumAdults ?? reservation.NumAdults) + (data.NumChildren ?? reservation.NumChildren);

      if (hasAssignedTables) {
        // Tính tổng số người tối đa có thể chứa từ các bàn đã gán
        const maxPeopleAllowed = assignedTables.reduce((sum, table) => sum + table.diningTable.Capacity, 0);

        if (totalNewPeople > maxPeopleAllowed) {
          return { errorCode: 400, message: "Tổng số người vượt quá sức chứa tối đa của bàn." };
        }
      }

      if (data.NumAdults !== reservation.NumAdults || data.NumChildren !== reservation.NumChildren) {
        updateData.NumAdults = data.NumAdults ?? reservation.NumAdults;
        updateData.NumChildren = data.NumChildren ?? reservation.NumChildren;
        hasChanges = true;
      }
    }

    // Kiểm tra và cập nhật ArrivalTime
    if (data.ArrivalTime !== undefined) {
      const newArrivalTime = dayjs(data.ArrivalTime);
      const now = dayjs().tz('Asia/Ho_Chi_Minh');

      if (newArrivalTime.isBefore(now)) {
        return { errorCode: 400, message: "Thời gian đặt bàn không thể ở quá khứ." };
      }

      // Kiểm tra trùng lịch bàn (nếu có bàn đã được gán)
      if (hasAssignedTables) {
        const hasConflict = await ReservationTable.findOne({
          where: { ReservationID: reservation.ReservationID },
          include: [{
            model: Reservation,
            as: 'reservation',
            where: {
              ArrivalTime: {
                [Op.between]: [
                  new Date(newArrivalTime.valueOf() - 12 * 60 * 60 * 1000),
                  new Date(newArrivalTime.valueOf() + 12 * 60 * 60 * 1000)
                ]
              },
              Status: { [Op.not]: "Completed" }
            }
          }]
        });

        if (hasConflict) {
          return { errorCode: 400, message: "Bàn đã được đặt trong khoảng thời gian này." };
        }
      }

      if (data.ArrivalTime !== reservation.ArrivalTime) {
        updateData.ArrivalTime = data.ArrivalTime;
        hasChanges = true;
      }
    }

    // Nếu không có thay đổi, báo không có dữ liệu cần cập nhật
    if (!hasChanges) {
      return { errorCode: 400, message: "Không có dữ liệu nào thay đổi." };
    }

    // Cập nhật vào DB
    await reservation.update(updateData);
    return { success: true, message: "Cập nhật thành công.", data: reservation };

  } catch (error) {
    console.log(error);
    return { errorCode: 500, message: error.message };
  }
}



export { reserve, getReservationsByUserInfo, getAllReservation, rejectReservation, assignReservationToTable, updateReservation };