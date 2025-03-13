// Hàm kiểm tra số điện thoại cho định dạng Việt Nam
export function validatePhoneNumber(phoneNumber) {
    const regex = /^(0?)(3[2-9]|5[6-9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    return regex.test(phoneNumber);
  }

export function isPositiveIntegerString(str) {
    // Biểu thức chính quy kiểm tra chuỗi chỉ chứa các chữ số và không bắt đầu bằng số 0
    const regex = /^[1-9]\d*$/;
    return regex.test(str);
}

export function isIntegerString(str) {
  // Biểu thức chính quy kiểm tra chuỗi chỉ chứa các chữ số 
  const regex = /^[0-9]\d*$/;
  return regex.test(str);
}