document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const msg = document.getElementById('msg');
  const toggle = document.getElementById('togglePwd');


  // Khi submit form
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';

    const u = username.value.trim();
    const p = password.value;

    if (!u || !p) {
      msg.textContent = 'Vui lòng điền đầy đủ tài khoản và mật khẩu.';
      return;
    }

    // kiểm tra giả lập
    if (u === 'admin' && p === '123456') {
      // chuyển trang ngay
      window.location.href = 'admin.html'; 
    } else {
      msg.style.color = '#b00020';
      msg.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
    }
  });
});
