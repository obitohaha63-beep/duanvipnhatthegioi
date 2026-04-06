/**
 * File: product_detail.js
 * Mục đích: Xử lý trang chi tiết sản phẩm
 * 
 * Chức năng chính:
 *   1. Lấy ID sản phẩm từ URL
 *   2. Tải dữ liệu sản phẩm từ server
 *   3. Hiển thị thông tin chi tiết (ảnh, giá, mô tả)
 *   4. Quản lý tăng/giảm số lượng
 *   5. Xử lý thêm vào giỏ hàng
 *   6. Kiểm tra trạng thái login (guest vs user)
 */

/**
 * ========== BƯỚC 1: LẤY ID SẢN PHẨM TỪ URL ==========
 * 
 * URL dạng: product.html?id=123
 * URLSearchParams = công cụ để lấy parameters từ URL
 */

// Kiểm tra loại người dùng (guest hoặc user)
const userMode = document.body.dataset.mode;

// Lấy URL hiện tại
const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get("id");  // Lấy tham số "id"

// Kiểm tra ID sản phẩm có tồn tại không
if (!productId) {
    alert("❌ Lỗi: Không tìm thấy mã sản phẩm!");
}

/**
 * ========== BƯỚC 2: TẢI THÔNG TIN SẢN PHẨM TỪ SERVER ==========
 */
fetch(`../assets/php/get_product_detail.php?id=${productId}`)
    .then(response => response.json())
    .then(apiData => {
        // Kiểm tra API trả về thành công
        if (!apiData.success) {
            document.querySelector(".bigcontent").innerHTML = 
                "<h2>❌ Không tìm thấy sản phẩm</h2>";
            return;
        }

        const product = apiData.product;

        // ========== BƯỚC 3: HIỂN THỊ BREADCRUMB (ĐƯỜNG DẪN) ==========
        // Breadcrumb giúp người dùng biết vị trí trong trang web
        const breadcrumbHTML = `
            <a href="../pages/haveaccount.html" style="color: #1b1b1b;">Trang chủ</a> /
            <a href="../pages/timkiemyonex1.php" style="color: #1b1b1b;">
                ${product.category_name}
            </a> /
            ${product.name}
        `;
        document.querySelector(".linkedline-content").innerHTML = breadcrumbHTML;

        // ========== BƯỚC 4: CHUẨN BỊ NÚT HÀNH ĐỘNG CÓ ĐIỀU KIỆN ==========
        // Nếu là guest → hiển thị nút đăng nhập
        // Nếu là user → hiển thị nút thêm vào giỏ
        let actionButtonHTML = "";

        if (userMode === "guest") {
            // Cho khách → link tới trang login
            actionButtonHTML = `
                <a href="login.html">
                    <div class="add-Gio-Hang">
                        <p>Đăng nhập <br> Để sử dụng chức năng giỏ hàng</p>
                    </div>
                </a>
            `;
        } else if (userMode === "user") {
            // Cho người dùng đã login → hiển thị nút hành động
            actionButtonHTML = `
                <div class="add-Gio-Hang" id="addToCartBtn">
                    <p>Thêm vào giỏ hàng</p>
                </div>
                <div class="communicate-with-us-on-zalo">
                    <p>Mua hàng</p>
                </div>
            `;
        }

        // ========== BƯỚC 5: TẠO HTML CHI TIẾT SẢN PHẨM ==========
        const productHTML = `
            <!-- PHầN ẢNH SẢN PHẨM -->
            <div class="product">
                <img src="../${product.image_url || 'assets/img/placeholder.png'}?t=${Date.now()}" 
                     alt="${product.name}">
            </div>

            <!-- PHầN THÔNG TIN VÀ GIÁ -->
            <div class="aboutproduct">
                <!-- Tên sản phẩm -->
                <p class="racket-name">${product.name}</p>
                
                <!-- Thương hiệu và loại -->
                <pre class="trademark1">
Thương hiệu: <a href="#">${product.brand}</a> | 
Loại: <a href="#">${product.category_name}</a>
                </pre>
                
                <!-- ID sản phẩm -->
                <pre class="trademark1">ID sản phẩm: <a href="#">${product.id}</a></pre>
                
                <!-- GIÁ BÁN -->
                <p class="value">${Number(product.selling_price)
                    .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})} đ
                </p>

                <!-- PHẦN TĂNG/GIẢM SỐ LƯỢNG VÀ NÚTCTION -->
                <div class="half-content">
                    <hr>
                    
                    <!-- Tăng/giảm số lượng -->
                    <div class="countamountofitem" style="margin-top: 20px;">
                        <button class="minus">−</button>
                        <span class="numbercount">1</span>
                        <button class="plus">+</button>
                    </div>
                    
                    <!-- Nút hành động (login hoặc add to cart) -->
                    ${actionButtonHTML}
                </div>
            </div>

            <!-- PHầN MÔ TẢ SẢN PHẨM -->
            <div class="detail-of-items">
                ${product.description || "⚠️ Chưa có mô tả cho sản phẩm này."}
            </div>
        `;

        document.querySelector(".bigcontent").innerHTML = productHTML;
    })
    .catch(error => {
        console.error("Lỗi tải sản phẩm:", error);
        document.querySelector(".bigcontent").innerHTML = 
            "<h2>❌ Lỗi tải sản phẩm. Vui lòng tải lại trang.</h2>";
    });

/**
 * ========== BƯỚC 6: QUẢN LÝ CÁC SỰ KIỆN CLICK ==========
 * 
 * Dùng event delegation = gắn event vào parent, sau đó kiểm tra target
 * Cách này hiệu quả hơn vì HTML được tạo động
 */
document.addEventListener("click", function(event) {
    // ========== TĂNG/GIẢM SỐ LƯỢNG ==========
    const quantityValueElement = document.querySelector(".numbercount");
    
    if (quantityValueElement) {
        let currentQuantity = parseInt(quantityValueElement.innerText);

        // Nút "+" → Tăng số lượng
        if (event.target.classList.contains("plus")) {
            quantityValueElement.innerText = currentQuantity + 1;
        }

        // Nút "-" → Giảm số lượng (không cho <= 0)
        if (event.target.classList.contains("minus") && currentQuantity > 1) {
            quantityValueElement.innerText = currentQuantity - 1;
        }
    }

    // ========== THÊM VÀO GIỎ HÀNG ==========
    if (event.target.closest("#addToCartBtn")) {
        // Lấy số lượng người dùng chọn
        const selectedQuantity = parseInt(
            document.querySelector(".numbercount").innerText
        );

        // Gửi request lên server
        fetch("../assets/php/add_to_cart.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: selectedQuantity
            })
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                alert("✅ Đã thêm vào giỏ hàng!");
                updateCartBadgeCount(); // Cập nhật số lượng badge
            } else {
                alert("❌ Lỗi: " + responseData.message);
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert("❌ Lỗi kết nối server. Vui lòng thử lại.");
        });
    }
});

/**
 * ========== BƯỚC 7: CẬP NHẬT BADGE GIỎ HÀNG ==========
 * 
 * Badge = số lượng hiển thị ở icon giỏ hàng (góc màn hình)
 */
function updateCartBadgeCount() {
    fetch("../assets/php/get_cart_count.php")
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                // Tìm phần tử badge và cập nhật
                document.querySelector(".jscart").innerText = responseData.count;
            }
        })
        .catch(error => {
            console.error("Lỗi cập nhật badge:", error);
        });
}

/**
 * ========== CHẠY KHI TRANG TẢI XONG ==========
 */
updateCartBadgeCount();