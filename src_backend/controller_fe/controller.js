export const getReservationPage = (req, res, next) => {
   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("reservation/reservation-page", { isAdmin: true })
   } else {
      return res.render("reservation/reservation-page", { isAdmin: false })
   }
}
import {  getReservationsByUserInfo} from '../services/reservation.service.js';

export const getBookingsHistoryPage = async (req, res, next) => {
   console.log(req.query)
   // const bookings = [
   //    {
   //       ReservationID: 1,
   //       Cus_FullName: "Nguyễn Văn A",
   //       Cus_Phone: "0987654321",
   //       ArrivalTime: "2025-07-21T14:32:10.234Z",
   //       CreatedAt: "2025-07-21T14:32:10.234Z",
   //       NumAdults: 2,
   //       NumChildren: 1,
   //       Note: "Yêu cầu bàn gần cửa sổ. Tôi muốn một không gian tiện nghi thoáng mát, sàn nhà có hơi mùi muối biển, ngồi ăn có thể vừa hít khí biển vừa thưởng thức cái nóng của biển và cây cối xung quanh cũng phải xếp hàng và được cắt tỉa gọn gàng.",
   //       Status: "Approved",
   //       TablesList: [{ TableNumber: 9 }],
   //    }
   // ]
   const data = await getReservationsByUserInfo(req.query);


   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("bookings-history/bookings-history-page", {  bookings: data, isAdmin: true })
   } else {
   res.render("bookings-history/bookings-history-page", { bookings: data, isAdmin: false })
   }
}

export const getAdminLoginPage = (req, res, next) => {
   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("admin/login/login-page", { isAdmin: true })
   } else {
      return res.render("admin/login/login-page", { isAdmin: false })
   }
}
import { getAllReservation } from '../services/reservation.service.js';
export const getAdminAllBookingsPage = async (req, res, next) => {
   const data = req.query
   console.log(data)
   let bookings = await getAllReservation({Status : !req.query.status ? null : req.query.status  , Cus_Phone : req.query.phonenumber , timeRange: req.query.expires_in_hours, date: req.query.date });
   const isAdmin = req.session.admin
   console.log(bookings)
   if (isAdmin) {
      return res.render("admin/all-bookings/all-bookings-page", { bookings, isAdmin: true })
   } else {
      res.redirect("/admin/login")
   }
}
export const getProcessingPage = async (req, res, next) => {
   const ReservationID = req.params.bookingId
   const [booking] = await getAllReservation({ ReservationID })
   console.log(booking)
   const tables = await getAvailableDiningTables({inputTime:booking.ArrivalTime}) //peopleCount, arrivalTime, status

   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("admin/processing/processing-page", { booking: booking, emptyTables: tables, isAdmin: true })
   } else {
      res.redirect("/admin/login")
   }
}
import { getDiningTables, getAvailableDiningTables } from '../services/table.service.js';
export const getAllTablesPage =async (req, res, next) => {
   // const tables = [
   //    {
   //       TableID: 1,
   //       TableNumber: 1,
   //       Capacity: 2,
   //       Location: "Sảnh chính",
   //       Status: "Maintenance",
   //    },
   //    {
   //       TableID: 2,
   //       TableNumber: 2,
   //       Capacity: 4,
   //       Location: "Sảnh 1",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 3,
   //       TableNumber: 3,
   //       Capacity: 6,
   //       Location: "Sảnh 3",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 4,
   //       TableNumber: 4,
   //       Capacity: 2,
   //       Location: "Ban công",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 5,
   //       TableNumber: 5,
   //       Capacity: 8,
   //       Location: "Sân thượng",
   //       Status: "Reserved",
   //    },
   //    {
   //       TableID: 6,
   //       TableNumber: 6,
   //       Capacity: 4,
   //       Location: "Sảnh 2",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 7,
   //       TableNumber: 7,
   //       Capacity: 10,
   //       Location: "Sảnh chính",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 8,
   //       TableNumber: 8,
   //       Capacity: 2,
   //       Location: "Khu sân vườn",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 9,
   //       TableNumber: 9,
   //       Capacity: 6,
   //       Location: "Sảnh 1",
   //       Status: "Maintenance",
   //    },
   //    {
   //       TableID: 10,
   //       TableNumber: 10,
   //       Capacity: 4,
   //       Location: "Tầng thượng",
   //       Status: "Available",
   //    },
   //    {
   //       TableID: 11,
   //       TableNumber: 11,
   //       Capacity: 12,
   //       Location: "Sảnh VIP",
   //       Status: "Maintenance",
   //    },
   // ]
   const tables = await getDiningTables({});
   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("admin/all-tables/all-tables-page", { tables, isAdmin: true })
   } else {
      res.redirect("/admin/login")
   }
}
