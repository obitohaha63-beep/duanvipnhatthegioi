/**
 * File: scrip.js
 * Mục đích: Xử lý form thêm danh mục mới
 * 
 * Chức năng chính:
 *   1. Lấy dữ liệu từ form (tên danh mục)
 *   2. Gửi lên server bằng FormData
 *   3. Xử lý phản hồi từ server
 *   4. Chuyển hướng về trang danh mục nếu thành công
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    // ========== BƯỚC 1: LẤY PHẦN TỬ FORM ==========
    const addCategoryForm = document.getElementById("addCate");

    // ========== BƯỚC 2: NGHE SỰ KIỆN SUBMIT FORM ==========
    addCategoryForm.addEventListener("submit", async (event) => {
        // Ngăn chặn hành động mặc định (reload trang)
        event.preventDefault();

        // ========== BƯỚC 3: CHUẨN BỊ DỮ LIỆU ==========
        // FormData = dùng để gửi dữ liệu form (kể cả file)
        const formDataToSend = new FormData(addCategoryForm);

        try {
            // ========== BƯỚC 4: GỬI DỮ LIỆU LÊN SERVER ==========
            const serverResponse = await fetch("add_category.php", {
                method: "POST",        // Phương thức POST
                body: formDataToSend   // Dữ liệu form
            });

            // ========== BƯỚC 5: CHUYỂN RESPONSE THÀNH JSON ==========
            const responseData = await serverResponse.json();

            // ========== BƯỚC 6: XỬ LÝ KẾT QUẢ ==========
            if (responseData.success) {
                // ✅ THÀNH CÔNG
                alert("✅ Thêm danh mục thành công!");
                
                // Xóa dữ liệu trong form (reset)
                addCategoryForm.reset();
                
                // Chuyển hướng về trang danh mục
                window.location.href = "DanhMuc.php";
            } else {
                // ❌ THẤT BẠI - Hiển thị lỗi từ server
                alert("❌ Lỗi: " + responseData.message);
            }
        } catch (error) {
            // ========== BƯỚC 7: XỬ LÝ LỖI KẾT NỐI ==========
            console.error("Chi tiết lỗi:", error);
            alert("❌ Có lỗi xảy ra khi gửi dữ liệu! Vui lòng thử lại.");
        }
    });
});