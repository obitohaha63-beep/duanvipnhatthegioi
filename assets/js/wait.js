async function loadPendingOrders() {
  try {
    const response = await fetch("../assets/php/get_orders.php?status=pending");
    const orderData = await response.json();

    if (orderData.success) {
      const tableBody = document.getElementById("orderTableBody");
      tableBody.innerHTML = "";

      orderData.orders.forEach((order) => {
        const orderId = "HD" + String(order.id).padStart(3, "0");

        const formattedDate = formatOrderDate(order.order_date);

        const formattedMoney = formatCurrencyAmount(order.total_amount);

        const tableRow = `
                    <tr>
                        <td>${orderId}</td>
                        <td>${formattedDate}</td>
                        <td>${formattedMoney}</td>
                        <td>
                            <button class="btn-xem" data-order-id="${order.id}" type="button">
                Xem
            </button>
                        </td>
                    </tr>
                `;

        tableBody.innerHTML += tableRow;
      });
    } else {
      document.getElementById("orderTableBody").innerHTML =
        `<tr><td colspan="4">Không có đơn hàng chờ xác nhận</td></tr>`;
    }
  } catch (error) {
    console.error("Lỗi tải danh sách đơn hàng:", error);
    alert(" Lỗi tải danh sách đơn hàng!");
  }
}

function formatOrderDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("vi-VN");
}

function formatCurrencyAmount(amount) {
  return Number(amount).toLocaleString("vi-VN") + "₫";
}
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-xem')) {
        window.location.href = `../pages/donhangcuaban.php?id=${e.target.dataset.orderId}`;
    }
});
loadPendingOrders();
