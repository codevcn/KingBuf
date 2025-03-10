const approveBookingSection = document.getElementById("approve-booking")
const bookingProcessingSection = document.getElementById("booking-processing")

const showApproveBookingLoading = (show, type) => {
   const submitBtnEle = bookingProcessingSection.querySelector(
      `.processing .tab-content [data-kb-tab-type="${type}"] .complete-processing .submit-btn`
   )
   if (show) {
      submitBtnEle.innerHTML = createLoading()
   } else {
      submitBtnEle.innerHTML = `
         <i class="bi bi-check-all"></i>
         <span>Hoàn tất xử lý đơn</span>`
   }
}

const showError = (message, type) => {
   const resultSection = bookingProcessingSection.querySelector(
      `.processing .tab-content [data-kb-tab-type="${type}"] .processing-result`
   )
   if (message) {
      resultSection.querySelector(".result-message").textContent = message
      resultSection.hidden = false
   } else {
      resultSection.hidden = true
   }
}

const getBookingId = () => window.location.pathname.split("/").pop()

const validateReason = (reason) => {
   if (!reason) {
      toaster.error("Xử lý đơn thất bại", "Trường lý do không được bỏ trống.")
      return false
   }
   return true
}

const validateApproving = (pickedTables) => {
   if (!pickedTables || pickedTables.length === 0) {
      toaster.error("Xử lý đơn thất bại", "Chưa có bất cứ bàn nào được chọn cho đơn.")
      return false
   }
   return true
}

const approveBooking = (type) => {
   const pickedTables = processBookingShares.pickedTables
   if (validateApproving(pickedTables)) {
      showApproveBookingLoading(true, type)
      processBookingService
         .approveBooking(getBookingId(), pickedTables)
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            showError(error.message, type)
         })
         .finally(() => {
            showApproveBookingLoading(false, type)
         })
   }
}

const rejectBooking = (type) => {
   const reason = document.getElementById("reject-booking-input").value
   if (validateReason(reason)) {
      showApproveBookingLoading(true, type)
      processBookingService
         .rejectBooking(getBookingId(), reason)
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            showError(error.message, type)
         })
         .finally(() => {
            showApproveBookingLoading(false, type)
         })
   }
}

const cancelBooking = (e) => {
   e.preventDefault()
   const reason = document.getElementById("cancel-booking-input").value
   if (validateReason(reason)) {
      const submitBtn = document.querySelector(
         "#cancel-booking-form .confirm-cancel-booking .submit-btn"
      )
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      processBookingService
         .cancelBooking(getBookingId(), reason)
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
}

const completeProcessBooking = (e) => {
   const type = e.target.closest("[data-kb-tab-type]").getAttribute("data-kb-tab-type")
   showError(undefined, type)
   switch (type) {
      case "reject":
         rejectBooking(type)
         break
      case "cancel":
         cancelBooking(type)
         break
      case "approve":
         approveBooking(type)
         break
   }
}

const openCancelBookingForm = () => {
   const cancelBookingForm = document.getElementById("cancel-booking-form")
   const openCancelBookingBtn = document.querySelector("#cancel-booking .open-cancel-booking-btn")
   openCancelBookingBtn.hidden = !openCancelBookingBtn.hidden
   cancelBookingForm.hidden = !cancelBookingForm.hidden
}

const init = () => {
   if (approveBookingSection) {
      const approveBookingCheckboxes = approveBookingSection.querySelectorAll(
         ".restaurant-tables table tbody tr .form-check .form-check-input"
      )
      for (const checkbox of approveBookingCheckboxes) {
         checkbox.addEventListener("click", (e) => {
            e.stopPropagation()
         })
         checkbox.addEventListener("change", (e) => {
            const tableId = checkbox.value
            if (checkbox.checked) {
               processBookingShares.pickTable(tableId)
            } else {
               processBookingShares.unpickTable(tableId)
            }
         })
      }

      const approveBookingTableRows = approveBookingSection.querySelectorAll(
         ".restaurant-tables table tbody tr"
      )
      for (const tableRow of approveBookingTableRows) {
         tableRow.addEventListener("click", (e) => {
            tableRow.querySelector(".form-check-input").click()
         })
      }
   }

   const completeProcessingBtns = document.querySelectorAll(
      "#booking-processing .complete-processing .submit-btn"
   )
   for (const btn of completeProcessingBtns) {
      btn.addEventListener("click", completeProcessBooking)
   }

   document
      .querySelector("#cancel-booking .open-cancel-booking-btn")
      .addEventListener("click", openCancelBookingForm)
   document.getElementById("cancel-booking-form").addEventListener("submit", cancelBooking)
   document
      .querySelector("#cancel-booking-form .confirm-cancel-booking .cancel-btn")
      .addEventListener("click", openCancelBookingForm)
}
init()
