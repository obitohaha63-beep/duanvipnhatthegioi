function loadCart() {
  fetch("../assets/php/get_cart.php")
    .then(res => res.json())
    .then(data => {

      if (!data.success) return;

      const cartList = document.getElementById("cart-list");
      cartList.innerHTML = "";

      let total = 0;

      data.cart.forEach(item => {

        total += item.price * item.quantity;

        cartList.innerHTML += `
          <div class="cart-item">
            <div class="cart-img">
              <img src="../${item.image_url}">
            </div>

            <div class="cart-info">
              <h3>${item.name}</h3>
              <p>Màu: ${item.color ?? ""}</p>
              <p>Size: ${item.size ?? ""}</p>
              <p>${Number(item.price).toLocaleString()}₫</p>
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

      document.querySelector(".total-price").innerText =
        total.toLocaleString() + "₫";
    });
}
// tăng giảm số lượng
function changeQty(cart_id, quantity) {
  if (quantity < 1) return;

  fetch("../assets/php/update_cart.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cart_id, quantity })
  })
  .then(res => res.json())
  .then(() => loadCart());
}
//xóa sản phẩm
function deleteItem(cart_id) {
  fetch("../assets/php/delete_cart.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cart_id })
  })
  .then(res => res.json())
  .then(() => loadCart());
}

loadCart();
function loadCartCount() {
  fetch("../assets/php/get_cart_count.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.querySelector(".jscart").innerText = data.count;
      }
    });
}
loadCartCount();