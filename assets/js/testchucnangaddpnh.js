document.addEventListener("DOMContentLoaded", () => {
  loadPurchaseOrders();

  document.getElementById("from-date").addEventListener("change", loadPurchaseOrders);
  document.getElementById("to-date").addEventListener("change", loadPurchaseOrders);
});

async function loadPurchaseOrders() {
  try {
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    let url = "../assets/php/get_purchase_orders.php";

    if (fromDate && toDate) {
      url += `?from=${fromDate}&to=${toDate}`;
    }

    const response = await fetch(url);
    const text = await response.text();

    console.log("Backend trả về:", text);

    const result = JSON.parse(text);

    const tbody = document.getElementById("receipt-table-body");
    tbody.innerHTML = "";

    result.data.forEach(order => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.id}</td>
        <td>${Number(order.total_amount).toLocaleString('vi-VN')}</td>
        <td>${order.order_date}</td>
        <td>${order.product_count}</td>
        <td>
          <a href="ChiTietPhieuNhap.html?id=${order.id}">
            <button class="btn-view">Xem</button>
          </a>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Lỗi load phiếu nhập:", error);
  }
}