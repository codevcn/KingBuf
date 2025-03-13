const validateFilterFormData = (formData) => {
   let isValid = true

   const time = formData["time"],
      status = formData["status"]

   if (!time) {
      isValid = false
      toaster.error("Trường thời gian đến hạn không được phép trống!")
   }
   if (!status || status === "none") {
      isValid = false
      toaster.error("Trường trạng thái đơn không hợp lệ!")
   }

   return isValid
}

const filterBookings = (e) => {
   e.preventDefault()
   const formData = extractFormData(e.target)
   if (validateFilterFormData(formData)) {
      navigateWithPayload(getCurrentPath(), formData)
   }
}

const getBookingId = (submitBtn) =>
   submitBtn.closest(".booking-card").getAttribute("data-kb-booking-id")

const completeBooking = (e) => {
   const submitBtn = e.currentTarget
   const backupContent = e.target.innerHTML
   submitBtn.innerHTML = createLoading()
   processBookingService
      .completeBooking(getBookingId(submitBtn))
      .then(() => {
         reloadPage()
      })
      .catch((error) => {
         toaster.error(error.message)
      })
      .finally(() => {
         submitBtn.innerHTML = backupContent
      })
}

const cancelBooking = (e) => {
   const submitBtn = e.currentTarget
   const backupContent = e.target.innerHTML
   submitBtn.innerHTML = createLoading()
   processBookingService
      .cancelBooking(getBookingId(submitBtn), "Khách không đến")
      .then(() => {
         reloadPage()
      })
      .catch((error) => {
         toaster.error(error.message)
      })
      .finally(() => {
         submitBtn.innerHTML = backupContent
      })
}

const setArrivedStatus = (e) => {
   const submitBtn = e.currentTarget
   const backupContent = e.target.innerHTML
   submitBtn.innerHTML = createLoading()
   bookingService
      .updateBooking(getBookingId(submitBtn), { Reason: "Khách không đến" })
      .then(() => {
         reloadPage()
      })
      .catch((error) => {
         toaster.error(error.message)
      })
      .finally(() => {
         submitBtn.innerHTML = backupContent
      })
}

const init = () => {
   // table status dropdown
   const dropdownButton = document.querySelector("#booking-status-select .dropdown-toggle")
   const dropdownItems = document.querySelectorAll("#booking-status-select .dropdown-item")
   for (const item of dropdownItems) {
      item.onclick = () => {
         const selectedText = item.textContent
         const selectedStatus = item.getAttribute("data-kb-table-status")
         dropdownButton.textContent = selectedText
         document.getElementById("booking-status-input").value = selectedStatus
      }
   }

   document.getElementById("filter-bookings-form").addEventListener("submit", filterBookings)
   document.getElementById("complete-booking-btn").addEventListener("click", completeBooking)
   document.getElementById("set-arrived-cus-btn").addEventListener("click", setArrivedStatus)
   document.getElementById("cancel-booking-btn").addEventListener("click", cancelBooking)
}
init()
