class BookingService {
   async submitBooking(data) {
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(false)
         }, 1000)
      })
   }
}

const bookingService = new BookingService()
