const bookingFormEle = document.getElementById("booking-form")
const bookingDetails = document.getElementById("confirm-booking-details")

const formFields = ["full-name", "phone", "date", "time", "adults-count", "children-count", "note"]

const createFormGroupMessage = (message) => {
   const messageEle = document.createElement("div")
   messageEle.classList.add("message")
   messageEle.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill"></i>
      <span>${message}</span>`
   return messageEle
}

const validateBooking = (formData) => {
   let isValid = true

   const fullName = formData["full-name"],
      phone = formData["phone"],
      date = formData["date"],
      time = formData["time"],
      adultsCount = formData["adults-count"],
      childrenCount = formData["children-count"]

   const warning = (formGroupClassName, message) => {
      isValid = false
      const formGroup = bookingFormEle.querySelector(`.form-group.${formGroupClassName}`)
      formGroup.classList.add("warning")
      formGroup.querySelector(".message")?.remove()
      formGroup.appendChild(createFormGroupMessage(message))
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
      if (!validator.isInt(childrenCount, { min: 0 })) {
         warning("children-count", "Số trẻ em phải lớn hơn hoặc bằng 0!")
      }
   }

   return isValid
}

const showConfirmBooking = (formData) => {
   bookingDetails.querySelector(".form-group.full-name p").textContent = formData["full-name"]
   bookingDetails.querySelector(".form-group.phone p").textContent = formData["phone"]
   bookingDetails.querySelector(".form-group.date-time p").textContent = `${formData["date"]}, ${
      formData["time"]
   } (${convertTo12HourFormat(formData["time"])[1] === "AM" ? "Buổi sáng" : "Buổi chiều"})`
   bookingDetails.querySelector(".form-group.people-count p").textContent = `${
      formData["adults-count"]
   } người lớn và ${formData["children-count"] || 0} trẻ em`
   const noteMessageEle = bookingDetails.querySelector(".form-group.note p")
   noteMessageEle.classList.remove("empty")
   if (formData["note"]) {
      noteMessageEle.textContent = formData["note"]
   } else {
      noteMessageEle.classList.add("empty")
      noteMessageEle.textContent = "Không có"
   }

   const confirmBooking = new bootstrap.Modal("#confirm-booking-modal")
   confirmBooking.show()
}

const submitBooking = (e) => {
   e.preventDefault()
   const formData = extractFormData(e.target)
   if (validateBooking(formData)) {
      reservationPageShares.bookingData = formData
      showConfirmBooking(formData)
   }
}

const showCofirmBookingLoading = (show) => {
   bookingDetails.querySelector(".submit-btn").innerHTML = show
      ? createLoading()
      : `<span>Xác nhận đặt chỗ</span>`
}

const confirmBooking = () => {
   showCofirmBookingLoading(true)
   bookingService
      .submitBooking(reservationPageShares.bookingData)
      .then(() => {
         toaster.success("Đặt bàn thành công", "", () => {
            window.location.href = `/bookings-history?Cus_FullName=${reservationPageShares.bookingData["full-name"]}&Cus_Phone=${reservationPageShares.bookingData["phone"]}`
         })
      })
      .catch((error) => {
         toaster.error("Đặt chỗ thất bại", extractErrorMessage(error))
      })
      .finally(() => {
         showCofirmBookingLoading(false)
      })
}

const init = () => {
   bookingFormEle.addEventListener("submit", submitBooking)

   const formFields = bookingFormEle.elements
   for (const field of formFields) {
      field.addEventListener("input", (e) => {
         field.closest(".form-group").classList.remove("warning")
      })
   }

   bookingDetails.querySelector(".submit-btn").addEventListener("click", confirmBooking)
}
init()
