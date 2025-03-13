const showProcessBookingLoading = (show, buttonEle) => {
   const submitBtnEle = buttonEle
      .closest("[data-kb-tab-type]")
      .querySelector(".complete-processing .submit-btn")
   if (show) {
      submitBtnEle.innerHTML = createLoading()
   } else {
      submitBtnEle.innerHTML = `
         <i class="bi bi-check-all"></i>
         <span>Hoàn tất xử lý đơn</span>`
   }
}

const showError = (message, buttonEle) => {
   const resultSection = buttonEle.closest(".tab-pane").querySelector(".processing-result")
   if (message) {
      resultSection.querySelector(".result-message").textContent = message
      resultSection.hidden = false
   } else {
      resultSection.hidden = true
   }
}

const getBookingId = () =>
   document.getElementById("update-booking-form").getAttribute("data-kb-booking-id")

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

const approveBooking = (buttonEle) => {
   const pickedTables = processBookingShares.pickedTables
   if (validateApproving(pickedTables)) {
      showProcessBookingLoading(true, buttonEle)
      processBookingService
         .approveBooking(getBookingId(), pickedTables)
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            showError(error.message, buttonEle)
         })
         .finally(() => {
            showProcessBookingLoading(false, buttonEle)
         })
   }
}

const rejectBooking = (buttonEle) => {
   const reason = document.getElementById("reject-booking-input").value
   if (validateReason(reason)) {
      showProcessBookingLoading(true, buttonEle)
      processBookingService
         .rejectBooking(getBookingId(), reason)
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            showError(error.message, buttonEle)
         })
         .finally(() => {
            showProcessBookingLoading(false, buttonEle)
         })
   }
}

const cancelBooking = (buttonEle) => {
   const reason = document.getElementById("cancel-booking-input").value
   if (validateReason(reason)) {
      showProcessBookingLoading(true, buttonEle)
      processBookingService
         .cancelBooking(getBookingId(), reason)
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            showError(error.message, buttonEle)
         })
         .finally(() => {
            showProcessBookingLoading(false, buttonEle)
         })
   }
}

const completeProcessBooking = (e) => {
   const buttonEle = e.currentTarget
   const type = buttonEle.closest("[data-kb-tab-type]").getAttribute("data-kb-tab-type")
   showError(undefined, buttonEle)
   switch (type) {
      case "reject":
         rejectBooking(buttonEle)
         break
      case "cancel":
         cancelBooking(buttonEle)
         break
      case "approve":
         approveBooking(buttonEle)
         break
   }
}

const openUpdateAssignTables = () => {
   const updateAssignTablesEle = document.getElementById("update-assign-tables")
   const updateAssignTablesBtn = updateAssignTablesEle.querySelector(".open-btn")
   const tablesList = updateAssignTablesEle.querySelector(".restaurant-tables")
   const filter = updateAssignTablesEle.querySelector(".filter-tables-form")
   filter.hidden = !filter.hidden
   updateAssignTablesBtn.hidden = !updateAssignTablesBtn.hidden
   tablesList.hidden = !tablesList.hidden
}

const validateUpdate = (formData) => {
   let isValid = true

   const fullName = formData["full-name"],
      phone = formData["phone"],
      date = formData["date"],
      time = formData["time"],
      adultsCount = formData["adults-count"],
      childrenCount = formData["children-count"]

   const warning = (formGroupClassName, message) => {
      isValid = false
      const formGroup = document.querySelector(
         `#update-booking-form .form-groups .form-group.${formGroupClassName}`
      )
      const messageEle = formGroup.querySelector(".message")
      messageEle.innerHTML = ""
      messageEle.innerHTML = `
         <i class="bi bi-exclamation-triangle-fill"></i>
         <span>${message}</span>`
   }

   if (!fullName) {
      warning("full-name", "Trường họ và tên không được để trống!")
   }
   if (phone && !validator.isMobilePhone(phone)) {
      warning("phone", "Số điện thoại không hợp lệ!")
   } else if (!phone || phone.length < 10) {
      warning("phone", "Số điện thoại phải có ít nhất 10 chữ số!")
   }
   if (date) {
      const today = dayjs().format("YYYY-MM-DD")
      if (dayjs(date).isBefore(today, "day")) {
         warning("date", "Ngày đặt phải từ hôm nay trở đi!")
      }
   } else {
      warning("date", "Trường ngày đặt không được để trống!")
   }
   if (!time) {
      warning("time", "Trường giờ đặt không được để trống!")
   }
   if (!adultsCount || !validator.isInt(adultsCount, { min: 1 })) {
      warning("adults-count", "Phải có ít nhất 1 người lớn!")
   }
   if (childrenCount) {
      if (!validator.isInt(childrenCount, { min: 1 })) {
         warning("children-count", "Số trẻ em phải lớn hơn 0!")
      }
   }

   return isValid
}

