/**
 * File: load_cart.js
 * Mục đích: Cập nhật số lượng sản phẩm trong giỏ hàng (hiển thị trên icon)
 * 
 * Chức năng chính:
 *   1. Gọi API để lấy tổng số lượng sản phẩm trong giỏ
 *   2. Hiển thị số này trên badge/icon giỏ hàng (góc màn hình)
 * 
 * Ví dụ:
 *   - Nếu có 3 sản phẩm trong giỏ, sẽ hiển thị "3" ở icon giỏ
 */

/**
 * Hàm: Tải và hiển thị số lượng sản phẩm trong giỏ
 * 
 * Quá trình:
 *   1. Gọi API lấy tổng số lượng
 *   2. Nếu thành công, cập nhật badge trên giao diện
 *   3. Badge này giúp người dùng biết có bao nhiêu sản phẩm trong giỏ
 */
function loadCartCount() {
    // ========== BƯỚC 1: GỌI API ==========
    // API này trả về tổng số lượng sản phẩm trong giỏ
    fetch("../assets/php/get_cart_count.php")
        // ========== BƯỚC 2: CHUYỂN DỮ LIỆU SANG JSON ==========
        .then(response => response.json())
        // ========== BƯỚC 3: XỬ LÝ KẾT QUẢ ==========
        .then(responseData => {
            // Kiểm tra API trả về thành công
            if (responseData.success) {
                // Tìm phần tử hiển thị badge (số lượng giỏ hàng)
                // Phần tử này thường là một <span> hoặc <div> với class "jscart"
                const cartBadgeElement = document.querySelector(".jscart");
                
                // Cập nhật số lượng
                cartBadgeElement.innerText = responseData.count;
            }
        })
        // ========== BƯỚC 4: XỬ LÝ LỖI ==========
        .catch(error => {
            console.error("Lỗi tải số lượng giỏ hàng:", error);
        });
}

/**
 * ========== CHẠY KHI FILE TẢI XONG ==========
 * Tự động tải số lượng giỏ hàng khi trang load
 */
loadCartCount();