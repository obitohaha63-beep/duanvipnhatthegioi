document.getElementById('form-add-user').addEventListener('submit', function(e) {
    e.preventDefault();

    const msgDiv = document.getElementById('response-msg');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        password: '123456'
    };


    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerText;
    btn.innerText = "Đang xử lý...";
    btn.disabled = true;

    fetch('../assets/php/add_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        msgDiv.style.display = 'block';
        if (data.success) {
            msgDiv.className = 'message success';
            msgDiv.innerText = "Thêm tài khoản thành công!";
            document.getElementById('form-add-user').reset();

            setTimeout(() => {
                window.location.href = '../pages/QuanLyuser.php';
            }, 1500);
        } else {
            msgDiv.className = 'message error';
            msgDiv.innerText = data.message || "Có lỗi xảy ra!";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        msgDiv.style.display = 'block';
        msgDiv.className = 'message error';
        msgDiv.innerText = "Lỗi kết nối máy chủ!";
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
});
