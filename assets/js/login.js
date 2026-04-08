

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    //  CẤU HÌNH CÁC TRƯỜNG CẦN VALIDATE
    const fieldConfigs = {
        email: 'email',         
        password: 'password'    
    };

  
    //  THIẾT LẬP VALIDATION THỜI GIAN THỰC


    setupRealtimeValidation(loginForm, fieldConfigs);

// XỬ LÝ SUBMIT FORM

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate toàn bộ form trước khi submit
        if (!validateForm(loginForm, fieldConfigs)) {
            alert(" Vui lòng kiểm tra lại các thông tin!");
            return;
        }

        // Lấy dữ liệu từ form
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        fetch("../assets/php/loginadmin.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.success) {
                    alert(" Đăng nhập thành công!");
                    localStorage.setItem("user", JSON.stringify(responseData.user));
                    window.location.href = "../pages/haveaccount.php";
                } else {
                    alert(" Lỗi: " + responseData.message);
                }
            })
            .catch(error => {
                console.error("Lỗi chi tiết:", error);
                alert(" Lỗi kết nối server. Vui lòng thử lại!");
            });
    });
});