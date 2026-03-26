// Lấy dữ liệu giỏ hàng từ API
async function loadCart() {
  try {
    const response = await fetch("../assets/php/cart.php?action=get");
    const data = await response.json();

    if (data.success && data.cart && data.cart.length > 0) {
      displayCart(data.cart);
    } else {
      document.querySelector(".sanpham").innerHTML = "<p>Giỏ hàng của bạn trống</p>";
    }
  } catch (err) {
    console.error("Lỗi khi tải giỏ hàng:", err);
  }
}

// Hiển thị giỏ hàng
function displayCart(cartItems) {
  let cartHtml = `
    <div class="tieude">
      <h2>Giỏ hàng: 
      <span class="product-count">${cartItems.length} Sản phẩm </span></h2>
    </div>

    <div class="info">
      <div class="u1"><h4>Tên sản phẩm </h4></div>
      <div class="u3"><h4>Số lượng</h4></div>
      <div class="u4"><h4>Tổng</h4></div>
    </div>
  `;

  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    cartHtml += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="product-img">
        <div class="product-info">
          <p class="product-name">${item.name}</p>
          <h3>Giá: <span class="price">${Number(item.price).toLocaleString("vi-VN")}đ</span></h3>
        </div>
        <div class="product-actions">
          <div class="quantity">
            <button class="btn-dec" onclick="updateQuantity(${item.product_id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="btn-inc" onclick="updateQuantity(${item.product_id}, ${item.quantity + 1})">+</button>
          </div>
          <a href="#" onclick="removeFromCart(${item.product_id}); return false;" style="color: #1b1b1b; text-decoration: none">
            <div class="btn-xoa">
              <span class="text-xoa">Xóa</span>
            </div>
          </a>
        </div>
        <p class="total-price">${Number(itemTotal).toLocaleString("vi-VN")}₫</p>
      </div>
    `;
  });

  document.querySelector(".sanpham").innerHTML = cartHtml;
  updateOrderSummary(totalPrice, cartItems);
}

// Cập nhật tóm tắt đơn hàng
function updateOrderSummary(totalPrice, cartItems) {
  const freeShipping = totalPrice > 2000000;
  const shippingCost = freeShipping ? 0 : 50000;
  const finalTotal = totalPrice + shippingCost;

  const summaryHtml = `
    <div class="section-summary">
      <p><strong>Số lượng: </strong>${cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm</p>
      <p><strong>Tổng tiền hàng:</strong> ${Number(totalPrice).toLocaleString("vi-VN")}đ</p>
      <p><strong>Phí vận chuyển:</strong> ${freeShipping ? "Miễn phí" : Number(shippingCost).toLocaleString("vi-VN") + "đ"}</p>
      <p class="total"><strong>Tổng thanh toán: </strong>${Number(finalTotal).toLocaleString("vi-VN")}đ</p>
      <p><input type="checkbox"> Xuất hóa đơn</p>
      <h4>Ghi chú đơn hàng: </h4>
      <input type="text" placeholder="Nhập ghi chú">
      <div class="button-group">
        <a href="allsanpham1.html"><button class="btn-outline">Tiếp tục mua hàng</button></a>
        <a href="choxacnhan.html"><button class="btn-primary">Đặt hàng</button></a>
      </div>
    </div>
  `;

  document.querySelector(".thanhtoan").innerHTML = `<h2>Thông tin đơn hàng</h2><div class="input-group">${summaryHtml}</div>`;
}

// Cập nhật số lượng sản phẩm
async function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  try {
    const response = await fetch("../assets/php/cart.php?action=update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: newQuantity
      })
    });

    const data = await response.json();
    if (data.success) {
      loadCart();
    }
  } catch (err) {
    console.error("Lỗi khi cập nhật số lượng:", err);
  }
}

// Xóa sản phẩm khỏi giỏ
async function removeFromCart(productId) {
  if (!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    const response = await fetch("../assets/php/cart.php?action=remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: productId
      })
    });

    const data = await response.json();
    if (data.success) {
      alert("Xóa khỏi giỏ hàng thành công!");
      loadCart();
    }
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
  }
}

// Cập nhật số lượng giỏ ở header
function updateCartCount() {
  fetch("../assets/php/cart.php?action=get")
    .then(res => res.json())
    .then(data => {
      const cartCount = data.cart ? data.cart.length : 0;
      document.querySelector(".jscart").textContent = cartCount;
    })
    .catch(err => console.log(err));
}

// Tải giỏ hàng khi trang được mở
document.addEventListener("DOMContentLoaded", function() {
  loadCart();
  updateCartCount();
});
