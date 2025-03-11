export const getReservationPage = (req, res, next) => {
   res.render("reservation/reservation-page", { isAdmin: true })
}

export const getBookingsHistoryPage = (req, res, next) => {
   const bookings = [
      {
         ReservationID: 1,
         Cus_FullName: "Nguyễn Văn A",
         Cus_Phone: "0987654321",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 1,
         Note: "Yêu cầu bàn gần cửa sổ. Tôi muốn một không gian tiện nghi thoáng mát, sàn nhà có hơi mùi muối biển, ngồi ăn có thể vừa hít khí biển vừa thưởng thức cái nóng của biển và cây cối xung quanh cũng phải xếp hàng và được cắt tỉa gọn gàng.",
         Status: "Approved",
         TablesList: [{ TableNumber: 9 }],
      },
      {
         ReservationID: 2,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [
            { TableNumber: 10 },
            { TableNumber: 31 },
            { TableNumber: 32 },
            { TableNumber: 33 },
            { TableNumber: 34 },
         ],
      },
      {
         ReservationID: 3,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Pending",
      },
      {
         ReservationID: 4,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 11 }],
      },
      {
         ReservationID: 5,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Completed",
         TablesList: [{ TableNumber: 88 }, { TableNumber: 87 }],
      },
      {
         ReservationID: 6,
         Cus_FullName: "Bùi Văn F",
         Cus_Phone: "0933344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn ngoài trời",
         Status: "Approved",
         TablesList: [{ TableNumber: 12 }, { TableNumber: 199 }],
      },
      {
         ReservationID: 7,
         Cus_FullName: "Hoàng Thị G",
         Cus_Phone: "0922233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 13 }],
      },
      {
         ReservationID: 8,
         Cus_FullName: "Vũ Minh H",
         Cus_Phone: "0911122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Góc riêng tư",
         Status: "Rejected",
         Reason: "Quan ngại về khách hàng 1",
      },
      {
         ReservationID: 9,
         Cus_FullName: "Ngô Văn I",
         Cus_Phone: "0909988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 3,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [{ TableNumber: 14 }],
      },
      {
         ReservationID: 10,
         Cus_FullName: "Đặng Thị J",
         Cus_Phone: "0896677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Rejected",
         Reason: "Quan ngại về khách hàng 2",
      },
      {
         ReservationID: 11,
         Cus_FullName: "Lý Văn K",
         Cus_Phone: "0885566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn VIP",
         Status: "Approved",
         TablesList: [{ TableNumber: 15 }],
      },
      {
         ReservationID: 12,
         Cus_FullName: "Tạ Thị L",
         Cus_Phone: "0873344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Bàn cạnh cửa sổ",
         Status: "Approved",
         TablesList: [{ TableNumber: 16 }],
      },
      {
         ReservationID: 13,
         Cus_FullName: "Hà Văn M",
         Cus_Phone: "0862233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 2,
         Note: "Có menu đặc biệt",
         Status: "Pending",
      },
      {
         ReservationID: 14,
         Cus_FullName: "Dương Thị N",
         Cus_Phone: "0851122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Chỗ ngồi yên tĩnh",
         Status: "Pending",
      },
      {
         ReservationID: 15,
         Cus_FullName: "Chung Văn O",
         Cus_Phone: "0849988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 3,
         Note: "Sinh nhật công ty",
         Status: "Approved",
         TablesList: [{ TableNumber: 1 }],
      },
      {
         ReservationID: 16,
         Cus_FullName: "Lâm Thị P",
         Cus_Phone: "0836677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 1,
         Note: "Có rượu vang",
         Status: "Approved",
         TablesList: [{ TableNumber: 2 }],
      },
      {
         ReservationID: 17,
         Cus_FullName: "Hứa Minh Q",
         Cus_Phone: "0825566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 0,
         Note: "Có trang trí đặc biệt",
         Status: "Approved",
         TablesList: [{ TableNumber: 3 }],
      },
      {
         ReservationID: 18,
         Cus_FullName: "Phùng Văn R",
         Cus_Phone: "0813344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 2,
         Note: "Có thực đơn riêng",
         Status: "Approved",
         TablesList: [{ TableNumber: 4 }],
      },
      {
         ReservationID: 19,
         Cus_FullName: "Quách Thị S",
         Cus_Phone: "0802233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Chỗ ngồi thoải mái",
         Status: "Approved",
         TablesList: [{ TableNumber: 5 }],
      },
      {
         ReservationID: 20,
         Cus_FullName: "Tống Văn T",
         Cus_Phone: "0791122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 1,
         Note: "Không gian ngoài trời",
         Status: "Cancelled",
      },
      {
         ReservationID: 21,
         Cus_FullName: "Nguyễn Văn A",
         Cus_Phone: "0987654321",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 1,
         Note: "Yêu cầu bàn gần cửa sổ",
         Status: "Cancelled",
      },
      {
         ReservationID: 22,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Cancelled",
      },
      {
         ReservationID: 23,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 6 }],
      },
      {
         ReservationID: 24,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 7 }],
      },
      {
         ReservationID: 25,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Approved",
         TablesList: [{ TableNumber: 8 }],
      },
   ]
   res.render("bookings-history/bookings-history-page", { bookings, isAdmin: true })
}

