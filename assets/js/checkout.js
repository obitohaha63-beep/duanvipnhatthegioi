/**
 * File: checkout.js
 * Mục đích: Xử lý trang thanh toán
 * 
 * Chức năng chính:
 *   1. Tải thông tin user từ server
 *   2. Hiển thị các sản phẩm trong giỏ hàng
 *   3. Tính toán tổng tiền
 *   4. Quản lý lựa chọn địa chỉ (mặc định / mới)
 *   5. Quản lý phương thức thanh toán
 *   6. Xử lý đặt hàng
 */

/**
 * Hàm: Tải danh sách sản phẩm trong giỏ
 * 
 * Ý tưởng:
 *   - Gọi API để lấy giỏ hàng hiện tại
 *   - Duyệt qua từng sản phẩm
 *   - Tính tổng tiền
 *   - Hiển thị trên giao diện
 * 
 * async/await = cách viết code bất đồng bộ sạch hơn
 */
async function loadCheckout() {
    // Gửi request lấy giỏ hàng
    const response = await fetch("../assets/php/get_cart.php");
    const cartData = await response.json();

    // Kiểm tra thành công
    if (!cartData.success) {
        console.error("Lỗi tải giỏ hàng:", cartData.message);
        return;
    }

    // ========== BƯỚC 1: LẤY CONTAINER ==========
    const checkoutItemsContainer = document.getElementById("checkout-items");
    checkoutItemsContainer.innerHTML = ""; // Xóa dữ liệu cũ

    // ========== BƯỚC 2: TÍNH TỔNG VÀ HIỂN THỊ ==========
    let totalPrice = 0; // Biến lưu tổng tiền

    // Duyệt qua từng sản phẩm trong giỏ
    cartData.cart.forEach(product => {
        // Cộng dồn tiền: giá × số lượng
        totalPrice += product.price * product.quantity;

        // Tạo HTML để hiển thị sản phẩm
        const productHTML = `
            <p>
                <strong>${product.name}</strong><br>
                Số lượng: x${product.quantity} - ${Number(product.price).toLocaleString()}₫
            </p>
        `;

        checkoutItemsContainer.innerHTML += productHTML;
    });

    // ========== BƯỚC 3: HIỂN THỊ TỔNG TIỀN ==========
    const formattedTotal = totalPrice.toLocaleString() + "₫";
    
    document.getElementById("subtotal").innerText = formattedTotal;
    document.getElementById("total").innerText = formattedTotal;
}

/**
 * Hàm: Tải thông tin user (tên, số điện thoại, địa chỉ)
 * 
 * Ý tưởng:
 *   - Gọi API để lấy thông tin user
 *   - Điền thông tin vào form
 *   - Hiển thị địa chỉ mặc định
 */
async function loadUserInformation() {
    // Gửi request lấy thông tin user
    const response = await fetch("../assets/php/get_users.php");
    const responseText = await response.text(); // Lấy dữ liệu thô (text)

    // ========== BƯỚC 1: PARSE JSON ==========
    let userData;
    try {
        userData = JSON.parse(responseText); // Chuyển text thành object
    } catch (error) {
        // Nếu lỗi parser (dữ liệu không phải JSON)
        console.error("Lỗi: Response không phải định dạng JSON:", responseText);
        return;
    }

    // Kiểm tra API trả về thành công
    if (!userData.success) {
        console.error("Lỗi từ server:", userData.message);
        return;
    }

    // ========== BƯỚC 2: ĐIỀN THÔNG TIN VÀO FORM ==========
    const user = userData.user;
    
    // Tên người dùng
    document.getElementById("fullname").value = user.name || "";
    
    // Số điện thoại
    document.getElementById("phone").value = user.phone || "";
    
    // Địa chỉ mặc định (hoặc "Chưa có" nếu không có)
    document.getElementById("default-address").innerText = 
        user.default_address || "⚠️ Chưa cập nhật địa chỉ";
}

/**
 * Hàm: Xử lý đặt hàng
 * 
 * Ý tưởng:
 *   - Kiểm tra người dùng chọn địa chỉ nào (mặc định hay mới)
 *   - Lấy phương thức thanh toán
 *   - Kiểm tra dữ liệu hợp lệ
 *   - Gửi request đặt hàng lên server
 *   - Nếu thành công, chuyển sang trang order success
 */
