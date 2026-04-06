/**
 * File: order_success.js
 * Mục đích: Hiển thị chi tiết đơn hàng vừa đặt thành công
 * 
 * Chức năng chính:
 *   1. Lấy order_id từ localStorage (lưu sau khi đặt hàng)
 *   2. Gọi API lấy chi tiết đơn hàng
 *   3. Hiển thị thông tin khách hàng
 *   4. Hiển thị danh sách sản phẩm trong đơn
 *   5. Tính toán và hiển thị tổng tiền
 *   6. Hiển thị phương thức thanh toán
 */

/**
 * Hàm: Tải và hiển thị chi tiết đơn hàng
 * 
 * async/await = cách viết code bất đồng bộ sạch hơn
 */
async function loadOrderDetail() {
    // ========== BƯỚC 1: LẤY ORDER ID TỪ LOCALSTORAGE ==========
    // localStorage = bộ nhớ trình duyệt (tồn tại lâu hơn session)
    const orderId = localStorage.getItem("last_order_id");

    // Kiểm tra xem có order_id không
    if (!orderId) {
        alert("❌ Không tìm thấy mã đơn hàng!");
        return;
    }

    // ========== BƯỚC 2: HIỂN THỊ MÃ ĐƠN ==========
    document.getElementById("order-id").innerText = orderId;

    try {
        // ========== BƯỚC 3: GỌI API LẤY CHI TIẾT ĐƠN ==========
        const response = await fetch(`../assets/php/get_order_detail.php?id=${orderId}`);
        const orderData = await response.json();

        // Kiểm tra API có trả về thành công
        if (!orderData.success) {
            alert("❌ Lỗi: " + orderData.message);
            return;
        }

        const order = orderData.order;        // Thông tin đơn hàng
        const orderItems = orderData.items;   // Danh sách sản phẩm

        // ========== BƯỚC 4: HIỂN THỊ THÔNG TIN KHÁCH HÀNG ==========
        document.getElementById("customer-name").value = order.customer_name || "";
        document.getElementById("phone").value = order.phone || "";
        document.getElementById("address").value = order.delivery_address || "";

        // ========== BƯỚC 5: CHUYỂN PHƯƠNG THỨC THANH TOÁN THÀNH CHỮ ==========
        let paymentMethodText = "";
        
        switch (order.payment_method) {
            case "cash":
                paymentMethodText = "💵 Thanh toán khi nhận hàng";
                break;
            case "bank_transfer":
                paymentMethodText = "🏦 Chuyển khoản ngân hàng";
                break;
            case "online":
                paymentMethodText = "💳 Thanh toán online";
                break;
            default:
                paymentMethodText = order.payment_method;
        }

        document.getElementById("payment").value = paymentMethodText;

        // ========== BƯỚC 6: HIỂN THỊ DANH SÁCH SẢN PHẨM ==========
        const itemsContainer = document.getElementById("order-items");
        itemsContainer.innerHTML = "";  // Xóa nội dung cũ

        let totalAmount = 0;  // Biến tính tổng tiền

        // Duyệt qua từng sản phẩm
        orderItems.forEach(item => {
            // Tính tiền cho sản phẩm này
            const itemSubtotal = item.quantity * item.selling_price;
            totalAmount += itemSubtotal;  // Cộng vào tổng

            // Tạo hàng trong bảng
            const tableRow = `
                <tr>
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>${Number(item.selling_price).toLocaleString('vi-VN')}₫</td>
                    <td>${Number(itemSubtotal).toLocaleString('vi-VN')}₫</td>
                </tr>
            `;

            itemsContainer.innerHTML += tableRow;
        });

        // ========== BƯỚC 7: HIỂN THỊ TỔNG TIỀN ==========
        document.getElementById("total").innerText = 
            totalAmount.toLocaleString('vi-VN') + "₫";

    } catch (error) {
        console.error("Chi tiết lỗi:", error);
        alert("❌ Lỗi tải chi tiết đơn hàng. Vui lòng tải lại trang.");
    }
}

/**
 * ========== CHẠY NGAY KHI TRANG TẢI XONG ==========
 */
loadOrderDetail();