document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id");

  if (!orderId) {
    alert("Không tìm thấy đơn hàng");
    return;
  }

  loadOrderDetail(orderId);

  document.getElementById("updateStatusBtn").addEventListener("click", () => {
    updateStatus(orderId);
  });

  document.getElementById("statusSelect").addEventListener("change", checkStatusChange);
});

let currentStatus = "";

async function loadOrderDetail(orderId) {
  try {
    const response = await fetch(`../assets/php/get_order_detail.php?id=${orderId}`);
    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    const order = data.order;

    currentStatus = order.status;

    document.getElementById("madonhienthi").textContent =
      "DH" + String(order.id).padStart(3, "0");

    document.getElementById("customerName").value = order.customer_name;
    document.getElementById("orderDate").value = formatDate(order.order_date);
document.getElementById("address").value = order.full_address;
    document.getElementById("phone").value = order.phone;

    document.getElementById("statusSelect").value = order.status;

    setStatusOptions(order.status);

    const tbody = document.getElementById("orderItemsBody");
    tbody.innerHTML = "";

    let total = 0;

    data.items.forEach(item => {
      const thanhTien = item.quantity * item.selling_price;
      total += thanhTien;

      tbody.innerHTML += `
        <tr>
          <td>SP${String(item.product_id).padStart(3, "0")}</td>
          <td>${item.product_name}</td>
          <td>${item.quantity}</td>
          <td>${Number(item.selling_price).toLocaleString()}₫</td>
          <td>${Number(thanhTien).toLocaleString()}₫</td>
        </tr>
      `;
    });

    document.getElementById("totalAmount").textContent =
      Number(total).toLocaleString() + "₫";

    checkStatusChange();

  } catch (error) {
    console.error(error);
    alert("Lỗi tải chi tiết đơn hàng");
  }
}

function setStatusOptions(currentStatus) {
  const select = document.getElementById("statusSelect");
  const btn = document.getElementById("updateStatusBtn");

  Array.from(select.options).forEach(option => {
    option.disabled = false;
  });

  if (currentStatus === "pending") {
    select.querySelector('option[value="delivered"]').disabled = true;
  }

  if (currentStatus === "confirmed") {
    select.querySelector('option[value="pending"]').disabled = true;
    select.querySelector('option[value="cancelled"]').disabled = true;
  }

  if (currentStatus === "delivered" || currentStatus === "cancelled") {
    Array.from(select.options).forEach(option => {
      if (option.value !== currentStatus) {
        option.disabled = true;
      }
    });

    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  }

  select.value = currentStatus;
}

function checkStatusChange() {
  const select = document.getElementById("statusSelect");
  const btn = document.getElementById("updateStatusBtn");

  if (
    currentStatus === "delivered" ||
    currentStatus === "cancelled"
  ) {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
    return;
  }

  if (select.value === currentStatus) {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  } else {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  }
}

async function updateStatus(orderId) {
  const status = document.getElementById("statusSelect").value;

  try {
    const response = await fetch("../assets/php/update_order_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: orderId,
        status: status
      })
    });

    const result = await response.json();

    alert(result.message);

    if (result.success) {
      loadOrderDetail(orderId);
    }

  } catch (error) {
    console.error(error);
    alert("Lỗi cập nhật trạng thái");
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

function goBack() {
  window.location.href = "QuanLyDonHang.php";
}