



document.addEventListener('DOMContentLoaded', function () {
    
    loadUserList();
});



function loadUserList() {
    
    fetch('../assets/php/get_users_admin.php')
        .then(response => response.json())
        .then(userList => {
            
            const userTableBody = document.getElementById('user-table');
            const adminTableBody = document.getElementById('admin-table');

            
            userTableBody.innerHTML = '';
            adminTableBody.innerHTML = '';

            
            userList.forEach(user => {
                
                if (user.role === 'admin') {
                    renderUserRow(user, adminTableBody);
                } else {
                    renderUserRow(user, userTableBody);
                }
            });
        })
        .catch(error => {
            console.error('Lỗi tải danh sách user:', error);
            alert(" Không thể tải danh sách người dùng!");
        });
}



function renderUserRow(user, tableElement) {
    
    const tableRow = document.createElement('tr');

    
    
    const statusButtonHTML = user.status === 'active'
        ? `<button onclick="changeUserStatus(${user.id}, 'locked')" class="btn-lock">
              Khóa Tài Khoản
           </button>`
        : `<button onclick="changeUserStatus(${user.id}, 'active')" class="btn-unlock">
             🔓 Mở Tài Khoản
           </button>`;

    
    tableRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td id="status-${user.id}">
            ${user.status === 'active' ? ' Đang hoạt động' : ' Đã bị khóa'}
        </td>
        <td id="action-${user.id}">
            <button onclick="resetUserPassword(${user.id})" class="btn-reset">
                 Reset Mật Khẩu
            </button>
            ${statusButtonHTML}
        </td>
    `;

    
    tableElement.appendChild(tableRow);
}



function changeUserStatus(userId, newStatus) {
    
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
        
        if (updateResult.success) {
            alert(" " + updateResult.message);
            
            loadUserList();
        } else {
            alert(" Lỗi: " + updateResult.message);
        }
    })
    .catch(error => {
        console.error('Lỗi thay đổi trạng thái:', error);
        alert(" Lỗi kết nối server!");
    });
}



function resetUserPassword(userId) {
    
    if (!confirm("⚠️ Bạn có chắc muốn reset mật khẩu của user này?")) {
        return;  
    }

    
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
    .then(responseText => {
        
        console.log("Phản hồi từ server:", responseText);

        try {
            const resetResult = JSON.parse(responseText);

            
            if (resetResult.success) {
                alert(" " + resetResult.message);
                loadUserList();  
            } else {
                alert(" Lỗi: " + resetResult.message);
            }

        } catch (parseError) {
            console.error("Lỗi Parse JSON:", parseError);
            alert(" Lỗi: Server trả về dữ liệu không hợp lệ");
        }
    })
    .catch(error => {
        console.error("Lỗi mạng:", error);
        alert(" Lỗi kết nối server!");
    });
}