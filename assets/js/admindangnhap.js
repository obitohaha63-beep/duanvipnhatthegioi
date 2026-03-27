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
      body: JSON.stringify({
        email: email,
        password: pass
      })
    })
    .then(response => response.text())
    .then(text => {
      console.log("Server response:", text);

      try {
        const data = JSON.parse(text);

        if (data.success) {
          window.location.href = '../pages/admin.html';
        } else {
          msg.textContent = data.message || 'Tài khoản hoặc mật khẩu không đúng.';
        }

      } catch (e) {
        msg.textContent = 'Server trả về dữ liệu lỗi.';
        console.error('JSON parse error:', e);
      }
    })
    .catch(error => {
      console.error(error);
      msg.textContent = 'Lỗi kết nối server.';
    });
  });
});