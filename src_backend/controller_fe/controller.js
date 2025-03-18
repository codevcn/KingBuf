export const getReservationPage = (req, res, next) => {
   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("reservation/reservation-page", { isAdmin: true })
   } else {
      return res.render("reservation/reservation-page", { isAdmin: false })
   }
}
import { Op } from "sequelize"
import { getReservationsByUserInfo } from "../services/reservation.service.js"

export const getBookingsHistoryPage = async (req, res, next) => {
   const data = await getReservationsByUserInfo(req.query)

   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.render("bookings-history/bookings-history-page", { bookings: data, isAdmin: true })
   } else {
      res.render("bookings-history/bookings-history-page", { bookings: data, isAdmin: false })
   }
}

export const getAdminLoginPage = (req, res, next) => {
   const isAdmin = req.session.admin
   if (isAdmin) {
      return res.redirect("/admin/all-bookings/")
   } else {
      return res.render("admin/login/login-page", { isAdmin: false })
   }
}
import { getAllReservation } from "../services/reservation.service.js"
export const getAdminAllBookingsPage = async (req, res, next) => {
   const data = req.query
   console.log(data)
   let bookings = await getAllReservation({
      Status: !req.query.status ? null : req.query.status,
      Cus_Phone: req.query.phonenumber,
      timeRange: req.query.expires_in_hours,
      date: req.query.date,
   })
   const isAdmin = req.session.admin
   console.log(bookings)
   if (isAdmin) {
      return res.render("admin/all-bookings/all-bookings-page", { bookings, isAdmin: true })
   } else {
      res.redirect("/admin/login")
   }
}
