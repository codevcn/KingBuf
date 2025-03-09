function convertTo12HourFormat(time) {
   let [hour, minute] = time.split(":").map(parseInt)
   let period = hour >= 12 ? "PM" : "AM"
   hour = hour % 12 || 12
   return [`${hour}:${minute.toString().padStart(2, "0")}`, period]
}

function createLoading() {
   return `
      <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
      </div>`
}

function extractFormData(formEle, formFields) {
   const form = new FormData(formEle)
   const formData = {}
   if (formFields) {
      for (const field of formFields) {
         formData[field] = form.get(field).trim()
      }
   } else {
      for (const [key, value] of form.entries()) {
         formData[key] = value
      }
   }
   return formData
}

function navigateWithPayload(href, params) {
   const queryString = new URLSearchParams(params).toString()
   window.location.href = queryString ? `${href}?${queryString}` : href
}
