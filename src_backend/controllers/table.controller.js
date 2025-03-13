import { createDiningTable, getDiningTables ,getDiningTableByID, updateDiningTableByID, delDiningTable, getAvailableDiningTables } from "../services/table.service.js";

// 1. Tạo bàn ăn
async function addDiningTable(req, res) {
    try {
        const {TableNumber, Capacity, Location} = req.body;
        const result = await createDiningTable({
            TableNumber,
            Capacity,
            Location
        })
        if (result.errorCode) {
            return res.status(result.errorCode).json({ message: result.message });
          }
          
          // Nếu thành công, trả về thông báo và dữ liệu đặt bàn
          return res.status(201).json({
            message: 'Tạo bàn thành công.',
            diningTable: result
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// 2. Lấy tất cả bàn ăn
async function getAllDiningTables(req, res) {
    try {
        const result = await getDiningTables(req.body);
        return res.status(200).json({
            message: 'Danh sách tất cả bàn ăn.',
            diningTables: result
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// 3. Lấy bàn ăn theo mã bàn
async function getDiningTableByid(req,res) {
    try {
        const tableId = req.params.id;
        const result = await getDiningTableByID(tableId);
        if (result.errorCode) {
            return res.status(result.errorCode).json({ message: result.message });
        }
        return res.status(200).json({
            message: 'Thông tin bàn ăn:',
            diningTable: result
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// 4. Cập nhật bàn ăn
async function updateDiningTableByid(req,res) {
    try {
        const tableId = req.params.id;
    
        // Gộp TableID vào dữ liệu cập nhật từ body
        const updateData = { ...req.body, TableID: tableId };
        
        const result = await updateDiningTableByID(updateData);
        if (result.errorCode) {
            return res.status(result.errorCode).json({ message: result.message });
        }
          
        return res.status(200).json({
        message: 'Cập nhật bàn thành công.',
        diningTable: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// 5. xoá bàn ăn (!=Available )
async function deleteDiningTable(req,res) {
    try {
        const tableId = req.params.id;
        const result = await delDiningTable(tableId);
        if (result.errorCode) {
            return res.status(result.errorCode).json({ message: result.message });
        }   
        return res.status(200).json({
        message: result.message,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// 6. lấy danh sách bàn trống chỗ
async function getAvailableTablesController(req, res) {
    try {
        const { time, numberOfPeople } = req.body;       
        const numPeople = numberOfPeople ? parseInt(numberOfPeople, 10) : undefined;
        
        const result = await getAvailableDiningTables(time, numPeople);
        if (result.errorCode) {
        return res.status(result.errorCode).json({ message: result.message });
        }
        
        return res.status(200).json({ availableTables: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
  }

export {addDiningTable, getAllDiningTables, getDiningTableByid, updateDiningTableByid, deleteDiningTable, getAvailableTablesController};