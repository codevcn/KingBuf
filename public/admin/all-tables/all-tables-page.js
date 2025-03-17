const validateAddTableForm = (formData) => {
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

   if (!formData["table-number"]) {
      showError("table-number", "Số hiệu bàn không được bỏ trống")
   }
   if (!(checkIsInteger(formData["capacity"]) && parseInt(formData["capacity"]) > 0)) {
      showError("capacity", "Sức chứa của bàn phải lớn hơn hoặc bằng 1")
   }
   if (!formData["location"]) {
      showError("location", "Trường vị trí của bàn không được trống")
   }

   return isValid
}

const validateUpdateTableForm = (formData) => {
   let isValid = true

   const showError = (type, message) => {
      isValid = false
      const messageEle = document.querySelector(
         `#update-table-form .form-groups .form-group.${type} .message`
      )
      if (message) {
         messageEle.textContent = message
         messageEle.hidden = false
      } else {
         messageEle.hidden = true
      }
   }
   if (!(checkIsInteger(formData["capacity"]) && parseInt(formData["capacity"]) > 0)) {
      showError("capacity", "Sức chứa của bàn phải lớn hơn hoặc bằng 1")
   }
   if (!formData["location"]) {
      showError("location", "Trường vị trí của bàn không được trống")
   }
   if (!formData["status"]) {
      showError("status", "Trường trạng thái của bàn không hợp lệ")
   }

   return isValid
}

const addNewTable = (e) => {
   e.preventDefault()
   const formEle = e.target
   const formData = extractFormData(formEle)
   if (validateAddTableForm(formData)) {
      const submitBtn = document.getElementById("add-table-button")
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      tablesService
         .addNewTable(formData)
         .then(() => {
            toaster.success("Thêm bàn thành công","",()=>{
               reloadPage()
            })
         })
         .catch((error) => {
            toaster.error(extractErrorMessage(error))
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
      .deleteTable(e.currentTarget.getAttribute("data-kb-table-id"))
      .then(() => {
         reloadPage()
      })
      .catch((error) => {
         toaster.error(extractErrorMessage(error))
      })
      .finally(() => {
         submitBtn.innerHTML = backupContent
      })
}

const showUpdateTableModal = (e) => {
   const formData = JSON.parse(e.currentTarget.getAttribute("data-kb-table-data"))

   document.getElementById("add-table-table-id-input").value = formData.TableID
   document.getElementById("update-table-table-number-input").value = formData.TableNumber
   document.getElementById("update-table-capacity-input").value = formData.Capacity
   document.getElementById("update-table-location-input").value = formData.Location
   document.getElementById("update-table-status-input").value = formData.Status

   document.querySelector("#table-status-select .dropdown-toggle").textContent =
      formData.Status === "Available" ? "Còn trống" : "Đang bảo trì"

   const confirmBooking = new bootstrap.Modal("#update-table-modal")
   confirmBooking.show()
}

const updateTable = (e) => {
   e.preventDefault()
   const formEle = e.target
   const formData = extractFormData(formEle)
   if (validateUpdateTableForm(formData)) {
      const submitBtn = document.getElementById("update-table-button")
      const backupContent = submitBtn.innerHTML
      submitBtn.innerHTML = createLoading()
      console.log(formData)
      const { 'table-id': tableId, ...updateData } = formData
      tablesService
         .updateTable(tableId, { Capacity: updateData.capacity, Location: updateData.location, Status: updateData.status })
         .then(() => {
            reloadPage()
         })
         .catch((error) => {
            toaster.error(extractErrorMessage(error))
         })
         .finally(() => {
            submitBtn.innerHTML = backupContent
         })
   }
}

const init = () => {
   document.getElementById("add-new-table-form").addEventListener("submit", addNewTable)
   const addNewTableFormFields = document.querySelectorAll(
      "#add-new-table-form .form-groups .form-group input"
   )
   for (const field of addNewTableFormFields) {
      field.addEventListener("input", (e) => {
         e.target.nextElementSibling.hidden = true
      })
   }

   document.getElementById("update-table-form").addEventListener("submit", updateTable)
   const updatTableFormFields = document.querySelectorAll(
      "#update-table-form .form-groups .form-group input"
   )
   for (const field of updatTableFormFields) {
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

   document.getElementById("update-table-form").addEventListener("submit", updateTable)

   document
      .querySelector("#confirm-delete-section .submit-btn")
      .addEventListener("click", deleteTable)

   // table status dropdown
   const dropdownButton = document.querySelector("#table-status-select .dropdown-toggle")
   const dropdownItems = document.querySelectorAll("#table-status-select .dropdown-item")
   for (const item of dropdownItems) {
      item.onclick = () => {
         const selectedText = item.textContent
         const selectedStatus = item.getAttribute("data-kb-table-status")
         dropdownButton.textContent = selectedText
         document.getElementById("update-table-status-input").value = selectedStatus
      }
   }
}
init()
