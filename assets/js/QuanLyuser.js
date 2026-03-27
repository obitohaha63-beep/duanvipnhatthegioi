document.addEventListener('DOMContentLoaded', function () {
    loadUsers();
});

// Load danh sách user
function loadUsers() {
    fetch('../assets/php/get_users.php')
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById('user-table');
            userTable.innerHTML = '';

            data.forEach(user => {
                renderRow(user, userTable);
            });
        })
        .catch(error => console.error('Load users error:', error));
}

// Render từng dòng user
function renderRow(user, userTable) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td id="status-${user.id}">
            ${user.status === 'active' ? 'Đang hoạt động' : 'Đã bị khóa'}
        </td>
        <td id="action-${user.id}">
            <button onclick="resetPassword(${user.id})">Reset Mật Khẩu</button>
            ${
                user.status === 'active'
                ? `<button onclick="changeStatus(${user.id}, 'locked')">Khóa Tài Khoản</button>`
                : `<button onclick="changeStatus(${user.id}, 'active')">Mở Tài Khoản</button>`
            }
        </td>
    `;

    userTable.appendChild(row);
}

// Đổi trạng thái user
function changeStatus(userId, newStatus) {
    fetch('../assets/php/update_user_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const statusElement = document.getElementById(`status-${userId}`);
            statusElement.textContent =
                newStatus === 'active' ? 'Đang hoạt động' : 'Đã bị khóa';

            const actionCell = document.getElementById(`action-${userId}`);
            actionCell.innerHTML = `
                <button onclick="resetPassword(${userId})">Reset Mật Khẩu</button>
                ${
                    newStatus === 'active'
                    ? `<button onclick="changeStatus(${userId}, 'locked')">Khóa Tài Khoản</button>`
                    : `<button onclick="changeStatus(${userId}, 'active')">Mở Tài Khoản</button>`
                }
            `;
        }
    })
    .catch(error => console.error('Change status error:', error));
}

// Reset password
function resetPassword(userId) {
    if (!confirm("Bạn có chắc muốn reset mật khẩu user này?")) return;

    fetch("../assets/php/reset_password.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => response.text())
    .then(text => {
        console.log("Server response:", text);

        try {
            const data = JSON.parse(text);

            if (data.success) {
                alert(data.message);
                loadUsers();
            } else {
                alert(data.message);
            }

        } catch (e) {
            console.error("JSON lỗi:", e);
            alert("Server trả về dữ liệu lỗi");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Lỗi kết nối server");
    });
}