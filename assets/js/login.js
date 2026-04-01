document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("../assets/php/loginadmin.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include", // 🔥 BẮT BUỘC
    body: JSON.stringify({
        email: email,
        password: password
    })
})
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Đăng nhập thành công");

            // Lưu session phía client (optional)
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.success) {
    const user = data.user;

    if (user.role === "admin") {
        window.location.href = "../pages/admin.php";
    } else {
        window.location.href = "../pages/haveaccount.php";
    }
}

        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi kết nối server");
    });
});