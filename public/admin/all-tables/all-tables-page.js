const validateForm = (formData) => {
   let isValid = true

   const showError = (type, message) => {
      isValid = false
      const messageEle = document.querySelector(
         `#add-new-table-form .form-groups .form-group.${type} .message`
      )
      if (message) {
         messageEle.textContent = message
         messageEle.hidden = false
      } else {
         messageEle.hidden = true
      }
   }

   if (!checkIsInteger(formData["table-number"])) {
      showError("table-number", "Số hiệu bàn phải là 1 số nguyên")
   }
   if (!(checkIsInteger(formData["capacity"]) && parseInt(formData["capacity"]) > 0)) {
      showError("capacity", "Sức chứa của bàn phải lớn hơn hoặc bằng 1")
   }
   if (!formData["location"]) {
      showError("location", "Trường vị trí của bàn không được trống")
   }

   return isValid
}

const addNewTable = (e) => {
   e.preventDefault()
   const formEle = e.target
   const formData = extractFormData(formEle)
   if (validateForm(formData)) {
      const submitBtn = document.getElementById("add-table-button")
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      tablesService
         .addNewTable(formData)
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

const showConfirmDeleteTableModal = (e) => {
   const tableId = e.currentTarget.getAttribute("data-kb-table-id")
   const confirmSection = document.getElementById("confirm-delete-section")
   confirmSection.querySelector(".notice").textContent = `Xác nhận xóa bàn mang số hiệu ${tableId}`
   confirmSection.querySelector(".submit-btn").setAttribute("data-kb-table-id", tableId)

   const confirmBooking = new bootstrap.Modal("#delete-table-modal")
   confirmBooking.show()
}

const deleteTable = (e) => {
   const submitBtn = e.currentTarget
   const backupContent = submitBtn.innerHTML
   submitBtn.innerHTML = createLoading()
   tablesService
      .deleteTable(e.target.getAttribute("data-kb-table-id"))
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

const showUpdateTableModal = (e) => {
   const confirmBooking = new bootstrap.Modal("#update-table-modal")
   confirmBooking.show()
}

const init = () => {
   document.getElementById("add-new-table-form").addEventListener("submit", addNewTable)
   const formFields = document.querySelectorAll(
      "#add-new-table-form .form-groups .form-group input"
   )
   for (const field of formFields) {
      field.addEventListener("input", (e) => {
         e.target.nextElementSibling.hidden = true
      })
   }

   const deleteActionBtns = document.querySelectorAll(
      "#restaurant-tables table tbody tr td .actions .action.delete"
   )
   for (const actionBtn of deleteActionBtns) {
      actionBtn.addEventListener("click", showConfirmDeleteTableModal)
   }

   const updateActionBtns = document.querySelectorAll(
      "#restaurant-tables table tbody tr td .actions .action.update"
   )
   for (const actionBtn of updateActionBtns) {
      actionBtn.addEventListener("click", showUpdateTableModal)
   }

   document
      .querySelector("#confirm-delete-section .submit-btn")
      .addEventListener("click", deleteTable)

   // Update table
   const dropdown = document.getElementById("table-status-select")
   const dropdownButton = dropdown.querySelector(".dropdown-toggle")
   const dropdownItems = dropdown.querySelectorAll(".dropdown-item")
   for (const item of dropdownItems) {
      item.onclick = () => {
         const selectedText = item.textContent
         const selectedStatus = item.getAttribute("data-kb-table-status")
         dropdownButton.textContent = selectedText
         dropdown.setAttribute("data-kb-selected-status", selectedStatus)
      }
   }
}
init()
