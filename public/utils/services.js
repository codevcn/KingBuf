class BookingService {
   async submitBooking(data) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error("something went vcn error!!"))
         }, 1000)
      })
   }

   async updateBooking(data) {
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
            // reject(new Error("something went vcn error!!"))
            resolve(true)
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
}

const tablesService = new TablesService()
