/**
 * File: cart.js
 * Mục đích: Quản lý giỏ hàng (Shopping Cart)
 * 
 * Chức năng chính:
 *   1. Tải danh sách sản phẩm trong giỏ từ server
 *   2. Hiển thị sản phẩm trên giao diện
 *   3. Cho phép thay đổi số lượng (tăng/giảm)
 *   4. Cho phép xóa sản phẩm
 *   5. Tính toán và hiển thị tổng tiền
 *   6. Cập nhật số lượng badge trên icon giỏ
 */

/**
 * Hàm: Tải dữ liệu giỏ hàng từ server
 * 
 * Quá trình:
 *   1. Gửi request đến server để lấy danh sách giỏ
 *   2. Xóa HTML cũ trước khi thêm dữ liệu mới
 *   3. Duyệt qua từng sản phẩm và tạo HTML
 *   4. Tính toán tổng tiền
 *   5. Cập nhật giao diện
 */
function loadCart() {
    // Gọi API để lấy danh sách giỏ hàng
    fetch("../assets/php/get_cart.php")
        .then(response => response.json())  // Chuyển dữ liệu sang JSON
        .then(apiData => {
            // ========== BƯỚC 1: KIỂM TRA KẾT QUẢ ==========
            // Nếu API trả về thất bại, dừng hàm
            if (!apiData.success) {
                console.error("Lỗi tải giỏ hàng:", apiData.message);
                return;
            }

            // ========== BƯỚC 2: LẤY PHẦN TỬ HTML ==========
            const cartListContainer = document.getElementById("cart-list");
            const cartItems = apiData.cart; // Mảng chứa các sản phẩm trong giỏ

            // Xóa nội dung cũ (HTML từ lần tải trước)
            cartListContainer.innerHTML = "";

            // ========== BƯỚC 3: TÍNH TỔNG TIỀN ==========
            let totalPrice = 0; // Biến lưu tổng tiền (khởi tạo = 0)

            // ========== BƯỚC 4: DUYỆT QUA TỪNG SẢN PHẨM ==========
            // forEach() = vòng lặp qua từng phần tử trong mảng
            cartItems.forEach(product => {
                // Tính tiền cho sản phẩm này (giá × số lượng)
                const productPrice = product.price * product.quantity;
                totalPrice += productPrice; // Cộng vào tổng

                // ========== BƯỚC 5: TẠO HTML CHO SẢN PHẨM ==========
                const productHTML = `
                    <div class="cart-item">
                        <!-- Hình ảnh sản phẩm -->
                        <div class="cart-img">
                            <img src="../${product.image_url}" alt="${product.name}">
                        </div>

                        <!-- Thông tin sản phẩm (tên, giá) -->
                        <div class="cart-info">
                            <h3>${product.name}</h3>
                            <p>${Number(product.price).toLocaleString("vi-VN")}₫</p>
                        </div>

                        <!-- Nút tăng/giảm số lượng -->
                        <div class="cart-quantity">
                            <button onclick="changeQuantity(${product.id}, ${product.quantity - 1})">
                                -
                            </button>
                            <span>${product.quantity}</span>
                            <button onclick="changeQuantity(${product.id}, ${product.quantity + 1})">
                                +
                            </button>
                        </div>

                        <!-- Nút xóa sản phẩm -->
                        <div class="cart-remove">
                            <button onclick="removeProductFromCart(${product.id})">
                                Xóa
                            </button>
                        </div>
                    </div>
                `;

                // Thêm HTML của sản phẩm vào container
                cartListContainer.innerHTML += productHTML;
            });

            // ========== BƯỚC 6: HIỂN THỊ TỔNG TIỀN ==========
            // Tìm phần tử chứa tổng tiền và cập nhật giá trị
            const totalPriceElement = document.querySelector(".total-price");
            totalPriceElement.innerText = totalPrice.toLocaleString("vi-VN") + "₫";

        })
        .catch(error => {
            // Xử lý lỗi nếu gọi API không thành công
            console.error("Lỗi kết nối server:", error);
            alert("Không thể tải giỏ hàng. Vui lòng tải lại trang.");
        });
}

/**
 * Hàm: Thay đổi số lượng sản phẩm (tăng/giảm)
 * 
 * Tham số:
 *   - productId: ID của sản phẩm cần thay đổi
 *   - newQuantity: số lượng mới
 * 
 * Ý tưởng:
 *   - Kiểm tra số lượng không được < 1
 *   - Gửi request lên server
 *   - Tải lại giỏ hàng để cập nhật giao diện
 */
function changeQuantity(productId, newQuantity) {
    // Không cho phép số lượng nhỏ hơn 1
    if (newQuantity < 1) {
        alert("Số lượng không thể nhỏ hơn 1");
        return;
    }

    // Gửi request lên server để cập nhật
    fetch("../assets/php/update_cart.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart_id: productId,
            quantity: newQuantity
        })
    })
    .then(response => response.json())
    .then(responseData => {
        // Nếu cập nhật thành công
        if (responseData.success) {
            // Tải lại giỏ hàng để cập nhật giao diện
            loadCart();
        } else {
            alert("Lỗi cập nhật: " + responseData.message);
        }
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
    });
}

/**
 * Hàm: Xóa sản phẩm khỏi giỏ hàng
 * 
 * Tham số:
 *   - productId: ID của sản phẩm cần xóa
 * 
 * Ý tưởng:
 *   - Gửi request xóa lên server
 *   - Tải lại giỏ hàng
 *   - Cập nhật số lượng badge (icon giỏ)
 */
function removeProductFromCart(productId) {
    // Hỏi xác nhận trước khi xóa
    if (!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
        return; // Người dùng bấm "Hủy"
    }

    // Gửi request xóa lên server
    fetch("../assets/php/delete_cart.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart_id: productId
        })
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.success) {
            // Tải lại giỏ hàng sau khi xóa thành công
            loadCart();
            
            // Cập nhật số lượng trên icon giỏ hàng
            updateCartBadgeCount();
        } else {
            alert("Lỗi xóa sản phẩm: " + responseData.message);
        }
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
    });
}

/**
 * Hàm: Cập nhật số lượng badge ở icon giỏ hàng
 * 
 * Ý tưởng:
 *   - Gọi API để lấy tổng số lượng sản phẩm
 *   - Cập nhật số này lên giao diện (badge)
 */
function updateCartBadgeCount() {
    // Gọi API để lấy tổng số lượng sản phẩm trong giỏ
    fetch("../assets/php/get_cart_count.php")
        .then(response => response.json())
        .then(responseData => {
            // Nếu lấy dữ liệu thành công
            if (responseData.success) {
                // Tìm phần tử badge giỏ hàng và cập nhật số lượng
                const cartBadge = document.querySelector(".jscart");
                cartBadge.innerText = responseData.count;
            }
        })
        .catch(error => {
            console.error("Lỗi cập nhật badge:", error);
        });
}

/**
 * ========== CHẠY CÁC HÀM KHI FILE TẢI XONG ==========
 * Khi file JS load, ta cần tải dữ liệu từ server
 */
loadCart();              // Tải danh sách sản phẩm trong giỏ
updateCartBadgeCount();  // Tải số lượng badge