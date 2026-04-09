

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  const fieldConfigs = {
    name: "fullname",
    email: "email",
    password: "password",
    confirm_password: "confirmPassword",
    city: "required",
    district: "required",
    ward: "required",
    detail_address: "address",
    phone: "phone",
  };


  setupRealtimeValidation(registerForm, fieldConfigs);

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();


    const city = document.getElementById("city").value.trim();
    const district = document.getElementById("district").value.trim();
    const ward = document.getElementById("ward").value.trim();
    const detail_address = document
      .getElementById("detail_address")
      .value.trim();

    // Nếu bất kì trường địa chỉ nào bỏ trống, alert
    if (!city || !district || !ward || !detail_address) {
      alert(" Yêu cầu nhập đầy đủ địa chỉ giao hàng mặc định");
      return;
    }

    // Validate toàn bộ form trước khi submit
    if (!validateForm(registerForm, fieldConfigs)) {
      // Nếu có lỗi, hiển thị thông báo
      alert(" Vui lòng kiểm tra lại các thông tin!");
      return;
    }

    // Lấy dữ liệu từ form
    const fullName = document.getElementById("fullname").value.trim();
    const userEmail = document.getElementById("email-register").value.trim();
    const userPassword = document.getElementById("password-register").value;
    const phoneNumber = document.getElementById("phone").value.trim();


    try {
      const serverResponse = await fetch("../assets/php/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: userEmail,
          password: userPassword,
          city: city,
          district: district,
          ward: ward,
          detail_address: detail_address,
          phone: phoneNumber,
        }),
      });

      const responseData = await serverResponse.json();

      if (responseData.success) {
        alert(" Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "../pages/login.html";
      } else {
        alert(" Lỗi: " + responseData.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert(" Lỗi kết nối server. Vui lòng thử lại!");
    }
  });
});