const updateBooking = (e) => {
   e.preventDefault()
   const formEle = e.currentTarget
   const formData = extractFormData(formEle)
   if (validateUpdate(formData)) {
      const submitBtn = formEle.querySelector(".submit-btn")
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      bookingService
         .updateBooking(getBookingId(), formData)
         .then(() => {
            reloadPage()
         })
         .catch(() => {
            toaster.error("Cập nhật đơn thất bại", "Cập nhật đơn thất bại")
         })
         .finally(() => {
            submitBtn.innerHTML = backupContent
         })
   }
}

const validateFilterTables = (formData) => {
   let isValid = true

   const date = formData["date"],
      time = formData["time"],
      peopleCount = formData["people-count"]

   if (date) {
      const today = dayjs().format("YYYY-MM-DD")
      if (dayjs(date).isBefore(today, "day")) {
         isValid = false
         toaster.error("Ngày phục vụ phải từ hôm nay trở đi!")
      }
   } else {
      isValid = false
      toaster.error("Trường ngày phục vụ không được để trống!")
   }
   if (!time) {
      isValid = false
      toaster.error("Trường giờ phục vụ không được để trống!")
   }
   if (!peopleCount || parseInt(peopleCount) < 1) {
      isValid = false
      toaster.error("Số người phục vụ phải lớn hơn 0!")
   }

   return isValid
}

const filterTables = (e) => {
   e.preventDefault()
   const formEle = e.currentTarget
   const formData = extractFormData(formEle)
   if (validateFilterTables(formData)) {
      const submitBtn = formEle.querySelector(".submit-btn")
      submitBtn.innerHTML = createLoading()
      window.location.href = setURLWithQueryString(getCurrentPath(), formData)
   }
}

const updateAssignTables = (e) => {
   const submitBtn = e.currentTarget
   const pickedTables = processBookingShares.pickedTables
   if (validateApproving(pickedTables)) {
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      processBookingService
         .approveBooking(getBookingId(), pickedTables)
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

const init = () => {
   if (document.querySelectorAll(".restaurant-tables")?.length > 0) {
      const approveBookingCheckboxes = document.querySelectorAll(
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

      const approveBookingTableRows = document.querySelectorAll(".restaurant-tables table tbody tr")
      for (const tableRow of approveBookingTableRows) {
         tableRow.addEventListener("click", (e) => {
            tableRow.querySelector(".form-check-input").click()
         })
      }

      const completeProcessingBtns = document.querySelectorAll(
         "#booking-processing .complete-processing .submit-btn"
      )
      for (const btn of completeProcessingBtns) {
         btn.addEventListener("click", completeProcessBooking)
      }
   }

   const tablesOfUpdateAssign = document.querySelector("#update-assign-tables")
   tablesOfUpdateAssign
      ?.querySelector(".open-btn")
      .addEventListener("click", openUpdateAssignTables)
   tablesOfUpdateAssign
      ?.querySelector(".escape-btn")
      .addEventListener("click", openUpdateAssignTables)
   tablesOfUpdateAssign?.querySelector(".submit-btn").addEventListener("click", updateAssignTables)

   const updateBookingForm = document.getElementById("update-booking-form")
   updateBookingForm.addEventListener("submit", updateBooking)
   const updateBookingFormFields = updateBookingForm.querySelectorAll(
      ".form-groups .form-group input"
   )
   for (const field of updateBookingFormFields) {
      field.addEventListener("input", (e) => {
         e.target.nextElementSibling.innerHTML = ""
      })
   }

   document
      .querySelector("#complete-booking .complete-booking-btn")
      ?.addEventListener("click", completeBooking)

   document.getElementById("filter-tables-form").addEventListener("submit", filterTables)
}
init()
