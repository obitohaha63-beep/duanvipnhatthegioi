/**
 * File: register.js
 * Mục đích: Xử lý form đăng ký tài khoản mới
 * Chức năng chính:
 *   - Lấy dữ liệu từ form (tên, email, mật khẩu, địa chỉ, số điện thoại)
 *   - Kiểm tra dữ liệu hợp lệ
 *   - Gửi lên server để lưu vào database
 *   - Chuyển hướng tới trang login nếu thành công
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử form từ HTML
    const registerForm = document.getElementById("registerForm");
    
    // Nghe sự kiện submit form
    registerForm.addEventListener("submit", async function (event) {
        // event.preventDefault() ngăn form reload trang
        event.preventDefault();

        // ========== BƯỚC 1: LẤY DỮ LIỆU TỪ CÁC TRƯỜNG INPUT ==========
        const fullName = document.getElementById("fullname").value.trim();
        const userEmail = document.getElementById("email-register").value.trim();
        const userPassword = document.getElementById("password-register").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Lấy địa chỉ chi tiết
        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detailAddress = document.getElementById("detail_address").value.trim();
        const phoneNumber = document.getElementById("phone").value.trim();

        // ========== BƯỚC 2: KIỂM TRA DỮ LIỆU HỢP LỆ ==========
        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (userPassword !== confirmPassword) {
            alert("❌ Mật khẩu không khớp. Vui lòng kiểm tra lại!");
            return; // Dừng hàm không tiếp tục
        }

        // Kiểm tra tất cả trường bắt buộc đã điền
        if (!fullName || !userEmail || !userPassword || !city || !phoneNumber) {
            alert("❌ Vui lòng điền đầy đủ tất cả thông tin!");
            return;
        }

        // ========== BƯỚC 3: GỬI DỮ LIỆU LÊN SERVER ==========
        const serverResponse = await fetch("../assets/php/register.php", {
            method: "POST",                        // Phương thức POST = gửi dữ liệu
            headers: {
                "Content-Type": "application/json" // Định dạng JSON
            },
            body: JSON.stringify({                 // Chuyển data thành JSON string
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

        // ========== BƯỚC 4: XỬ LÝ KẾT QUẢ TỪ SERVER ==========
        const responseData = await serverResponse.json(); // Chuyển JSON thành object

        if (responseData.success) {
            alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
            // Chuyển hướng sang trang login
            window.location.href = "login.html";
        } else {
            // Hiển thị lỗi từ server
            alert("❌ Lỗi: " + responseData.message);
        }
    });
});