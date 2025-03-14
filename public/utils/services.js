const clientAxios = axios.create({ baseURL: "http://localhost:3000" })

class BookingService {
   async submitBooking(formData) {
      const { data } = await clientAxios.post("/api/reservations/reserve", {
         Cus_FullName: formData["full-name"],
         Cus_Phone: formData["phone"],
         ArrivalTime: formData["date"] + " " + formData["time"],
         NumAdults: formData["adults-count"],
         NumChildren: formData["children-count"],
         Note: formData["note"],
      })
   }

   async updateBooking(bookingId, formData) {
      const { data } = await clientAxios.put(`/api/reservations/update/${bookingId}`, {
         Cus_FullName: formData["full-name"],
         ArrivalTime: formData["date"] + " " + formData["time"]+':00',
         NumAdults: formData["adults-count"],
         NumChildren: formData["children-count"],
         Note: formData["note"],
      })
      console.log(data);
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
   async addNewTable(formData) {
      await clientAxios.post("/api/diningTable/createDiningTable", {
         TableNumber: formData["table-number"],
         Capacity: formData["capacity"],
         Location: formData["location"],
         Status: formData["status"],
      })
   }

   async deleteTable(tableId) {
      await clientAxios.delete(`/api/diningTable/deleteDiningTable/${tableId}`)
   }

   async updateTable(tableId, updateData) {
      await clientAxios.put(`/api/diningTable/updateDiningTable/${tableId}`, updateData)
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
