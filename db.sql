-- Xóa database nếu đã tồn tại và tạo mới database với charset hỗ trợ tiếng Việt
DROP DATABASE IF EXISTS Restaurant;
CREATE DATABASE Restaurant CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Restaurant;

-- Đảm bảo các kết nối sử dụng charset utf8mb4
SET NAMES 'utf8mb4';

-- Bảng Admins: quản lý thông tin đăng nhập và bảo mật cho admin
CREATE TABLE Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Reservations: lưu thông tin đơn đặt chỗ của khách hàng
CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    Cus_FullName VARCHAR(255) NOT NULL,
    Cus_Phone VARCHAR(20) NOT NULL,
    ArrivalTime DATETIME NOT NULL,
    NumAdults INT NOT NULL,
    NumChildren INT NOT NULL,
    Note TEXT NULL, -- Thêm ghi chú của khách hàng
    Status ENUM('Pending', 'Cancelled', 'Approved','Completed','Arrived', 'Rejected') DEFAULT 'Pending',
    reject_reason TEXT NULL, -- Thêm nguyên nhân từ chối, có thể do : full bàn, quán bảo trì,...
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng DiningTables: lưu thông tin các bàn có sẵn
CREATE TABLE DiningTables (
    TableID INT AUTO_INCREMENT PRIMARY KEY,
    TableNumber VARCHAR(20) NOT NULL UNIQUE,
    Capacity INT NOT NULL,
    Location VARCHAR(255) DEFAULT NULL,
    Status ENUM('Available', 'Maintenance') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng ReservationTable: liên kết giữa đơn đặt và bàn được gán (nếu một đơn có thể gán nhiều bàn)
CREATE TABLE ReservationTable (
    ReservationID INT,
    TableID INT,
    AdminID INT NOT NULL,
    PRIMARY KEY (ReservationID, TableID),
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID),
    FOREIGN KEY (TableID) REFERENCES DiningTables(TableID),
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