async function placeOrder() {
    // ========== BƯỚC 1: KIỂM TRA ĐỊA CHỈ ==========
    // Lấy tất cả radio button dùng để chọn loại địa chỉ
    const addressTypeRadios = document.querySelectorAll('input[name="address_type"]');
    
    // Kiểm tra xem radio nào được chọn (mặc định hay mới)
    let selectedAddressType = null;
    addressTypeRadios.forEach(radio => {
        if (radio.checked) {
            selectedAddressType = radio.value;
        }
    });

    let shippingAddress = "";

    if (selectedAddressType === "default") {
        // Nếu chọn địa chỉ mặc định
        shippingAddress = document.getElementById("default-address").innerText;
    } else if (selectedAddressType === "new") {
        // Nếu chọn nhập địa chỉ mới
        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detailAddress = document.getElementById("detail_address").value.trim();

        // Ghép địa chỉ theo định dạng
        shippingAddress = `${detailAddress}, ${ward}, ${district}, ${city}`;

        // Kiểm tra không để trống
        if (!city || !district || !ward || !detailAddress) {
            alert("❌ Vui lòng điền đầy đủ các trường địa chỉ!");
            return;
        }
    }

    // ========== BƯỚC 2: KIỂM TRA PHƯƠNG THỨC THANH TOÁN ==========
    const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
    let selectedPaymentMethod = null;
    
    paymentMethodRadios.forEach(radio => {
        if (radio.checked) {
            selectedPaymentMethod = radio.value;
        }
    });

    if (!selectedPaymentMethod) {
        alert("❌ Vui lòng chọn phương thức thanh toán!");
        return;
    }

    // ========== BƯỚC 3: GỬI ĐẶTỴNG LÊN SERVER ==========
    const response = await fetch("../assets/php/place_order.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address: shippingAddress,
            payment_method: selectedPaymentMethod
        })
    });

    const orderResult = await response.json();

    // ========== BƯỚC 4: XỬ LÝ KẾT QUẢ ==========
    if (orderResult.success) {
        // Thành công - lưu order_id để dùng ở trang success
        localStorage.setItem("last_order_id", orderResult.order_id);
        
        alert("✅ Đặt hàng thành công!");
        
        // Chuyển sang trang xác nhận đặt hàng
        window.location.href = "dathangthanhcong.php";
    } else {
        // Thất bại
        alert("❌ Lỗi: " + orderResult.message);
    }
}

/**
 * ========== QUẢN LÝ HIỂN THỊ FORM ĐỊA CHỈ MỚI ==========
 * 
 * Ý tưởng:
 *   - Khi người dùng chọn "Địa chỉ mới", hiển thị form nhập
 *   - Khi người dùng chọn "Địa chỉ mặc định", ẩn form nhập
 */
function setupAddressToggle() {
    const addressRadios = document.querySelectorAll('input[name="address_type"]');
    const newAddressFormContainer = document.getElementById("new-address-form");

    // Duyệt qua từng radio button
    addressRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            // Nếu chọn "Địa chỉ mới" → hiển thị form
            if (radio.value === "new" && radio.checked) {
                newAddressFormContainer.style.display = "block";
            }
            // Nếu chọn "Địa chỉ mặc định" → ẩn form
            else if (radio.value === "default" && radio.checked) {
                newAddressFormContainer.style.display = "none";
            }
        });
    });
}

/**
 * ========== QUẢN LÝ HIỂN THỊ THÔNG TIN THANH TOÁN ==========
 * 
 * Ý tưởng:
 *   - Nếu chọn "Chuyển khoản ngân hàng" → hiển thị info ngân hàng
 *   - Nếu chọn "Thanh toán online" → hiển thị info online
 */
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    const bankInfoContainer = document.getElementById("bank-info");
    const onlineInfoContainer = document.getElementById("online-info");

    // Duyệt qua từng radio button
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            // Ẩn tất cả thông tin trước
            bankInfoContainer.style.display = "none";
            onlineInfoContainer.style.display = "none";

            // Hiển thị thông tin tương ứng
            if (radio.value === "bank_transfer" && radio.checked) {
                bankInfoContainer.style.display = "block";
            } else if (radio.value === "online" && radio.checked) {
                onlineInfoContainer.style.display = "block";
            }
        });
    });
}

/**
 * ========== CHẠY KHI TRANG TẢI XONG ==========
 * Gọi các hàm cần thiết khi trang được load
 */
loadUserInformation();      // Tải thông tin user
loadCheckout();             // Tải giỏ hàng
setupAddressToggle();       // Setup toggle địa chỉ
setupPaymentMethodToggle(); // Setup toggle thanh toán