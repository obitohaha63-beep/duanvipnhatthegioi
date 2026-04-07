



document.addEventListener("DOMContentLoaded", function () {
    
    const registerForm = document.getElementById("registerForm");
    
    
    registerForm.addEventListener("submit", async function (event) {
        
        event.preventDefault();

        
        const fullName = document.getElementById("fullname").value.trim();
        const userEmail = document.getElementById("email-register").value.trim();
        const userPassword = document.getElementById("password-register").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        
        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detailAddress = document.getElementById("detail_address").value.trim();
        const phoneNumber = document.getElementById("phone").value.trim();

        
        
        if (userPassword !== confirmPassword) {
            alert(" Mật khẩu không khớp. Vui lòng kiểm tra lại!");
            return; 
        }

        
        if (!fullName || !userEmail || !userPassword || !city || !phoneNumber) {
            alert(" Vui lòng điền đầy đủ tất cả thông tin!");
            return;
        }

        
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
            alert(" Đăng ký thành công! Vui lòng đăng nhập.");
            
            window.location.href = "login.html";
        } else {
            
            alert(" Lỗi: " + responseData.message);
        }
    });
});