const searchFormEle = document.getElementById("search-form")

const validateSearchData = (formData) => {
   const phone = formData["Cus_Phone"],
      nameOfUser = formData["Cus_FullName"]

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
         Cus_Phone: formData["Cus_Phone"],
         Cus_FullName: formData["Cus_FullName"],
      })
   }
}

const init = () => {
   searchFormEle.addEventListener("submit", searchBookings)
}
init()
function getQueryParams() {
   const params = new URLSearchParams(window.location.search);
   return {
       Cus_FullName: params.get("Cus_FullName"),
       Cus_Phone: params.get("Cus_Phone")
   };
}

function fillForm() {
   const { Cus_FullName, Cus_Phone } = getQueryParams();
   console.log(Cus_FullName, Cus_Phone);
   if (Cus_FullName) {
      document.getElementsByName("Cus_FullName")[0].value = decodeURIComponent(Cus_FullName);
  }
  
  if (Cus_Phone) {
      document.getElementsByName("Cus_Phone")[0].value = decodeURIComponent(Cus_Phone);
  }
  
}

window.onload = fillForm;