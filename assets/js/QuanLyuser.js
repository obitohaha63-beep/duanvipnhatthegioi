document.addEventListener('DOMContentLoaded', function () {
    loadUsers();
});

// Hàm load danh sách user
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
        .catch(error => console.error('Error:', error));
}

// Hàm render từng dòng
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
            <button class="reset-password">Reset Mật Khẩu</button>
            ${
                user.status === 'active'
                ? `<button onclick="changeStatus(${user.id}, 'locked')">Khóa Tài Khoản</button>`
                : `<button onclick="changeStatus(${user.id}, 'active')">Mở Tài Khoản</button>`
            }
        </td>
    `;

    userTable.appendChild(row);
}

// Hàm đổi trạng thái
function changeStatus(userId, newStatus) {
    fetch('../assets/php/update_user_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {

            // Cập nhật text trạng thái
            const statusElement = document.getElementById(`status-${userId}`);
            statusElement.textContent =
                newStatus === 'active' ? 'Đang hoạt động' : 'Đã bị khóa';

            // 🔥 QUAN TRỌNG: render lại nút
            const actionCell = document.getElementById(`action-${userId}`);
            actionCell.innerHTML = `
                <button class="reset-password">Reset Mật Khẩu</button>
                ${
                    newStatus === 'active'
                    ? `<button onclick="changeStatus(${userId}, 'locked')">Khóa Tài Khoản</button>`
                    : `<button onclick="changeStatus(${userId}, 'active')">Mở Tài Khoản</button>`
                }
            `;
        }
    })
    .catch(error => console.error('Error:', error));
}