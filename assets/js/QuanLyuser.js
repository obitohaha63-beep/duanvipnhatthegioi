/**
 * File: QuanLyuser.js
 * Mục đích: Quản lý danh sách người dùng và admin
 * 
 * Chức năng chính:
 *   1. Tải danh sách tất cả user và admin từ server
 *   2. Phân tách user và admin vào 2 bảng khác nhau
 *   3. Cho phép khóa/mở tài khoản
 *   4. Cho phép reset mật khẩu
 *   5. Cập nhật trạng thái lên giao diện
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener('DOMContentLoaded', function () {
    // Tải danh sách user khi trang vừa load
    loadUserList();
});

/**
 * Hàm: Tải danh sách người dùng từ server
 * 
 * Ý tưởng:
 *   1. Gọi API lấy tất cả user/admin
 *   2. Phân tách thành 2 nhóm: admin vs user thường
 *   3. Hiển thị trên 2 bảng riêng biệt
 */
function loadUserList() {
    // ========== BƯỚC 1: GỌI API ==========
    fetch('../assets/php/get_users_admin.php')
        .then(response => response.json())
        .then(userList => {
            // ========== BƯỚC 2: LẤY THAM CHIẾU ĐẾN 2 BẢNG ==========
            const userTableBody = document.getElementById('user-table');
            const adminTableBody = document.getElementById('admin-table');

            // Xóa dữ liệu cũ
            userTableBody.innerHTML = '';
            adminTableBody.innerHTML = '';

            // ========== BƯỚC 3: DUYỆT QUA TỪNG NGƯỜI DÙNG ==========
            userList.forEach(user => {
                // Phân chia vào bảng admin hoặc user
                if (user.role === 'admin') {
                    renderUserRow(user, adminTableBody);
                } else {
                    renderUserRow(user, userTableBody);
                }
            });
        })
        .catch(error => {
            console.error('Lỗi tải danh sách user:', error);
            alert("❌ Không thể tải danh sách người dùng!");
        });
}

/**
 * Hàm: Tạo một hàng (row) trong bảng cho một người dùng
 * 
 * Tham số:
 *   - user: object chứa thông tin user
 *   - tableElement: bảng HTML để thêm hàng vào
 */
function renderUserRow(user, tableElement) {
    // ========== BƯỚC 1: TẠO PHẦN TỬ HÀNG ==========
    const tableRow = document.createElement('tr');

    // ========== BƯỚC 2: CHUẨN BỊ NÚT HÀNH ĐỘNG ==========
    // Nút Khóa/Mở tài khoản (phụ thuộc vào trạng thái hiện tại)
    const statusButtonHTML = user.status === 'active'
        ? `<button onclick="changeUserStatus(${user.id}, 'locked')" class="btn-lock">
             🔒 Khóa Tài Khoản
           </button>`
        : `<button onclick="changeUserStatus(${user.id}, 'active')" class="btn-unlock">
             🔓 Mở Tài Khoản
           </button>`;

    // ========== BƯỚC 3: ĐỌC NỘI DUNG HTML CHO HÀNG ==========
    tableRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td id="status-${user.id}">
            ${user.status === 'active' ? '✅ Đang hoạt động' : '❌ Đã bị khóa'}
        </td>
        <td id="action-${user.id}">
            <button onclick="resetUserPassword(${user.id})" class="btn-reset">
                🔑 Reset Mật Khẩu
            </button>
            ${statusButtonHTML}
        </td>
    `;

    // ========== BƯỚC 4: THÊM HÀNG VÀO BẢNG ==========
    tableElement.appendChild(tableRow);
}

/**
 * Hàm: Thay đổi trạng thái tài khoản (active ↔ locked)
 * 
 * Tham số:
 *   - userId: ID của user cần thay đổi
 *   - newStatus: trạng thái mới (active hoặc locked)
 */
function changeUserStatus(userId, newStatus) {
    // ========== BƯỚC 1: GỬI REQUEST LÊN SERVER ==========
    fetch('../assets/php/update_user_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            newStatus: newStatus
        })
    })
    .then(response => response.json())
    .then(updateResult => {
        // ========== BƯỚC 2: KIỂM TRA KẾT QUẢ ==========
        if (updateResult.success) {
            alert("✅ " + updateResult.message);
            // Tải lại danh sách để cập nhật giao diện
            loadUserList();
        } else {
            alert("❌ Lỗi: " + updateResult.message);
        }
    })
    .catch(error => {
        console.error('Lỗi thay đổi trạng thái:', error);
        alert("❌ Lỗi kết nối server!");
    });
}

/**
 * Hàm: Reset mật khẩu của người dùng
 * 
 * Tham số:
 *   - userId: ID của user cần reset mật khẩu
 * 
 * Lưu ý:
 *   - Parse response text thay vì JSON trực tiếp
 *   - Vì server có thể trả lỗi không phải JSON
 */
function resetUserPassword(userId) {
    // ========== BƯỚC 1: HỎI XÁC NHẬN ==========
    if (!confirm("⚠️ Bạn có chắc muốn reset mật khẩu của user này?")) {
        return;  // Người dùng bấm Hủy
    }

    // ========== BƯỚC 2: GỬI REQUEST RESET ==========
    fetch("../assets/php/reset_password.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => response.text())  // Lấy dữ liệu dưới dạng text trước
    .then(responseText => {
        // ========== BƯỚC 3: PARSE JSON ==========
        console.log("Phản hồi từ server:", responseText);

        try {
            const resetResult = JSON.parse(responseText);

            // ========== BƯỚC 4: HIỂN THỊ KẾT QUẢ ==========
            if (resetResult.success) {
                alert("✅ " + resetResult.message);
                loadUserList();  // Tải lại danh sách
            } else {
                alert("❌ Lỗi: " + resetResult.message);
            }

        } catch (parseError) {
            console.error("Lỗi Parse JSON:", parseError);
            alert("❌ Lỗi: Server trả về dữ liệu không hợp lệ");
        }
    })
    .catch(error => {
        console.error("Lỗi mạng:", error);
        alert("❌ Lỗi kết nối server!");
    });
}