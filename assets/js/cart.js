
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

    if (cartItems.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerText = "Giỏ hàng trống";
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



function changeQuantity(productId, newQuantity) {

    if (newQuantity < 1) {
        alert("Số lượng không thể nhỏ hơn 1");
        return;
    }


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
