import express from 'express';
import { addDiningTable, getAllDiningTables, getDiningTableByid, updateDiningTableByid, deleteDiningTable, getAvailableTablesController } from '../controllers/table.controller.js';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';


const router = express.Router();


// route tạo bàn ăn
router.post('/createDiningTable',ensureAuthenticated, addDiningTable);

// route lấy danh sách tất cả bàn ăn
router.get('/getAllDiningTable',ensureAuthenticated, getAllDiningTables);

// route lấy bàn ăn theo TableID
router.get('/getDiningTable/:id',ensureAuthenticated, getDiningTableByid);

// route cập nhật bàn ăn
router.put('/updateDiningTable/:id',ensureAuthenticated, updateDiningTableByid);

// route xoá bàn ăn
router.delete('/deleteDiningTable/:id',ensureAuthenticated, deleteDiningTable);

// route lấy danh sách bàn trống chỗ
router.get('/getAvailableTables',getAvailableTablesController);

export default router;