export const getAdminLoginPage = (req, res, next) => {
   res.render("admin/login/login-page")
}

export const getAdminAllBookingsPage = (req, res, next) => {
   const bookings = [
      {
         ReservationID: 1,
         Cus_FullName: "Nguyễn Văn A",
         Cus_Phone: "0987654321",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 1,
         Note: "Yêu cầu bàn gần cửa sổ. Tôi muốn một không gian tiện nghi thoáng mát, sàn nhà có hơi mùi muối biển, ngồi ăn có thể vừa hít khí biển vừa thưởng thức cái nóng của biển và cây cối xung quanh cũng phải xếp hàng và được cắt tỉa gọn gàng.",
         Status: "Approved",
         TablesList: [{ TableNumber: 9 }],
      },
      {
         ReservationID: 2,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [
            { TableNumber: 10 },
            { TableNumber: 31 },
            { TableNumber: 32 },
            { TableNumber: 33 },
            { TableNumber: 34 },
         ],
      },
      {
         ReservationID: 3,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Pending",
      },
      {
         ReservationID: 4,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 11 }],
      },
      {
         ReservationID: 5,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Pending",
      },
      {
         ReservationID: 6,
         Cus_FullName: "Bùi Văn F",
         Cus_Phone: "0933344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn ngoài trời",
         Status: "Approved",
         TablesList: [{ TableNumber: 12 }, { TableNumber: 199 }],
      },
      {
         ReservationID: 7,
         Cus_FullName: "Hoàng Thị G",
         Cus_Phone: "0922233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 13 }],
      },
      {
         ReservationID: 8,
         Cus_FullName: "Vũ Minh H",
         Cus_Phone: "0911122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Góc riêng tư",
         Status: "Rejected",
         Reason: "Quan ngại về khách hàng 1",
      },
      {
         ReservationID: 9,
         Cus_FullName: "Ngô Văn I",
         Cus_Phone: "0909988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 3,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [{ TableNumber: 14 }],
      },
      {
         ReservationID: 10,
         Cus_FullName: "Đặng Thị J",
         Cus_Phone: "0896677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Rejected",
         Reason: "Quan ngại về khách hàng 2",
      },
      {
         ReservationID: 11,
         Cus_FullName: "Lý Văn K",
         Cus_Phone: "0885566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn VIP",
         Status: "Approved",
         TablesList: [{ TableNumber: 15 }],
      },
      {
         ReservationID: 12,
         Cus_FullName: "Tạ Thị L",
         Cus_Phone: "0873344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Bàn cạnh cửa sổ",
         Status: "Approved",
         TablesList: [{ TableNumber: 16 }],
      },
      {
         ReservationID: 13,
         Cus_FullName: "Hà Văn M",
         Cus_Phone: "0862233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 2,
         Note: "Có menu đặc biệt",
         Status: "Pending",
      },
      {
         ReservationID: 14,
         Cus_FullName: "Dương Thị N",
         Cus_Phone: "0851122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Chỗ ngồi yên tĩnh",
         Status: "Pending",
      },
      {
         ReservationID: 15,
         Cus_FullName: "Chung Văn O",
         Cus_Phone: "0849988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 3,
         Note: "Sinh nhật công ty",
         Status: "Approved",
         TablesList: [{ TableNumber: 1 }],
      },
      {
         ReservationID: 16,
         Cus_FullName: "Lâm Thị P",
         Cus_Phone: "0836677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 1,
         Note: "Có rượu vang",
         Status: "Approved",
         TablesList: [{ TableNumber: 2 }],
      },
      {
         ReservationID: 17,
         Cus_FullName: "Hứa Minh Q",
         Cus_Phone: "0825566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 0,
         Note: "Có trang trí đặc biệt",
         Status: "Approved",
         TablesList: [{ TableNumber: 3 }],
      },
      {
         ReservationID: 18,
         Cus_FullName: "Phùng Văn R",
         Cus_Phone: "0813344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 2,
         Note: "Có thực đơn riêng",
         Status: "Approved",
         TablesList: [{ TableNumber: 4 }],
      },
      {
         ReservationID: 19,
         Cus_FullName: "Quách Thị S",
         Cus_Phone: "0802233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Chỗ ngồi thoải mái",
         Status: "Approved",
         TablesList: [{ TableNumber: 5 }],
      },
      {
         ReservationID: 20,
         Cus_FullName: "Tống Văn T",
         Cus_Phone: "0791122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 1,
         Note: "Không gian ngoài trời",
         Status: "Cancelled",
      },
      {
         ReservationID: 21,
         Cus_FullName: "Nguyễn Văn A",
         Cus_Phone: "0987654321",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 1,
         Note: "Yêu cầu bàn gần cửa sổ",
         Status: "Cancelled",
      },
      {
         ReservationID: 22,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Cancelled",
      },
      {
         ReservationID: 23,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 6 }],
      },
      {
         ReservationID: 24,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 7 }],
      },
      {
         ReservationID: 25,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Approved",
         TablesList: [{ TableNumber: 8 }],
      },
   ]
   res.render("admin/all-bookings/all-bookings-page", { bookings, isAdmin: true })
}

