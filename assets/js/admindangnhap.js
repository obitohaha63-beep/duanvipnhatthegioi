document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const msg = document.getElementById('msg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    msg.textContent = '';
    msg.style.color = '#b00020';

    const email = username.value.trim();
    const pass = password.value.trim();

    if (!email || !pass) {
      msg.textContent = 'Vui lòng nhập đầy đủ email và mật khẩu.';
      return;
    }

    fetch('../assets/php/loginadmin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", // 🔥 QUAN TRỌNG
      body: JSON.stringify({
        email: email,
        password: pass,
        type: "admin" // 🔥 PHÂN BIỆT ADMIN
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '../pages/admin.php';
      } else {
        msg.textContent = data.message || 'Tài khoản hoặc mật khẩu không đúng.';
      }
    })
    .catch(error => {
      console.error(error);
      msg.textContent = 'Lỗi kết nối server.';
    });
  });
});