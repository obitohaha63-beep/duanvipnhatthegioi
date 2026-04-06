/**
 * File: get_product.js
 * Mục đích: Tải và hiển thị danh sách sản phẩm phía dưới trang chính
 * (Giống product_list.js nhưng có thêm lưu trữ thuộc tính để filter)
 * 
 * Chức năng chính:
 *   1. Gọi API lấy danh sách sản phẩm
 *   2. Trích xuất thuộc tính sản phẩm (trọng lượng, cân bằng, style,...)
 *   3. Tính giá bán từ giá vốn + lợi nhuận
 *   4. Tạo HTML và thêm data attributes để filter
 *   5. Xử lý lỗi nếu tải không được
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    // ========== BƯỚC 1: LẤY CONTAINER CHỨA SẢN PHẨM ==========
    const productContainer = document.querySelector(".container-sanphambot");

    // ========== BƯỚC 2: GỌI API ĐỂ LẤY DANH SÁCH SẢN PHẨM ==========
    fetch('../assets/php/get_products.php')
        .then(response => response.json())
        .then(apiResponse => {
            // ========== BƯỚC 3: KIỂM TRA KẾT QUẢ ==========
            // Kiểm tra status có phải "success" không
            if (apiResponse.status !== "success" || !apiResponse.data) {
                productContainer.innerHTML = "<p>❌ Không thể tải sản phẩm</p>";
                return;
            }

            // Xóa nội dung cũ
            productContainer.innerHTML = "";

            // ========== BƯỚC 4: DUYỆT QUA TỪNG SẢN PHẨM ==========
            apiResponse.data.forEach(product => {
                // ========== BƯỚC 4.1: TRÍCH XUẤT THUỘC TÍNH ==========
                
                // Lấy biến đầu tiên (nếu có)
                const firstVariant = product.variants && product.variants[0] 
                    ? product.variants[0] 
                    : null;

                // Lưu trữ thuộc tính trong object để dùng filter sau
                const attributesMap = {};

                if (firstVariant && firstVariant.attributes) {
                    firstVariant.attributes.forEach(attribute => {
                        // Chuyển tên thuộc tính thành key (chữ thường, gạch ngang)
                        const attrKey = attribute.attr_name
                            .toLowerCase()
                            .replace(/\s/g, "-");
                        
                        // Lấy giá trị (có thể là option_value hoặc value_text)
                        const attrValue = attribute.option_value || 
                                        attribute.value_text || 
                                        "";
                        
                        attributesMap[attrKey] = attrValue;
                    });
                }

                // ========== BƯỚC 4.2: TÍNH GIÁ BÁN ==========
                // Công thức: Giá bán = Giá vốn × (1 + Lợi nhuận %)
                const costPrice = parseFloat(product.cost_price) || 0;
                const profitPercent = parseFloat(product.profit_percent) || 0;
                const sellingPrice = (costPrice * (1 + profitPercent / 100))
                    .toLocaleString("vi-VN") + " ₫";

                // ========== BƯỚC 4.3: CHUẨN BỊ NGÀY TẠO ==========
                // Chuyển YYYY-MM-DD HH:MM:SS thành YYYY-MM-DD
                const createdDate = product.created_at 
                    ? new Date(product.created_at).toISOString().split('T')[0] 
                    : "";

                // ========== BƯỚC 4.4: TẠO PHẦN TỬ HTML ==========
                const productDiv = document.createElement("div");
                productDiv.classList.add("box");

                productDiv.innerHTML = `
                    <div class="container-anh">
                        <!-- Data attributes để dùng cho filter / tìm kiếm -->
                        <div class="sanpham"
                             data-brand="${product.category_name || ''}"
                             data-price="${sellingPrice}"
                             data-weight="${attributesMap['trọng-lượng'] || ''}"
                             data-balance="${attributesMap['điểm-cân-bằng'] || ''}"
                             data-style="${attributesMap['phong-cách-chơi'] || ''}"
                             data-level="${attributesMap['trình-độ-chơi'] || ''}"
                             data-date="${createdDate}">
                            
                            <!-- Link tới chi tiết sản phẩm -->
                            <a href="SanPham.html?id=${product.id}">
                                <!-- Hình ảnh -->
                                <img class="anh-arcsaber" 
                                     src="${product.image_url || '../assets/img/default.png'}"
                                     alt="${product.name}">
                                
                                <!-- Tên sản phẩm -->
                                <span class="text-arcsaber" style="color: #1b1b1b; text-decoration: none;">
                                    ${product.name}
                                </span>
                                
                                <!-- Badge màu sắc -->
                                <span class="mausac-arsaber">+1 màu sắc</span>
                                
                                <!-- Giá bán -->
                                <span class="gia">${sellingPrice}</span>
                            </a>
                        </div>
                        
                        <!-- Nút mua ngay (hiện tại link tới login) -->
                        <a href="login.html">
                            <button>Mua ngay</button>
                        </a>
                    </div>
                `;

                // Thêm sản phẩm vào container
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            // ========== BƯỚC 5: XỬ LÝ LỖI ==========
            console.error("Chi tiết lỗi:", error);
            productContainer.innerHTML = "<p>❌ Lỗi kính load sản phẩm. Vui lòng tải lại trang.</p>";
        });
});