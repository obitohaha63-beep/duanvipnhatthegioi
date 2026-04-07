/**
 * HỆ THỐNG VALIDATION INLINE CHUYÊN NGHIỆP
 * Tác vụ: Validate form trực tiếp - hiển thị cảnh báo lỗi đỏ dưới input
 * Sinh viên có thể dễ dàng sử dụng lại cho form khác
 */

// ============================================
// 1. NHỮNG QUY TẮC VALIDATE CƠ BẢN
// ============================================

const ValidationRules = {
  // Email: phải có @ và dấu chấm
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email không được để trống';
    if (!emailRegex.test(value)) return 'Email không hợp lệ (VD: abc@gmail.com)';
    return '';
  },

  // Mật khẩu: tối thiểu 6 ký tự
  password: (value) => {
    if (!value) return 'Mật khẩu không được để trống';
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    return '';
  },

  // Xác nhận mật khẩu: phải trùng với mật khẩu
  confirmPassword: (value, formData) => {
    if (!value) return 'Vui lòng xác nhận mật khẩu';
    if (value !== formData.password) return 'Mật khẩu xác nhận không khớp';
    return '';
  },

  // Họ tên: phải có ít nhất 1 khoảng trắng, không số, không ký tự đặc biệt
  fullname: (value) => {
    if (!value) return 'Họ và tên không được để trống';
    
    // Kiểm tra có ít nhất 1 khoảng trắng
    if (!value.includes(' ')) return 'Họ và tên phải có ít nhất 1 khoảng trắng (VD: Nguyễn Văn A)';
    
    // Kiểm tra không chứa ký tự số
    if (/\d/.test(value)) return 'Họ và tên không được chứa ký tự số';
    
    // Kiểm tra không chứa ký tự đặc biệt (chỉ cho chữ cái, khoảng trắng, dấu phụ)
    if (!/^[a-zA-ZàáãạảăằắẳẵặâầấẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôồốổỗộơờớởỡợùúũụủưừứửữựỳỵỷỹýđßÀÁÃẠẢĂẰẮẲẴẶÂẦẤẨẪẬÈÉẸẺẼÊỀẾỂỄỆÌÍĨỈỊÒÓÕỌỎÔỒỐỔỖỘƠỜỚỞỡỢÙÚŨỤỦƯỨỬỮỰỲỴỶỸÝĐ\s]*$/.test(value)) {
      return 'Họ và tên không được chứa ký tự đặc biệt';
    }
    
    return '';
  },

  // Số điện thoại liên hệ: chính xác 10 số, bắt đầu từ 0
  phone: (value) => {
    const phoneRegex = /^0\d{9}$/;
    if (!value) return 'Số điện thoại không được để trống';
    if (!phoneRegex.test(value)) return 'Số điện thoại phải là 10 số và bắt đầu từ 0 (VD: 0912345678)';
    return '';
  },

  // Địa chỉ chi tiết (Số nhà, Tên đường): phải có 1 khoảng trắng, không ký tự đặc biệt ngoài "/" và "-"
  address: (value) => {
    if (!value) return 'Địa chỉ không được để trống';
    
    // Kiểm tra có ít nhất 1 khoảng trắng
    if (!value.includes(' ')) return 'Địa chỉ phải có ít nhất 1 khoảng trắng (VD: 12 Nguyễn Huệ)';
    
    // Kiểm tra không chứa ký tự đặc biệt ngoài "/" và "-"
    if (!/^[a-zA-Z0-9àáãạảăằắẳẵặâầấẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôồốổỗộơờớởỡợùúũụủưừứửữựỳỵỷỹýđßÀÁÃẠẢĂẰẮẲẴẶÂẦẤẨẪẬÈÉẸẺẼÊỀẾỂỄỆÌÍĨỈỊÒÓÕỌỎÔỒỐỔỖỘƠỜỚỞỡỢÙÚŨỤỦƯỨỬỮỰỲỴỶỸÝĐ\s\/\-]*$/.test(value)) {
      return 'Địa chỉ chỉ được phép chứa số, chữ cái, khoảng trắng, dấu "/" và dấu "-"';
    }
    
    return '';
  },

  // Tên sản phẩm: không được để trống, tối thiểu 3 ký tự
  productName: (value) => {
    if (!value) return 'Tên sản phẩm không được để trống';
    if (value.trim().length < 3) return 'Tên phải ít nhất 3 ký tự';
    return '';
  },

  // Giá tiền: phải là số > 0
  price: (value) => {
    if (!value) return 'Giá tiền không được để trống';
    if (isNaN(value) || parseInt(value) <= 0) return 'Giá tiền phải là số lớn hơn 0';
    return '';
  },

  // Số lượng: phải là số >= 0
  quantity: (value) => {
    if (!value) return 'Số lượng không được để trống';
    if (isNaN(value) || parseInt(value) < 0) return 'Số lượng phải là số >= 0';
    return '';
  },

  // Bắt buộc: không được để trống
  required: (value, label = 'Trường') => {
    if (!value || value.trim() === '') return `${label} không được để trống`;
    return '';
  },

  // Tỷ lệ: từ 0 đến 100
  percentageRate: (value) => {
    if (!value) return 'Tỷ lệ không được để trống';
    if (isNaN(value) || value < 0 || value > 100) return 'Tỷ lệ phải từ 0 đến 100';
    return '';
  }
};

