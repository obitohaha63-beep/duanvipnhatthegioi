async function loadOrderDetail() {
  const orderId = localStorage.getItem("last_order_id");

  if (!orderId) {
    alert("Không tìm thấy đơn hàng");
    return;
  }

  // hiển thị mã đơn
  document.getElementById("order-id").innerText = orderId;

  try {
    const res = await fetch(`../assets/php/get_order_detail.php?id=${orderId}`);
    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    const order = data.order;
    const items = data.items;

    // ===== USER INFO =====
    document.getElementById("customer-name").value = order.customer_name || "";
    document.getElementById("phone").value = order.phone || "";
    document.getElementById("address").value = order.delivery_address || "";

    // format payment
    let paymentText = "";
    if (order.payment_method === "cash") {
      paymentText = "Thanh toán khi nhận hàng";
    } else if (order.payment_method === "bank_transfer") {
      paymentText = "Chuyển khoản";
    } else {
      paymentText = "Thanh toán online";
    }

    document.getElementById("payment").value = paymentText;

    // ===== ITEMS =====
    const container = document.getElementById("order-items");
    container.innerHTML = "";

    let total = 0;

    items.forEach(item => {
      const subtotal = item.quantity * item.selling_price;
      total += subtotal;

      container.innerHTML += `
        <tr>
          <td>${item.product_name}</td>
          <td>${item.quantity}</td>
          <td>${Number(item.selling_price).toLocaleString()}₫</td>
          <td>${Number(subtotal).toLocaleString()}₫</td>
        </tr>
      `;
    });

    // ===== TOTAL =====
    document.getElementById("total").innerText =
      total.toLocaleString() + "₫";

  } catch (err) {
    console.error(err);
    alert("Lỗi tải đơn hàng");
  }
}

// chạy khi load trang
loadOrderDetail();