export const getProcessingPage = (req, res, next) => {
   const bookings = [
      {
         ReservationID: 25,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Yêu cầu bàn gần cửa sổ. Tôi muốn một không gian tiện nghi thoáng mát, sàn nhà có hơi mùi muối biển, ngồi ăn có thể vừa hít khí biển vừa thưởng thức cái nóng của biển và cây cối xung quanh cũng phải xếp hàng và được cắt tỉa gọn gàng.",
         Status: "Approved",
         TablesList: [{ TableNumber: 8 }],
         date: "2025-03-09",
         time: "22:21",
      },
      {
         ReservationID: 22,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Cancelled",
         Reason: "Quan ngại về khách hàng 1",
      },
      {
         ReservationID: 13,
         Cus_FullName: "Hà Văn M",
         Cus_Phone: "0862233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 2,
         Note: "Có menu đặc biệt",
         Status: "Pending",
      },
      {
         ReservationID: 10,
         Cus_FullName: "Đặng Thị J",
         Cus_Phone: "0896677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Rejected",
         Reason: "Quan ngại về khách hàng 2",
      },
      {
         ReservationID: 5,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Completed",
         TablesList: [{ TableNumber: 88 }, { TableNumber: 87 }],
      },
   ]

   const emptyTables = [
      {
         TableID: 1,
         TableNumber: 1,
         Capacity: 2,
         Location: "Sảnh chính",
         Status: "Maintenance",
      },
      {
         TableID: 2,
         TableNumber: 2,
         Capacity: 4,
         Location: "Sảnh 1",
         Status: "Available",
      },
      {
         TableID: 3,
         TableNumber: 3,
         Capacity: 6,
         Location: "Sảnh 3",
         Status: "Available",
      },
      {
         TableID: 4,
         TableNumber: 4,
         Capacity: 2,
         Location: "Ban công",
         Status: "Available",
      },
      {
         TableID: 5,
         TableNumber: 5,
         Capacity: 8,
         Location: "Sân thượng",
         Status: "Reserved",
      },
      {
         TableID: 6,
         TableNumber: 6,
         Capacity: 4,
         Location: "Sảnh 2",
         Status: "Available",
      },
      {
         TableID: 7,
         TableNumber: 7,
         Capacity: 10,
         Location: "Sảnh chính",
         Status: "Available",
      },
      {
         TableID: 8,
         TableNumber: 8,
         Capacity: 2,
         Location: "Khu sân vườn",
         Status: "Available",
      },
      {
         TableID: 9,
         TableNumber: 9,
         Capacity: 6,
         Location: "Sảnh 1",
         Status: "Maintenance",
      },
      {
         TableID: 10,
         TableNumber: 10,
         Capacity: 4,
         Location: "Tầng thượng",
         Status: "Available",
      },
      {
         TableID: 11,
         TableNumber: 11,
         Capacity: 12,
         Location: "Sảnh VIP",
         Status: "Maintenance",
      },
   ]
   res.render("admin/processing/processing-page", {
      booking: bookings[0],
      emptyTables,
      isAdmin: true,
   })
}

