/**
 * File: product_list.js
 * Mục đích: Tải và hiển thị danh sách sản phẩm trên trang chính
 * 
 * Chức năng chính:
 *   1. Gọi API để lấy danh sách sản phẩm từ server
 *   2. Kiểm tra dữ liệu trả về
 *   3. Duyệt qua từng sản phẩm
 *   4. Tạo HTML động để hiển thị
 *   5. Xử lý lỗi nếu không thể tải sản phẩm
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    // ========== BƯỚC 1: LẤY PHẦN TỬ CONTAINER ==========
    // Container = nơi sẽ chứa các sản phẩm trên trang
    const productContainer = document.querySelector(".container-sanphambot");

    // 🔴 KIỂM TRA: Nếu container không tồn tại, dừng script
    if (!productContainer) {
        // File này được load nhiều trang, chỉ chạy khi có .container-sanphambot
        console.log("⚠️ Không tìm thấy .container-sanphambot - bỏ qua product_list.js");
        return;
    }

    // ========== BƯỚC 2: GỌI API ĐỂ LẤY DANH SÁCH SẢN PHẨM ==========
    fetch('../assets/php/get_products.php')
        .then(response => response.json())  // Chuyển dữ liệu sang JSON
        .then(apiData => {
            // ========== BƯỚC 3: KIỂM TRA KẾT QUẢ ==========
            // Nếu không thành công hoặc không có dữ liệu
            if (apiData.status !== "success" || !apiData.data || apiData.data.length === 0) {
                productContainer.innerHTML = "<p>❌ Không thể load sản phẩm hoặc chưa có sản phẩm</p>";
                return;
            }

            // Xóa nội dung cũ trước khi thêm sản phẩm mới
            productContainer.innerHTML = "";

            // ========== BƯỚC 4: DUYỆT QUA TỪNG SẢN PHẨM ==========
            // Dùng forEach để lặp qua mảng sản phẩm
            apiData.data.forEach(product => {
                // ========== BƯỚC 4.1: CHUẨN BỊ DỮ LIỆU ==========
                
                // Lấy biến thứ nhất (nếu có) để làm demo
                const firstVariant = product.variants && product.variants.length > 0 
                    ? product.variants[0] 
                    : null;

                // Trích xuất các thuộc tính nếu có (ví dụ: trọng lượng, style,...)
                const attributesData = {};
                if (firstVariant && firstVariant.attributes) {
                    firstVariant.attributes.forEach(attribute => {
                        const attrKey = attribute.attr_name
                            .toLowerCase()
                            .replace(/\s/g, "-");  // Chuyển thành chữ thường, gạch ngang
                        
                        const attrValue = attribute.option_value || 
                                        attribute.value_text || 
                                        "";
                        
                        attributesData[attrKey] = attrValue;
                    });
                }

                // ========== BƯỚC 4.2: TÍNH GIÁ BÁN ==========
                // Công thức: Giá bán = Giá vốn × (1 + tỷ lệ lợi nhuận %)
                const costPrice = parseFloat(product.cost_price);
                const profitPercent = parseFloat(product.profit_percent);
                const sellingPrice = (costPrice * (1 + profitPercent / 100))
                    .toLocaleString("vi-VN") + " ₫";  // Định dạng tiền Việt

                // ========== BƯỚC 4.3: CHUẨN BỊ NGÀY TẠO ==========
                // Chuyển ngày từ định dạng YYYY-MM-DD HH:MM:SS thành YYYY-MM-DD
                const createdDate = product.created_at 
                    ? new Date(product.created_at).toISOString().split('T')[0] 
                    : "N/A";

                // ========== BƯỚC 4.4: TẠO HTML ĐỘNG ==========
                // Tạo một div mới để chứa sản phẩm
                const productDiv = document.createElement("div");
                productDiv.classList.add("box");  // Thêm class CSS

                // Đặt nội dung HTML
                productDiv.innerHTML = `
                    <div class="container-anh">
                        <div class="sanpham"
                             data-brand="${product.category_name || 'Chưa phân loại'}"
                             data-price="${sellingPrice}"
                             data-weight="${attributesData['trọng-lượng'] || 'N/A'}"
                             data-balance="${attributesData['điểm-cân-bằng'] || 'N/A'}"
                             data-style="${attributesData['phong-cách-chơi'] || 'N/A'}"
                             data-level="${attributesData['trình-độ-chơi'] || 'N/A'}"
                             data-date="${createdDate}">
                            
                            <!-- Link tới chi tiết sản phẩm -->
                            <a href="SanPham.html?id=${product.id}">
                                <!-- Hình ảnh sản phẩm -->
                                <img class="anh-arcsaber" 
                                     src="${product.image_url || '../assets/img/default.png'}"
                                     alt="${product.name}">
                                
                                <!-- Tên sản phẩm -->
                                <span class="text-arcsaber" style="color: #1b1b1b; text-decoration: none;">
                                    ${product.name}
                                </span>
                                
                                <!-- Badge số màu -->
                                <span class="mausac-arsaber">+1 màu sắc</span>
                                
                                <!-- Giá bán -->
                                <span class="gia">${sellingPrice}</span>
                            </a>
                        </div>
                        
                        <!-- Nút mua ngay -->
                        <a href="login.html">
                            <button class="btn-buy">Mua ngay</button>
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
            productContainer.innerHTML = "<p>❌ Lỗi tải sản phẩm. Vui lòng tải lại trang.</p>";
        });
});



