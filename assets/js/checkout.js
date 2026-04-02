async function loadCheckout() {
  const res = await fetch("../assets/php/get_cart.php");
  const data = await res.json();

  if (!data.success) return;

  const container = document.getElementById("checkout-items");
  container.innerHTML = "";

  let total = 0;

  data.cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <p>
        <strong>${item.name}</strong><br>
        x${item.quantity} - ${Number(item.price).toLocaleString()}₫
      </p>
    `;
  });

  document.getElementById("subtotal").innerText =
    total.toLocaleString() + "₫";

  document.getElementById("total").innerText =
    total.toLocaleString() + "₫";
}

async function placeOrder() {
  const address = document.querySelector("input[placeholder='Tên đường, tòa nhà, số nhà.']").value;

  const payment = document.querySelector("input[name='payment']:checked")
    .nextSibling.textContent.includes("ngân hàng")
    ? "bank_transfer"
    : "cash";

  const res = await fetch("../assets/php/place_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      address,
      payment_method: payment
    })
  });

  const data = await res.json();

  if (data.success) {
    alert("Đặt hàng thành công!");
    window.location.href = "choxacnhan.html";
  } else {
    alert(data.message);
  }
}

loadCheckout();
// load thông tin user
async function loadUser() {
  const res = await fetch("../assets/php/get_users.php");
  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("API lỗi:", text);
    return;
  }

  if (!data.success) return;

  document.getElementById("fullname").value = data.user.name;
  document.getElementById("phone").value = data.user.phone;
  document.getElementById("default-address").innerText =
    data.user.default_address || "Chưa có địa chỉ";
}

loadUser();
loadCheckout();