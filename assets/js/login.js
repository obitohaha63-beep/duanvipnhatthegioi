




document.getElementById("loginForm").addEventListener("submit", function(event) {
    
    event.preventDefault();

    
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput.value.trim();        
    const password = passwordInput.value.trim();

    
    if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu");
        return;
    }

    
    
    
    
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
            alert("Đăng nhập thành công!");
            
            
            localStorage.setItem("user", JSON.stringify(responseData.user));
            
            
            window.location.href = "../pages/haveaccount.php";
        } 
        
        else {
            alert("Lỗi: " + responseData.message);
        }
    })
    
    .catch(error => {
        console.error("Chi tiết lỗi:", error);
        alert("Lỗi kết nối server. Vui lòng thử lại!");
    });
});