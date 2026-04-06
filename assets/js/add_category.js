
// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    // ========== BƯỚC 1: LẤY PHẦN TỬ FORM ==========
    const addCategoryForm = document.getElementById("addCate");

    // ========== BƯỚC 2: NGHE SỰ KIỆN SUBMIT ==========
    addCategoryForm.addEventListener("submit", (event) => {
        // Ngăn chặn hành động reload trang mặc định của form
        event.preventDefault();

        // ========== BƯỚC 3: CẢP HÁT DỮ LIỆU ==========
        // FormData = lấy tất cả input trong form
        const formDataToSend = new FormData(addCategoryForm);

        // ========== BƯỚC 4: GỬI DỮ LIỆU LÊN SERVER ==========
        fetch("../assets/php/add_category.php", {
            method: "POST",
            body: formDataToSend
        })
        // ========== BƯỚC 5: XỬ LÝ KẾT QUẢ ==========
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                // ✅ THÀNH CÔNG
                alert("✅ " + responseData.message);
                
                // Xóa dữ liệu trong form
                addCategoryForm.reset();
            } else {
                // ❌ THẤT BẠI
                alert("❌ Lỗi: " + responseData.message);
            }
        })
        // ========== BƯỚC 6: XỬ LÝ LỖI ==========
        .catch(error => {
            console.error("Chi tiết lỗi:", error);
            alert("❌ Lỗi kết nối server. Vui lòng thử lại!");
        });
    });
});