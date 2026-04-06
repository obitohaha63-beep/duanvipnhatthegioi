
async function loadPendingOrders() {
    try {
        // ========== BƯỚC 1: GỌI API ==========
        // status=pending = lấy chỉ các đơn chờ xác nhận
        const response = await fetch('../assets/php/get_orders.php?status=pending');
        const orderData = await response.json();

        // ========== BƯỚC 2: KIỂM TRA KẾT QUẢ ==========
        if (orderData.success) {
            // Lấy tham chiếu đến tbody của bảng
            const tableBody = document.getElementById('orderTableBody');
            tableBody.innerHTML = "";  // Xóa dữ liệu cũ

            // ========== BƯỚC 3: DUYỆT QUA TỪNG ĐƠN HÀNG ==========
            orderData.orders.forEach(order => {
                // Format ID đơn hàng (ví dụ: HD001, HD002,...)
                const orderId = "HD" + String(order.id).padStart(3, '0');
                
                // Format ngày
                const formattedDate = formatOrderDate(order.order_date);
                
                // Format tiền
                const formattedMoney = formatCurrencyAmount(order.total_amount);

                // ========== BƯỚC 4: TẠO HÀNG TRONG BẢNG ==========
                const tableRow = `
                    <tr>
                        <td>${orderId}</td>
                        <td>${formattedDate}</td>
                        <td>${formattedMoney}</td>
                        <td>
                            <button class="btn-xem">
                                <!-- Link xem chi tiết đơn hàng -->
                                <a href="donhangcuaban.html?id=${order.id}" 
                                   style="color: white; text-decoration: none;">
                                    👁️ Xem
                                </a>
                            </button>
                        </td>
                    </tr>
                `;

                // Thêm hàng vào bảng
                tableBody.innerHTML += tableRow;
            });
        } else {
            // Nếu không có đơn hàng
            document.getElementById('orderTableBody').innerHTML = 
                `<tr><td colspan="4">Không có đơn hàng chờ xác nhận</td></tr>`;
        }

    } catch (error) {
        console.error("Lỗi tải danh sách đơn hàng:", error);
        alert("❌ Lỗi tải danh sách đơn hàng!");
    }
}

/**
 * Hàm: Format ngày theo định dạng Việt Nam
 * 
 * Ý tưởng:
 *   - Lấy chuỗi ngày từ server (ví dụ: 2024-12-25)
 *   - Chuyển thành object Date
 *   - Format thành "25/12/2024" (Việt Nam)
 * 
 * Tham số:
 *   - dateString: chuỗi ngày từ server
 * 
 * Trả về:
 *   - chuỗi ngày định dạng Việt Nam
 */
function formatOrderDate(dateString) {
    // Tạo object Date từ chuỗi
    const date = new Date(dateString);
    
    // toLocaleDateString = format ngày theo locale (khu vực)
    // 'vi-VN' = Việt Nam (định dạng: ngày/tháng/năm)
    return date.toLocaleDateString('vi-VN');
}

/**
 * Hàm: Format số tiền theo định dạng Việt Nam
 * 
 * Ý tưởng:
 *   - Chuyển số thành chuỗi với dấu phẩy (1000000 → 1,000,000)
 *   - Thêm ký hiệu ₫ (đồng)
 * 
 * Tham số:
 *   - amount: số tiền cần format
 * 
 * Trả về:
 *   - chuỗi tiền định dạng (ví dụ: "1,500,000₫")
 */
function formatCurrencyAmount(amount) {
    // toLocaleString() = format số theo locale
    // 'vi-VN' = định dạng Việt Nam
    return Number(amount).toLocaleString('vi-VN') + '₫';
}

/**
 * ========== CHẠY KHI TRANG TẢI XONG ==========
 * Tự động tải danh sách đơn hàng khi mở trang
 */
loadPendingOrders();
