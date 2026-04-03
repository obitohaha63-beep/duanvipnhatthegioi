document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email-register").value.trim();
        const password = document.getElementById("password-register").value;
        const confirm = document.getElementById("confirm-password").value;

        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detail_address = document.getElementById("detail_address").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (password !== confirm) {
            alert("Mật khẩu không khớp");
            return;
        }

        const res = await fetch("../assets/php/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                city,
                district,
                ward,
                detail_address,
                phone
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Đăng ký thành công");
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    });
});