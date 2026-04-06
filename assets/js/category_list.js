/**
 * File: category_list.js
 * Mục đích: Tải và hiển thị danh sách danh mục trên bảng (table)
 * 
 * Chức năng chính:
 *   1. Gọi API để lấy danh sách danh mục
 *   2. Duyệt qua từng danh mục
 *   3. Tạo hàng (row) trong bảng
 *   4. Hiển thị ID và tên danh mục
 *   5. Xử lý lỗi nếu không thể tải
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    // ========== BƯỚC 1: LẤY PHẦN TỬ TBODY CỦA BẢNG ==========
    // tbody = phần nội dung của bảng (các hàng dữ liệu)
    const tableBodyElement = document.getElementById("categoryTable");

    // ========== BƯỚC 2: GỌI API ĐỂ LẤY DANH MỤC ==========
    fetch("../assets/php/get_categories.php")
        .then(response => response.json())  // Chuyển dữ liệu sang JSON
        .then(apiData => {
            // ========== BƯỚC 3: KIỂM TRA THÀNH CÔN ==========
            if (apiData.success) {
                // Lấy mảng danh mục từ response
                const categoryList = apiData.data;
                
                // Xóa dữ liệu cũ trong bảng
                tableBodyElement.innerHTML = "";

                // ========== BƯỚC 4: DUYỆT QUA TỪNG DANH MỤC ==========
                categoryList.forEach(category => {
                    // Tạo một hàng (row) mới
                    const tableRow = document.createElement("tr");
                    
                    // Đặt nội dung HTML cho hàng
                    // <td> = ô (cell) trong bảng
                    tableRow.innerHTML = `
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                    `;
                    
                    // Thêm hàng vào bảng
                    tableBodyElement.appendChild(tableRow);
                });
            } 
            // Nếu API trả về thất bại
            else {
                tableBodyElement.innerHTML = `
                    <tr>
                        <td colspan="2" style="text-align: center; color: red;">
                            ❌ Lỗi: ${apiData.message}
                        </td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            // ========== BƯỚC 5: XỬ LÝ LỖI KẾT NỐI ==========
            console.error("Chi tiết lỗi:", error);
            tableBodyElement.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align: center; color: red;">
                        ❌ Lỗi kết nối server. Vui lòng tải lại trang!
                    </td>
                </tr>
            `;
        });
});