// ============================================
// 2. HÀM HIỂN THỊ CẢNH BÁO LỖI
// ============================================

/**
 * Hiển thị lỗi dưới input
 * @param {HTML Element} inputElement - Phần tử input
 * @param {String} errorMessage - Thông báo lỗi
 */
function showError(inputElement, errorMessage) {
  // Xóa lỗi cũ nếu có
  removeError(inputElement);

  // Thêm class lỗi vào input
  inputElement.classList.add('input-error');

  // Tạo thẻ hiển thị lỗi
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = '❌ ' + errorMessage;

  // Chèn thẻ lỗi ngay sau input
  inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
}

/**
 * Xóa cảnh báo lỗi
 * @param {HTML Element} inputElement - Phần tử input
 */
function removeError(inputElement) {
  // Xóa class lỗi khỏi input
  inputElement.classList.remove('input-error');

  // Xóa thẻ lỗi nếu có
  const errorMessage = inputElement.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// ============================================
// 3. HÀM VALIDATE TRƯỜNG (FIELD)
// ============================================

/**
 * Validate một trường input
 * @param {HTML Element} inputElement - Phần tử input
 * @param {String} validationType - Loại validate (email, password, v.v.)
 * @param {Object} formData - Dữ liệu form (để so sánh confirmPassword)
 * @returns {Boolean} - true nếu hợp lệ, false nếu lỗi
 */
function validateField(inputElement, validationType, formData = {}) {
  const value = inputElement.value;
  let errorMessage = '';

  // Lấy hàm validate phù hợp
  if (ValidationRules[validationType]) {
    errorMessage = ValidationRules[validationType](value, formData);
  }

  // Nếu có lỗi, hiển thị lỗi
  if (errorMessage) {
    showError(inputElement, errorMessage);
    return false;
  } else {
    removeError(inputElement);
    return true;
  }
}

// ============================================
// 4. HÀM VALIDATE TOÀN BỘ FORM
// ============================================

/**
 * Validate toàn bộ form
 * @param {HTML Form Element} formElement - Phần tử form
 * @param {Object} fieldConfigs - Cấu hình trường (VD: {email: 'email', password: 'password'})
 * @returns {Boolean} - true nếu tất cả valid, false nếu có lỗi
 */
function validateForm(formElement, fieldConfigs) {
  let isFormValid = true;
  const formData = new FormData(formElement);
  const formDataObj = Object.fromEntries(formData);

  // Validate từng trường
  for (const [fieldName, validationType] of Object.entries(fieldConfigs)) {
    const fieldElement = formElement.querySelector(`[name="${fieldName}"]`);
    if (fieldElement) {
      const isValid = validateField(fieldElement, validationType, formDataObj);
      if (!isValid) {
        isFormValid = false;
      }
    }
  }

  return isFormValid;
}

// ============================================
// 5. HÀM THIẾT LẬP VALIDATOR TỰ ĐỘNG
// ============================================

/**
 * Thiết lập validator tự động cho form
 * Validate ngay khi người dùng thoát khỏi trường (blur event)
 * @param {HTML Form Element} formElement - Phần tử form
 * @param {Object} fieldConfigs - Cấu hình trường
 */
function setupRealtimeValidation(formElement, fieldConfigs) {
  // Validate ngay khi thoát input (blur)
  for (const [fieldName, validationType] of Object.entries(fieldConfigs)) {
    const fieldElement = formElement.querySelector(`[name="${fieldName}"]`);
    if (fieldElement) {
      fieldElement.addEventListener('blur', () => {
        const formData = new FormData(formElement);
        const formDataObj = Object.fromEntries(formData);
        validateField(fieldElement, validationType, formDataObj);
      });

      // Cũng validate khi người dùng đang gõ (input event)
      fieldElement.addEventListener('input', () => {
        const formData = new FormData(formElement);
        const formDataObj = Object.fromEntries(formData);
        validateField(fieldElement, validationType, formDataObj);
      });
    }
  }
}

// ============================================
// 6. HÀNG SUB USER - TÓM TẮT CÁCH SỬ DỤNG
// ============================================

/**
 * VÍ DỤ: Cách sử dụng validation này
 * 
 * 1. Tải file validation.js vào HTML:
 *    <script src="../assets/js/validation.js"></script>
 * 
 * 2. Tải file CSS:
 *    <link rel="stylesheet" href="../assets/css/validation-styles.css">
 * 
 * 3. Trong file JS riêng của form, viết:
 *    
 *    const registerForm = document.getElementById('registerForm');
 *    const fieldConfigs = {
 *      name: 'fullname',
 *      email: 'email',
 *      password: 'password',
 *      confirm_password: 'confirmPassword'
 *    };
 *    setupRealtimeValidation(registerForm, fieldConfigs);
 * 
 *    registerForm.addEventListener('submit', (e) => {
 *      e.preventDefault();
 *      if (validateForm(registerForm, fieldConfigs)) {
 *        // Gửi form đi
 *        registerForm.submit();
 *      }
 *    });
 */

// Export để sử dụng (nếu dùng module)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ValidationRules,
    showError,
    removeError,
    validateField,
    validateForm,
    setupRealtimeValidation
  };
}
