// Hàm tải dữ liệu giỏ hàng từ server
function loadCart() {
  fetch("../assets/php/get_cart.php")
    .then(res => res.json())
    .then(data => {
      // Nếu API trả về mảng thất bại thì dừng hàm
      if (!data.success) return; 

      const cartList = document.getElementById("cart-list");
      cartList.innerHTML = ""; // Xóa dữ liệu cũ trước khi tải dữ liệu mới

      let total = 0; // Biến lưu tổng tiền

      // Duyệt qua từng sản phẩm trong giỏ hàng
      data.cart.forEach(item => {
        // Cộng dồn tiền: giá * số lượng
        total += item.price * item.quantity;

        // Render giao diện HTML cho từng sản phẩm (đã bỏ màu và size)
        cartList.innerHTML += `
          <div class="cart-item">
            <div class="cart-img">
              <img src="../${item.image_url}" alt="${item.name}">
            </div>

            <div class="cart-info">
              <h3>${item.name}</h3>
              <p>${Number(item.price).toLocaleString("vi-VN")}₫</p>
            </div>

            <div class="cart-quantity">
              <button onclick="changeQty(${item.id}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>

            <div class="cart-remove">
              <button onclick="deleteItem(${item.id})">Xóa</button>
            </div>
          </div>
        `;
      });

      // Hiển thị tổng tiền ra màn hình
      document.querySelector(".total-price").innerText = total.toLocaleString("vi-VN") + "₫";
    });
}

// Hàm tăng/giảm số lượng sản phẩm
function changeQty(cart_id, quantity) {
  // Không cho phép số lượng nhỏ hơn 1
  if (quantity < 1) return;

  fetch("../assets/php/update_cart.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart_id, quantity })
  })
  .then(res => res.json())
  .then(() => loadCart()); // Tải lại giỏ hàng sau khi cập nhật thành công
}

// Hàm xóa sản phẩm khỏi giỏ
function deleteItem(cart_id) {
  fetch("../assets/php/delete_cart.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart_id })
  })
  .then(res => res.json())
  .then(() => {
    loadCart();      // Cập nhật lại danh sách giỏ hàng
    loadCartCount(); // Cập nhật lại số lượng badge trên icon giỏ hàng
  });
}

// Hàm đếm tổng số loại sản phẩm trong giỏ (hiển thị ở icon giỏ hàng)
function loadCartCount() {
  fetch("../assets/php/get_cart_count.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.querySelector(".jscart").innerText = data.count;
      }
    });
}

// Gọi hàm ngay khi file JS được load
loadCart();
loadCartCount();