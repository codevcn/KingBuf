const searchFormEle = document.getElementById("search-form")

const validateSearchData = (formData) => {
   const phone = formData["phone"],
      nameOfUser = formData["name"]

   if (!phone || phone.length < 10) {
      toaster.error("Cảnh báo", "Trường số điện thoại phải có ít nhất 10 chữ số!")
      return false
   } else if (!validator.isMobilePhone(phone)) {
      toaster.error("Cảnh báo", "Trường số điện thoại không hợp lệ!")
      return false
   }
   if (!nameOfUser) {
      toaster.error("Cảnh báo", "Trường tên không được để trống!")
      return false
   }

   return true
}

const showSearchLoading = (show) => {
   const submitBtn = searchFormEle.querySelector(".submit-btn")
   submitBtn.innerHTML = ""
   if (show) {
      submitBtn.innerHTML = createLoading()
   }
}

const searchBookings = (e) => {
   e.preventDefault()
   const formData = extractFormData(e.target)
   if (validateSearchData(formData)) {
      showSearchLoading(true)
      navigateWithPayload("/bookings-history", {
         phone: formData["phone"],
         name: formData["name"],
      })
   }
}

const init = () => {
   searchFormEle.addEventListener("submit", searchBookings)
}
init()
