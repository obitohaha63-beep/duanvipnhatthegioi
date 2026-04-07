
/**
 * VALIDATION - ĐĂNG KÝ ACCOUNTS
 * Sử dụng hệ thống validation inline từ validation.js
 */

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    // ============================================
    // 1. CẤU HÌNH CÁC TRƯỜNG CẦN VALIDATE
    // ============================================
    const fieldConfigs = {
        name: 'fullname',           // Họ tên
        email: 'email',             // Email
        password: 'password',       // Mật khẩu
        confirm_password: 'confirmPassword',  // Xác nhận mật khẩu
        city: 'required',           // Thành phố
        district: 'required',       // Quận
        ward: 'required',           // Phường
        detail_address: 'address',  // Chi tiết địa chỉ
        phone: 'phone'              // Số điện thoại
    };

    // ============================================
    // 2. THIẾT LẬP VALIDATION THỜI GIAN THỰC
    // ============================================
    // Validate ngay khi người dùng thoát/gõ trong trường
    setupRealtimeValidation(registerForm, fieldConfigs);

    // ============================================
    // 3. XỬ LÝ SUBMIT FORM
    // ============================================
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Validate toàn bộ form trước khi submit
        if (!validateForm(registerForm, fieldConfigs)) {
            // Nếu có lỗi, hiển thị thông báo
            alert("❌ Vui lòng kiểm tra lại các thông tin!");
            return;
        }

        // Lấy dữ liệu từ form
        const fullName = document.getElementById("fullname").value.trim();
        const userEmail = document.getElementById("email-register").value.trim();
        const userPassword = document.getElementById("password-register").value;
        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detailAddress = document.getElementById("detail_address").value.trim();
        const phoneNumber = document.getElementById("phone").value.trim();

        // ============================================
        // 4. GỬI DỮ LIỆU ĐẾN SERVER
        // ============================================
        try {
            const serverResponse = await fetch("../assets/php/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: fullName,
                    email: userEmail,
                    password: userPassword,
                    city: city,
                    district: district,
                    ward: ward,
                    detail_address: detailAddress,
                    phone: phoneNumber
                })
            });

            const responseData = await serverResponse.json();

            if (responseData.success) {
                alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
                window.location.href = "login.html";
            } else {
                alert("❌ Lỗi: " + responseData.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("❌ Lỗi kết nối server. Vui lòng thử lại!");
        }
    });
});