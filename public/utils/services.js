const clientAxios = axios.create({ baseURL: "http://localhost:3000" })

class BookingService {
   async submitBooking(data) {
      const { data } = await clientAxios.post("/api/reservations/reserve", {
         Cus_FullName: formData["full-name"],
         Cus_Phone: formData["phone"],
         ArrivalTime: "12/29/2025 05:00",
         NumAdults: formData["adults-count"],
         NumChildren: formData["children-count"],
         Note: formData["note"],
      })
   }

   async updateBooking(bookingId, data) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }
}

const bookingService = new BookingService()

class ProcessBookingService {
   async approveBooking(bookingId, tableIds) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
            // resolve(true)
         }, 1000)
      })
   }

   async rejectBooking(bookingId, reason) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }

   async cancelBooking(bookingId, reason) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
            // resolve(true)
         }, 1000)
      })
   }

   async completeBooking(bookingId) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }
}

const processBookingService = new ProcessBookingService()

class TablesService {
   async addNewTable(data) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }

   async deleteTable(tableId) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }

   async updateTable(tableId, updateData) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }
}

const tablesService = new TablesService()

class AuthService {
   async login(formData) {
      const { data } = await clientAxios.post("/api/admin/login", formData)
      return data
   }
}

const authService = new AuthService()
