
function loadCart() {

    fetch("../assets/php/get_cart.php")
        .then(response => response.json())
        .then(apiData => {

    if (!apiData.success) {
        console.error("Lỗi tải giỏ hàng:", apiData.message);
        return;
    }

    const cartListContainer = document.getElementById("cart-list");
    const cartItems = apiData.cart;

    const checkoutBtn = document.getElementById("checkout-btn");

    // ---- Validate: giỏ hàng trống ----
    if (cartItems.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerText = "Giỏ hàng trống";

        cartListContainer.innerHTML = `
            <div class="empty-cart-message" style="
                width: 100%;
                padding: 56px 24px;
                text-align: center;
                color: #666;
                font-size: 16px;
                font-family: inherit;
                background: #f9f9f9;
                border: 1.5px dashed #d0d0d0;
                border-radius: 10px;
                margin: 24px 0;
            ">
                <div style="font-size: 52px; margin-bottom: 14px;">🛒</div>
                <p style="margin: 0; font-weight: 600; color: #333; font-size: 17px;">
                    Giỏ hàng của bạn đang trống.
                </p>
                <p style="margin: 8px 0 0; color: #888; font-size: 14px;">
                    Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.
                </p>
                <a href="allsanpham1.php" style="
                    display: inline-block;
                    margin-top: 18px;
                    padding: 10px 24px;
                    background: #1a73e8;
                    color: #fff;
                    border-radius: 6px;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                ">Tiếp tục mua sắm</a>
            </div>
        `;
        // Cập nhật tổng tiền về 0
        document.querySelector(".total-price").innerText = "0₫";
        return;
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.innerText = "Thanh toán";
    }

    cartListContainer.innerHTML = "";


            let totalPrice = 0;



            cartItems.forEach(product => {

                const productPrice = product.price * product.quantity;
                totalPrice += productPrice;


                const productHTML = `
                    <div class="cart-item">
                        <!-- Hình ảnh sản phẩm -->
                        <div class="cart-img">
                            <img src="../${product.image_url}" alt="${product.name}">
                        </div>

                        <!-- Thông tin sản phẩm (tên, giá) -->
                        <div class="cart-info">
                            <h3>${product.name}</h3>
                            <p>${Number(product.price)
                                .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}₫</p>
                        </div>

                        <!-- Nút tăng/giảm số lượng -->
                        <div class="cart-stock-info" style="font-size:13px; color:#555; margin-bottom:6px;">
                            Tồn kho: <strong style="color:${product.stock > 0 ? '#27ae60' : '#e74c3c'}">${product.stock}</strong> sản phẩm
                        </div>
                        <div class="cart-quantity">
                            <button onclick="changeQuantity(${product.id}, ${product.quantity - 1}, ${product.stock})">
                                -
                            </button>
                            <span>${product.quantity}</span>
                            <button onclick="changeQuantity(${product.id}, ${product.quantity + 1}, ${product.stock})">
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


                cartListContainer.innerHTML += productHTML;
            });



            const totalPriceElement = document.querySelector(".total-price");
            totalPriceElement.innerText = totalPrice.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "₫";

        })
        .catch(error => {

            console.error("Lỗi kết nối server:", error);
            alert("Không thể tải giỏ hàng. Vui lòng tải lại trang.");
        });
}



// ---- Hiển thị lỗi validate số lượng inline ----
function showQuantityError(productId, message) {
    // Xóa lỗi cũ nếu có
    clearQuantityError(productId);

    const cartItems = document.querySelectorAll(".cart-item");
    let targetItem = null;
    cartItems.forEach(item => {
        // Tìm cart-item chứa nút với productId tương ứng
        if (item.innerHTML.includes(`changeQuantity(${productId},`)) {
            targetItem = item;
        }
    });

    if (targetItem) {
        const errorEl = document.createElement("div");
        errorEl.className = `qty-error-msg qty-error-${productId}`;
        errorEl.style.cssText = `
            color: #d93025;
            font-size: 12.5px;
            font-weight: 600;
            margin-top: 4px;
            padding: 4px 10px;
            background: #fce8e6;
            border-radius: 4px;
            display: inline-block;
        `;
        errorEl.textContent = message;

        // Chèn sau div.cart-quantity
        const qtyDiv = targetItem.querySelector(".cart-quantity");
        if (qtyDiv) {
            qtyDiv.parentNode.insertBefore(errorEl, qtyDiv.nextSibling);
        }

        // Tự ẩn sau 3 giây
        setTimeout(() => clearQuantityError(productId), 3000);
    }
}

function clearQuantityError(productId) {
    document.querySelectorAll(`.qty-error-${productId}`).forEach(el => el.remove());
}

// ---- Validate và cập nhật số lượng sản phẩm ----
function changeQuantity(productId, newQuantity, stockLimit) {

    // Validate 1: số lượng phải là số nguyên
    if (!Number.isInteger(newQuantity) || isNaN(newQuantity)) {
        showQuantityError(productId, "Số lượng phải là số nguyên hợp lệ.");
        return;
    }

    // Validate 2: số lượng tối thiểu là 1
    if (newQuantity < 1) {
        showQuantityError(productId, "Số lượng không thể nhỏ hơn 1. Hãy nhấn 'Xóa' để bỏ sản phẩm.");
        return;
    }

    // Validate 3: số lượng không vượt quá tồn kho
    if (stockLimit !== undefined && newQuantity > stockLimit) {
        showQuantityError(productId, `Số lượng tối đa có thể mua là ${stockLimit} sản phẩm (theo tồn kho).`);
        return;
    }

    // Xóa lỗi cũ khi số lượng hợp lệ
    clearQuantityError(productId);

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

        if (responseData.success) {

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



function removeProductFromCart(productId) {

    if (!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
        return;
    }


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

            loadCart();


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



function updateCartBadgeCount() {

    fetch("../assets/php/get_cart_count.php")
        .then(response => response.json())
        .then(responseData => {

            if (responseData.success) {

                const cartBadge = document.querySelector(".jscart");
                cartBadge.innerText = responseData.count;
            }
        })
        .catch(error => {
            console.error("Lỗi cập nhật badge:", error);
        });
}



loadCart();
updateCartBadgeCount();
