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
   // e.preventDefault()
   // console.log("filterBookings")
   // const formData = extractFormData(e.target)
   // if (validateFilterFormData(formData)) {
   //    navigateWithPayload(getCurrentPath(), formData)
   // }
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

   // document.getElementById("filter-bookings-form").addEventListener("submit", filterBookings)
   // document.getElementById("complete-booking-btn").addEventListener("click", completeBooking)
   // document.getElementById("set-arrived-cus-btn").addEventListener("click", setArrivedStatus)
   // document.getElementById("cancel-booking-btn").addEventListener("click", cancelBooking)
}
init()
document.addEventListener("DOMContentLoaded", function () {
   // Lấy tham số từ URL
   const params = new URLSearchParams(window.location.search);

   // Gán giá trị vào input trạng thái đơn
   const statusInput = document.querySelector("#booking-status-input");
   const statusButton = document.querySelector("#booking-status-select button");
   const selectedStatus = params.get("status");

   if (selectedStatus) {
       statusInput.value = selectedStatus;
       const selectedItem = document.querySelector(`.dropdown-item[data-kb-table-status="${selectedStatus}"]`);
       if (selectedItem) {
           statusButton.textContent = selectedItem.textContent;
       }
   }

   // Gán giá trị vào input thời gian nếu có
   const timeInput = document.querySelector('input[name="time"]');
   if (params.get("time")) {
       timeInput.value = params.get("time");
   }

   // Gán giá trị vào input ngày nếu có
   const dateInput = document.querySelector('input[name="date"]');
   if (params.get("date")) {
       dateInput.value = params.get("date");
   }

   // Gán giá trị vào input số điện thoại nếu có
   const phoneInput = document.querySelector('input[name="phonenumber"]');
   if (params.get("phonenumber")) {
       phoneInput.value = params.get("phonenumber");
   }

   // Reset thời gian khi nhập ngày & ngược lại
   dateInput.addEventListener("input", function () {
       if (dateInput.value) {
           timeInput.value = ""; // Xóa giá trị của "Thời gian đến hạn"
       }
   });

   timeInput.addEventListener("input", function () {
       if (timeInput.value) {
           dateInput.value = ""; // Xóa giá trị của "Trong ngày"
       }
   });
});
