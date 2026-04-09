
const ValidationRules = {

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email không được để trống";
    if (!emailRegex.test(value))
      return "Email không hợp lệ (VD: abc@gmail.com)";
    return "";
  },


  password: (value) => {
    if (!value) return "Mật khẩu không được để trống";
    if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    return "";
  },


  confirmPassword: (value, formData) => {
    if (!value) return "Vui lòng xác nhận mật khẩu";
    if (value !== formData.password) return "Mật khẩu xác nhận không khớp";
    return "";
  },


  fullname: (value) => {
    if (!value) return "Họ và tên không được để trống";


    if (!value.includes(" "))
      return "Họ và tên phải có ít nhất 1 khoảng trắng (VD: Nguyễn Văn A)";


    if (/\d/.test(value)) return "Họ và tên không được chứa ký tự số";


    if (
      !/^[a-zA-ZàáãạảăằắẳẵặâầấẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôồốổỗộơờớởỡợùúũụủưừứửữựỳỵỷỹýđßÀÁÃẠẢĂẰẮẲẴẶÂẦẤẨẪẬÈÉẸẺẼÊỀẾỂỄỆÌÍĨỈỊÒÓÕỌỎÔỒỐỔỖỘƠỜỚỞỡỢÙÚŨỤỦƯỨỬỮỰỲỴỶỸÝĐ\s]*$/.test(
        value,
      )
    ) {
      return "Họ và tên không được chứa ký tự đặc biệt";
    }

    return "";
  },


  phone: (value) => {
    const phoneRegex = /^0\d{9}$/;
    if (!value) return "Số điện thoại không được để trống";
    if (!phoneRegex.test(value))
      return "Số điện thoại phải là 10 số và bắt đầu từ 0 (VD: 0912345678)";
    return "";
  },


  address: (value) => {
    if (!value) return "Địa chỉ không được để trống";


    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    // Kiểm tra có ít nhất 2 từ (phải có ít nhất 1 khoảng trắng giữa nội dung thực)
    if (words.length < 2) {
      return "Địa chỉ phải có ít nhất 1 khoảng trắng giữa nội dung (VD: 12 Nguyễn Huệ)";
    }

    // Kiểm tra không chứa ký tự đặc biệt ngoài "/" và "-"
    if (
      !/^[a-zA-Z0-9àáãạảăằắẳẵặâầấẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôồốổỗộơờớởỡợùúũụủưừứửữựỳỵỷỹýđßÀÁÃẠẢĂẰẮẲẴẶÂẦẤẨẪẬÈÉẸẺẼÊỀẾỂỄỆÌÍĨỈỊÒÓÕỌỎÔỒỐỔỖỘƠỜỚỞỡỢÙÚŨỤỦƯỨỬỮỰỲỴỶỸÝĐ\s\/\-]*$/.test(
        value,
      )
    ) {
      return 'Địa chỉ chỉ được phép chứa số, chữ cái, khoảng trắng, dấu "/" và dấu "-"';
    }

    return "";
  },

  // Tên sản phẩm: không được để trống, tối thiểu 3 ký tự
  productName: (value) => {
    if (!value) return "Tên sản phẩm không được để trống";
    if (value.trim().length < 3) return "Tên phải ít nhất 3 ký tự";
    return "";
  },

  // Giá tiền: phải là số > 0
  price: (value) => {
    if (!value) return "Giá tiền không được để trống";
    if (isNaN(value) || parseInt(value) <= 0)
      return "Giá tiền phải là số lớn hơn 0";
    return "";
  },

  // Số lượng: phải là số >= 0
  quantity: (value) => {
    if (!value) return "Số lượng không được để trống";
    if (isNaN(value) || parseInt(value) < 0) return "Số lượng phải là số >= 0";
    return "";
  },

  // Bắt buộc: không được để trống
  required: (value, label = "Trường") => {
    if (!value || value.trim() === "") return `${label} không được để trống`;
    return "";
  },


  percentageRate: (value) => {
    if (!value) return "Tỷ lệ không được để trống";
    if (isNaN(value) || value < 0 || value > 100)
      return "Tỷ lệ phải từ 0 đến 100";
    return "";
  },
};


function showError(inputElement, errorMessage) {

  removeError(inputElement);


  inputElement.classList.add("input-error");


  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = " " + errorMessage;


  inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
}


function removeError(inputElement) {
  // Xóa class lỗi khỏi input
  inputElement.classList.remove("input-error");

  // Xóa thẻ lỗi nếu có
  const errorMessage = inputElement.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}


function validateField(inputElement, validationType, formData = {}) {
  const value = inputElement.value;
  let errorMessage = "";


  if (ValidationRules[validationType]) {
    errorMessage = ValidationRules[validationType](value, formData);
  }


  if (errorMessage) {
    showError(inputElement, errorMessage);
    return false;
  } else {
    removeError(inputElement);
    return true;
  }
}


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


function setupRealtimeValidation(formElement, fieldConfigs) {

  for (const [fieldName, validationType] of Object.entries(fieldConfigs)) {
    const fieldElement = formElement.querySelector(`[name="${fieldName}"]`);
    if (fieldElement) {
      fieldElement.addEventListener("blur", () => {
        const formData = new FormData(formElement);
        const formDataObj = Object.fromEntries(formData);
        validateField(fieldElement, validationType, formDataObj);
      });


      fieldElement.addEventListener("input", () => {
        const formData = new FormData(formElement);
        const formDataObj = Object.fromEntries(formData);
        validateField(fieldElement, validationType, formDataObj);
      });
    }
  }
}


if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ValidationRules,
    showError,
    removeError,
    validateField,
    validateForm,
    setupRealtimeValidation,
  };
}
