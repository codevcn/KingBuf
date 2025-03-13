const loginFormEle = document.getElementById("login-form")

const togglePasswordVisibility = () => {
   const passwordField = document.getElementById("password-input")
   const showPasswordBtn = loginFormEle.querySelector(".hide-show-password-btn.show")
   const hidePasswordBtn = loginFormEle.querySelector(".hide-show-password-btn.hide")

   if (passwordField.type === "password") {
      passwordField.type = "text"
      showPasswordBtn.hidden = false
      hidePasswordBtn.hidden = true
   } else {
      passwordField.type = "password"
      showPasswordBtn.hidden = true
      hidePasswordBtn.hidden = false
   }
}

const validateLoginData = (formData) => {
   const username = formData["username"],
      password = formData["password"]

   if (!username) {
      toaster.error("Cảnh báo", "Trường username không hợp lệ!")
      return false
   }
   if (!password) {
      toaster.error("Cảnh báo", "Trường mật khẩu không hợp lệ!")
      return false
   }

   return true
}

const showLoginLoading = (show) => {
   const submitBtn = loginFormEle.querySelector(".submit-btn")
   submitBtn.innerHTML = ""
   if (show) {
      submitBtn.innerHTML = createLoading()
   }
}

const loginAdmin = (e) => {
   e.preventDefault()
   const formEle = e.target
   const formData = extractFormData(formEle)
   if (validateLoginData(formData)) {
      showLoginLoading(true)
      authService
         .login(formData)
         .then(() => {
            window.location.href = "/bookings-history"
         })
         .catch((error) => {
            toaster.error(extractErrorMessage(error))
         })
         .finally(() => {
            showLoginLoading(false)
         })
   }
}

const init = () => {
   const hideShowPasswordBtns = loginFormEle.querySelectorAll(".hide-show-password-btn")
   for (const btn of hideShowPasswordBtns) {
      btn.addEventListener("click", togglePasswordVisibility)
   }

   loginFormEle.addEventListener("submit", loginAdmin)
}
init()
