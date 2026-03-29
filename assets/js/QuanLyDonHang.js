document.addEventListener("DOMContentLoaded", () => {
  loadOrders();

  document.getElementById("searchBtn").addEventListener("click", loadOrders);
});

async function loadOrders() {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const status = document.getElementById("statusFilter").value;

  let url = `../assets/php/get_orders.php?fromDate=${fromDate}&toDate=${toDate}&status=${status}`;

  const response = await fetch(url);
  const data = await response.json();

  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  if (!data.success || data.orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">Không có đơn hàng</td>
      </tr>
    `;
    return;
  }

  data.orders.forEach(order => {
    let statusText = "";
    switch(order.status) {
      case "pending":
        statusText = "Chưa xỷ lý";
        break;
      case "confirmed":
        statusText = "Xác nhận";
        break;
      case "delivered":
        statusText = "Đã giao thành công";
        break;
      case "cancelled":
        statusText = "Hủy đơn hàng";
        break;
    }

    const row = `
      <tr>
        <td>DH${String(order.id).padStart(3, "0")}</td>
        <td>${order.customer_name}</td>
        <td>${formatDate(order.order_date)}</td>
        <td>${Number(order.total_amount).toLocaleString()}₫</td>
        <td><span class="result-box">${statusText}</span></td>
        <td>
          <button onclick="xemchitiet(${order.id})">Xem</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

function xemchitiet(id) {
  window.location.href = `Chitietdonhang.html?id=${id}`;
}