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
  let address = "";

  const addressType = document.querySelector('input[name="address_type"]:checked').value;

  if (addressType === "default") {
    address = document.getElementById("default-address").innerText;
  } else {
    const city = document.getElementById("city").value;
    const district = document.getElementById("district").value;
    const ward = document.getElementById("ward").value;
    const detail = document.getElementById("detail_address").value;

    address = `${detail}, ${ward}, ${district}, ${city}`;
  }

  const payment = document.querySelector("input[name='payment_method']:checked").value;

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
    // lưu order_id để dùng ở trang success
    localStorage.setItem("last_order_id", data.order_id);

    window.location.href = "dathangthanhcong.php";
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

// ===== ADDRESS TOGGLE =====
const addressRadios = document.querySelectorAll('input[name="address_type"]');
const newAddressForm = document.getElementById("new-address-form");

addressRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "new" && radio.checked) {
      newAddressForm.style.display = "block";
    } else if (radio.value === "default" && radio.checked) {
      newAddressForm.style.display = "none";
    }
  });
});


// ===== PAYMENT TOGGLE =====
const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
const bankInfo = document.getElementById("bank-info");
const onlineInfo = document.getElementById("online-info");

paymentRadios.forEach(radio => {
  radio.addEventListener("change", () => {

    // reset
    bankInfo.style.display = "none";
    onlineInfo.style.display = "none";

    if (radio.value === "bank_transfer" && radio.checked) {
      bankInfo.style.display = "block";
    }

    if (radio.value === "online" && radio.checked) {
      onlineInfo.style.display = "block";
    }
  });
});