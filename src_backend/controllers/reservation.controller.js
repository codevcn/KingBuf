import { reserve, getReservationsByUserInfo, getAllReservation, rejectReservation,assignReservationToTable, updateReservation} from '../services/reservation.service.js';

//1. Đặt chỗ
async function addReservation(req, res) {
    try {
      // Lấy dữ liệu từ request body
      const { Cus_FullName, Cus_Phone, ArrivalTime, NumAdults, NumChildren, Note } = req.body;
      const result = await reserve({ 
        Cus_FullName, 
        Cus_Phone, 
        ArrivalTime, 
        NumAdults, 
        NumChildren, 
        Note 
      });
  
      if (result.errorCode) {
        return res.status(result.errorCode).json({ message: result.message });
      }
      
      // Nếu thành công, trả về thông báo và dữ liệu đặt bàn
      return res.status(201).json({
        message: 'Đặt bàn thành công.',
        reservation: result
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

// 2. tra cứu đặt chỗ
async function getReservationsByUserInfoCtrl(req, res) {
  try {
    const data = req.body;
    const result = await getReservationsByUserInfo(data);
    if (result.errorCode) {
      return res.status(result.errorCode).json({ message: result.message });
    }
    
    // Nếu thành công, trả về thông báo và dữ liệu đặt bàn
    return res.status(200).json({
      message: 'Danh sách các đơn đặt bàn.',
      reservations: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 3. lấy danh sách tất cả đơn đặt chỗ
async function getAllReservationCtrl(req,res) {
  try {
    const result = await getAllReservation(req.body);
    return res.status(200).json({
        message: 'Danh sách tất cả đơn đặt bàn.',
        reservations: result
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
}
}

// 4. từ chối 1 đơn đặt chỗ
async function rejectReservationCtrl(req,res) {
  try {
    const reservationID = req.params.id;
    const updateData = { ...req.body, ReservationID: reservationID };
    const result = await rejectReservation(updateData);
    if (result.errorCode) {
      return res.status(result.errorCode).json({ message: result.message });
    }
      
    return res.status(200).json({
      message: 'Cập nhật từ chối đặt bàn thành công.',
      reservation: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
}

// 5. gán đơn đặt chỗ vô bàn
async function assignReservationToTableCtrl(req, res) {
  // Lấy reservationID và tableID từ req.body
  let { reservationID, tableIDList } = req.body;
  const arr = JSON.parse(tableIDList);
  console.log(arr);
  tableIDList = arr;
  const adminID = req.session.admin.id;
  
  if (!reservationID || !tableIDList) {
    return res.status(400).json({ message: "Thiếu thông tin: reservationID hoặc tableID." });
  }
  
  const result = await assignReservationToTable(reservationID, tableIDList, adminID);
  if (result.errorCode) {
    return res.status(result.errorCode).json({ message: result.message });
  }
  
  return res.status(200).json({
    message: "Gán đơn đặt chỗ vào bàn thành công.",
    assignment: result
  });
}

async function updateReservationCtrl(req, res) {
  try {
    const reservationID = req.params.id;
    const updateData = { ...req.body, ReservationID: reservationID };
    const result = await updateReservation(updateData);
    if (result.errorCode) {
      return res.status(result.errorCode).json({ message: result.message });
    }
      
    return res.status(200).json({
      message: 'Cập nhật thông tin đặt bàn thành công.',
      reservation: result
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
}

export {addReservation, getReservationsByUserInfoCtrl, getAllReservationCtrl, rejectReservationCtrl, assignReservationToTableCtrl, updateReservationCtrl};