export const getDueDateBookings = (req, res, next) => {
   const bookings = [
      {
         ReservationID: 1,
         Cus_FullName: "Nguyễn Văn A",
         Cus_Phone: "0987654321",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 1,
         Note: "Yêu cầu bàn gần cửa sổ. Tôi muốn một không gian tiện nghi thoáng mát, sàn nhà có hơi mùi muối biển, ngồi ăn có thể vừa hít khí biển vừa thưởng thức cái nóng của biển và cây cối xung quanh cũng phải xếp hàng và được cắt tỉa gọn gàng.",
         Status: "Approved",
         TablesList: [{ TableNumber: 9 }],
      },
      {
         ReservationID: 2,
         Cus_FullName: "Trần Thị B",
         Cus_Phone: "0971122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 2,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [
            { TableNumber: 10 },
            { TableNumber: 31 },
            { TableNumber: 32 },
            { TableNumber: 33 },
            { TableNumber: 34 },
         ],
      },
      {
         ReservationID: 3,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Pending",
      },
      {
         ReservationID: 4,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 11 }],
      },
      {
         ReservationID: 5,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Pending",
      },
      {
         ReservationID: 6,
         Cus_FullName: "Bùi Văn F",
         Cus_Phone: "0933344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn ngoài trời",
         Status: "Approved",
         TablesList: [{ TableNumber: 12 }, { TableNumber: 199 }],
      },
      {
         ReservationID: 7,
         Cus_FullName: "Hoàng Thị G",
         Cus_Phone: "0922233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 13 }],
      },
      {
         ReservationID: 9,
         Cus_FullName: "Ngô Văn I",
         Cus_Phone: "0909988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 3,
         Note: "Có ghế trẻ em",
         Status: "Approved",
         TablesList: [{ TableNumber: 14 }],
      },
      {
         ReservationID: 11,
         Cus_FullName: "Lý Văn K",
         Cus_Phone: "0885566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Bàn VIP",
         Status: "Approved",
         TablesList: [{ TableNumber: 15 }],
      },
      {
         ReservationID: 12,
         Cus_FullName: "Tạ Thị L",
         Cus_Phone: "0873344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 1,
         Note: "Bàn cạnh cửa sổ",
         Status: "Approved",
         TablesList: [{ TableNumber: 16 }],
      },
      {
         ReservationID: 13,
         Cus_FullName: "Hà Văn M",
         Cus_Phone: "0862233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 2,
         Note: "Có menu đặc biệt",
         Status: "Pending",
      },
      {
         ReservationID: 14,
         Cus_FullName: "Dương Thị N",
         Cus_Phone: "0851122334",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Chỗ ngồi yên tĩnh",
         Status: "Pending",
      },
      {
         ReservationID: 15,
         Cus_FullName: "Chung Văn O",
         Cus_Phone: "0849988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 3,
         Note: "Sinh nhật công ty",
         Status: "Approved",
         TablesList: [{ TableNumber: 1 }],
      },
      {
         ReservationID: 16,
         Cus_FullName: "Lâm Thị P",
         Cus_Phone: "0836677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 1,
         Note: "Có rượu vang",
         Status: "Approved",
         TablesList: [{ TableNumber: 2 }],
      },
      {
         ReservationID: 17,
         Cus_FullName: "Hứa Minh Q",
         Cus_Phone: "0825566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 4,
         NumChildren: 0,
         Note: "Có trang trí đặc biệt",
         Status: "Approved",
         TablesList: [{ TableNumber: 3 }],
      },
      {
         ReservationID: 18,
         Cus_FullName: "Phùng Văn R",
         Cus_Phone: "0813344556",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 2,
         Note: "Có thực đơn riêng",
         Status: "Approved",
         TablesList: [{ TableNumber: 4 }],
      },
      {
         ReservationID: 19,
         Cus_FullName: "Quách Thị S",
         Cus_Phone: "0802233445",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 2,
         NumChildren: 0,
         Note: "Chỗ ngồi thoải mái",
         Status: "Approved",
         TablesList: [{ TableNumber: 5 }],
      },
      {
         ReservationID: 23,
         Cus_FullName: "Phạm Văn C",
         Cus_Phone: "0969988776",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 3,
         NumChildren: 0,
         Note: "Ăn chay",
         Status: "Approved",
         TablesList: [{ TableNumber: 6 }],
      },
      {
         ReservationID: 24,
         Cus_FullName: "Lê Thị D",
         Cus_Phone: "0956677889",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 5,
         NumChildren: 1,
         Note: "Kỷ niệm ngày cưới",
         Status: "Approved",
         TablesList: [{ TableNumber: 7 }],
      },
      {
         ReservationID: 25,
         Cus_FullName: "Đỗ Minh E",
         Cus_Phone: "0945566778",
         ArrivalTime: "2025-07-21T14:32:10.234Z",
         CreatedAt: "2025-07-21T14:32:10.234Z",
         NumAdults: 6,
         NumChildren: 2,
         Note: "Có bánh sinh nhật",
         Status: "Approved",
         TablesList: [{ TableNumber: 8 }],
      },
   ]
   res.render("admin/due-date-bookings/due-date-bookings-page", { bookings, isAdmin: true })
}
