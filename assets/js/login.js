/**
 * File: login.js
 * Mục đích: Xử lý đăng nhập người dùng
 * Chức năng chính:
 *   - Lấy email và password từ form
 *   - Gửi dữ liệu lên server để kiểm tra
 *   - Lưu thông tin người dùng nếu đăng nhập thành công
 *   - Chuyển hướng về trang chính
 */

/**
 * Hàm: xử lý sự kiện gửi form đăng nhập
 * Tham số: e (event) - sự kiện submit form
 */
document.getElementById("loginForm").addEventListener("submit", function(event) {
    // event.preventDefault() ngăn chặn hành động mặc định của form (reload trang)
    event.preventDefault();

    // ========== BƯỚC 1: LẤY DỮ LIỆU TỪ FORM ==========
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput.value.trim();        // .trim() xóa khoảng trắng đầu/cuối
    const password = passwordInput.value.trim();

    // ========== BƯỚC 2: KIỂM TRA DỮ LIỆU CÓ HỢP LỆ ==========
    if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu");
        return;
    }

    // ========== BƯỚC 3: GỬI DỮ LIỆU LÊN SERVER ==========
    // fetch() là hàm gửi request tới server
    // method: "POST" = gửi dữ liệu
    // body: chứa email và password dưới dạng JSON
    fetch("../assets/php/loginadmin.php", {
        method: "POST",                           // Phương thức: POST (gửi dữ liệu)
        headers: {
            "Content-Type": "application/json"    // Định dạng dữ liệu: JSON
        },
        credentials: "include",                   // Giữ lại session/cookie
        body: JSON.stringify({                    // Chuyển object thành chuỗi JSON
            email: email,
            password: password
        })
    })
    // ========== BƯỚC 4: XỬ LỶ KẾT QUẢ ==========
    .then(response => response.json())             // Chuyển response thành object
    .then(responseData => {
        // Nếu đăng nhập thành công
        if (responseData.success) {
            alert("Đăng nhập thành công!");
            
            // Lưu thông tin user vào localStorage để dùng sau này
            localStorage.setItem("user", JSON.stringify(responseData.user));
            
            // Chuyển hướng tới trang chủ
            window.location.href = "../pages/haveaccount.php";
        } 
        // Nếu đăng nhập thất bại
        else {
            alert("Lỗi: " + responseData.message);
        }
    })
    // ========== BƯỚC 5: XỬ LÝ LỖI ==========
    .catch(error => {
        console.error("Chi tiết lỗi:", error);
        alert("Lỗi kết nối server. Vui lòng thử lại!");
    });
});