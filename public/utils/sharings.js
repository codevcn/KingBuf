class ReservationPageShares {
   constructor() {
      this.bookingData = undefined
   }
}

const reservationPageShares = new ReservationPageShares()

class Toaster {
   error(title, message) {
      Swal.fire({
         title,
         text: message,
         icon: "error",
      })
   }

   success(title, message) {
      Swal.fire({
         title,
         text: message,
         icon: "success",
      })
   }

   info(title, message) {
      Swal.fire({
         title,
         text: message,
         icon: "info",
      })
   }
}

const toaster = new Toaster()

class ProcessBookingShares {
   constructor() {
      this.pickedTables = []
   }

   pickTable(...tableIds) {
      this.pickedTables.push(...tableIds)
   }

   unpickTable(...tableIds) {
      this.pickedTables = this.pickedTables.filter((id) => !tableIds.includes(id))
   }
}

const processBookingShares = new ProcessBookingShares()
