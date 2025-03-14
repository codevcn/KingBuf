-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 14, 2025 lúc 01:37 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `restaurant`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `AdminID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `CreatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`AdminID`, `Username`, `PasswordHash`, `CreatedAt`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diningtables`
--

CREATE TABLE `diningtables` (
  `TableID` int(11) NOT NULL,
  `TableNumber` varchar(20) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Status` enum('Available','Maintenance') NOT NULL DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `diningtables`
--

INSERT INTO `diningtables` (`TableID`, `TableNumber`, `Capacity`, `Location`, `Status`) VALUES
(1, 'Test', 8, 'Vị trí zx kkk', 'Available'),
(3, 'Test1', 4, 'Vị trí zx kkk', 'Available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reservations`
--

CREATE TABLE `reservations` (
  `ReservationID` int(11) NOT NULL,
  `Cus_FullName` varchar(255) NOT NULL,
  `Cus_Phone` varchar(20) NOT NULL,
  `ArrivalTime` datetime NOT NULL,
  `NumAdults` int(11) NOT NULL,
  `NumChildren` int(11) NOT NULL,
  `Note` text DEFAULT NULL,
  `Status` enum('Pending','Cancelled','Approved','Completed','Arrived','Rejected') NOT NULL DEFAULT 'Pending',
  `reject_reason` text DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `reservations`
--

INSERT INTO `reservations` (`ReservationID`, `Cus_FullName`, `Cus_Phone`, `ArrivalTime`, `NumAdults`, `NumChildren`, `Note`, `Status`, `reject_reason`, `CreatedAt`, `UpdatedAt`) VALUES
(12, 'Nguyễn Anh Tuấn 2 ', '0987794267', '2025-06-01 10:11:00', 1, 0, 'a', 'Pending', NULL, '2025-03-14 00:57:00', '2025-03-14 11:35:19'),
(13, 'Nguyễn Anh Tuấn', '0987794267', '2025-12-14 11:11:00', 1, 1, '', 'Cancelled', NULL, '2025-03-14 00:57:19', '2025-03-14 00:57:19'),
(14, 'Nguyễn Anh Tuấn', '0987794267', '2025-12-11 11:50:00', 12, 2, '', 'Approved', NULL, '2025-03-14 09:40:48', '2025-03-14 09:40:48'),
(15, 'Nguyễn Anh Tuấn', '0987794267', '2025-12-11 10:50:00', 1, 1, '', 'Completed', NULL, '2025-03-14 09:43:33', '2025-03-14 09:43:33'),
(16, 'Nguyễn Anh Tuấn', '0987794267', '2025-11-20 11:11:00', 1, 1, '', 'Arrived', NULL, '2025-03-14 09:46:01', '2025-03-14 09:46:01'),
(17, 'Nguyễn Anh Tuấn', '0987794267', '2025-11-11 11:11:00', 1, 1, 'Đã hết bàn', 'Rejected', 'Đã hết cmn bàn', '2025-03-14 09:48:23', '2025-03-14 09:48:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reservationtable`
--

CREATE TABLE `reservationtable` (
  `ReservationID` int(11) NOT NULL,
  `TableID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`AdminID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Username_2` (`Username`),
  ADD UNIQUE KEY `Username_3` (`Username`),
  ADD UNIQUE KEY `Username_4` (`Username`),
  ADD UNIQUE KEY `Username_5` (`Username`),
  ADD UNIQUE KEY `Username_6` (`Username`),
  ADD UNIQUE KEY `Username_7` (`Username`),
  ADD UNIQUE KEY `Username_8` (`Username`),
  ADD UNIQUE KEY `Username_9` (`Username`),
  ADD UNIQUE KEY `Username_10` (`Username`),
  ADD UNIQUE KEY `Username_11` (`Username`),
  ADD UNIQUE KEY `Username_12` (`Username`),
  ADD UNIQUE KEY `Username_13` (`Username`),
  ADD UNIQUE KEY `Username_14` (`Username`),
  ADD UNIQUE KEY `Username_15` (`Username`),
  ADD UNIQUE KEY `Username_16` (`Username`),
  ADD UNIQUE KEY `Username_17` (`Username`),
  ADD UNIQUE KEY `Username_18` (`Username`),
  ADD UNIQUE KEY `Username_19` (`Username`),
  ADD UNIQUE KEY `Username_20` (`Username`),
  ADD UNIQUE KEY `Username_21` (`Username`),
  ADD UNIQUE KEY `Username_22` (`Username`),
  ADD UNIQUE KEY `Username_23` (`Username`),
  ADD UNIQUE KEY `Username_24` (`Username`),
  ADD UNIQUE KEY `Username_25` (`Username`),
  ADD UNIQUE KEY `Username_26` (`Username`),
  ADD UNIQUE KEY `Username_27` (`Username`),
  ADD UNIQUE KEY `Username_28` (`Username`),
  ADD UNIQUE KEY `Username_29` (`Username`),
  ADD UNIQUE KEY `Username_30` (`Username`),
  ADD UNIQUE KEY `Username_31` (`Username`),
  ADD UNIQUE KEY `Username_32` (`Username`),
  ADD UNIQUE KEY `Username_33` (`Username`),
  ADD UNIQUE KEY `Username_34` (`Username`),
  ADD UNIQUE KEY `Username_35` (`Username`),
  ADD UNIQUE KEY `Username_36` (`Username`),
  ADD UNIQUE KEY `Username_37` (`Username`),
  ADD UNIQUE KEY `Username_38` (`Username`),
  ADD UNIQUE KEY `Username_39` (`Username`),
  ADD UNIQUE KEY `Username_40` (`Username`),
  ADD UNIQUE KEY `Username_41` (`Username`),
  ADD UNIQUE KEY `Username_42` (`Username`),
  ADD UNIQUE KEY `Username_43` (`Username`),
  ADD UNIQUE KEY `Username_44` (`Username`),
  ADD UNIQUE KEY `Username_45` (`Username`),
  ADD UNIQUE KEY `Username_46` (`Username`),
  ADD UNIQUE KEY `Username_47` (`Username`),
  ADD UNIQUE KEY `Username_48` (`Username`),
  ADD UNIQUE KEY `Username_49` (`Username`),
  ADD UNIQUE KEY `Username_50` (`Username`),
  ADD UNIQUE KEY `Username_51` (`Username`),
  ADD UNIQUE KEY `Username_52` (`Username`),
  ADD UNIQUE KEY `Username_53` (`Username`),
  ADD UNIQUE KEY `Username_54` (`Username`),
  ADD UNIQUE KEY `Username_55` (`Username`),
  ADD UNIQUE KEY `Username_56` (`Username`),
  ADD UNIQUE KEY `Username_57` (`Username`),
  ADD UNIQUE KEY `Username_58` (`Username`),
  ADD UNIQUE KEY `Username_59` (`Username`),
  ADD UNIQUE KEY `Username_60` (`Username`),
  ADD UNIQUE KEY `Username_61` (`Username`),
  ADD UNIQUE KEY `Username_62` (`Username`),
  ADD UNIQUE KEY `Username_63` (`Username`);

--
-- Chỉ mục cho bảng `diningtables`
--
ALTER TABLE `diningtables`
  ADD PRIMARY KEY (`TableID`),
  ADD UNIQUE KEY `TableNumber` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_2` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_3` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_4` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_5` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_6` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_7` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_8` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_9` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_10` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_11` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_12` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_13` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_14` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_15` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_16` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_17` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_18` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_19` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_20` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_21` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_22` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_23` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_24` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_25` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_26` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_27` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_28` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_29` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_30` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_31` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_32` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_33` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_34` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_35` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_36` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_37` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_38` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_39` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_40` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_41` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_42` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_43` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_44` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_45` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_46` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_47` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_48` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_49` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_50` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_51` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_52` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_53` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_54` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_55` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_56` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_57` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_58` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_59` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_60` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_61` (`TableNumber`),
  ADD UNIQUE KEY `TableNumber_62` (`TableNumber`);

--
-- Chỉ mục cho bảng `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`ReservationID`),
  ADD UNIQUE KEY `reservations__cus__phone__arrival_time` (`Cus_Phone`,`ArrivalTime`);

--
-- Chỉ mục cho bảng `reservationtable`
--
ALTER TABLE `reservationtable`
  ADD PRIMARY KEY (`ReservationID`,`TableID`),
  ADD KEY `TableID` (`TableID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `diningtables`
--
ALTER TABLE `diningtables`
  MODIFY `TableID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `reservations`
--
ALTER TABLE `reservations`
  MODIFY `ReservationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `reservationtable`
--
ALTER TABLE `reservationtable`
  ADD CONSTRAINT `reservationtable_ibfk_1` FOREIGN KEY (`ReservationID`) REFERENCES `reservations` (`ReservationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_10` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_11` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_12` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_13` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_14` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_15` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_16` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_17` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_18` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_19` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_2` FOREIGN KEY (`TableID`) REFERENCES `diningtables` (`TableID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_20` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_21` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_22` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_23` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_24` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_25` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_26` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_27` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_28` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_29` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_3` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_30` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_31` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_32` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_33` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_34` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_35` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_36` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_37` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_38` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_39` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_4` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_40` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_41` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_42` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_43` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_44` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_45` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_46` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_47` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_48` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_49` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_5` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_50` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_51` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_52` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_53` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_54` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_55` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_56` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_57` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_58` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_59` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_6` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_60` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_61` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_62` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_63` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_64` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_7` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_8` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservationtable_ibfk_9` FOREIGN KEY (`AdminID`) REFERENCES `admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
