document.addEventListener("DOMContentLoaded", () => {
  loadPurchaseOrder();

  document.getElementById("edit-btn").addEventListener("click", enableEdit);
  document.getElementById("confirm-btn").addEventListener("click", completePurchaseOrder);
});

const orderId = new URLSearchParams(window.location.search).get("id");

async function loadPurchaseOrder() {
  try {
    const res = await fetch(`../assets/php/get_purchase_order_detail.php?id=${orderId}`);
    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    const order = result.order;
    const items = result.items;

    document.getElementById("order-id").value = order.id;

    // sửa format date
    document.getElementById("order-date").value = order.order_date.split(" ")[0];

    const tbody = document.getElementById("product-table-body");
    tbody.innerHTML = "";

    let total = 0;

    items.forEach(item => {
      const qty = Number(item.quantity);
      const price = Number(item.import_price);
      const amount = qty * price;

      total += amount;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.product_name}</td>
        <td>${qty}</td>
        <td>${price}</td>
        <td>${item.number_import_times}</td>
        <td>${amount.toLocaleString("vi-VN")}</td>
      `;

      tbody.appendChild(row);
    });

    document.getElementById("total-amount").value = total.toLocaleString("vi-VN");

    if (order.status === "completed") {
      disableButtons();
      disableEditing();
    }

  } catch (error) {
    console.error("Lỗi load chi tiết phiếu:", error);
  }
}

function enableEdit() {
  document.getElementById("order-date").removeAttribute("readonly");

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    row.cells[1].contentEditable = true;
    row.cells[2].contentEditable = true;


    row.addEventListener("input", () => {
      recalculateRow(row);
      updateTotal();
    });
  });
}

function recalculateRow(row) {
  const qty = Number(row.cells[1].innerText.trim()) || 0;
  const price = Number(row.cells[2].innerText.trim()) || 0;

  const amount = qty * price;

  row.cells[4].innerText = amount.toLocaleString("vi-VN");
}

function updateTotal() {
  let total = 0;

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    const amount = Number(row.cells[4].innerText.replace(/\./g, "").replace(/,/g, "")) || 0;
    total += amount;
  });

  document.getElementById("total-amount").value = total.toLocaleString("vi-VN");
}

async function completePurchaseOrder() {
  const order_date = document.getElementById("order-date").value;

  const items = [];

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    items.push({
      product_name: row.cells[0].innerText.trim(),
      quantity: Number(row.cells[1].innerText.trim()),
      import_price: Number(row.cells[2].innerText.trim())
    });
  });

  try {
    const res = await fetch("../assets/php/complete_purchase_order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: orderId,
        order_date,
        items
      })
    });

    const result = await res.json();

    alert(result.message);

    if (result.success) {
      disableButtons();
      disableEditing();
    }

  } catch (error) {
    console.error("Lỗi hoàn tất phiếu:", error);
  }
}

function disableButtons() {
  const editBtn = document.getElementById("edit-btn");
  const confirmBtn = document.getElementById("confirm-btn");

  editBtn.disabled = true;
  confirmBtn.disabled = true;

  editBtn.style.opacity = "0.5";
  confirmBtn.style.opacity = "0.5";

  editBtn.style.cursor = "not-allowed";
  confirmBtn.style.cursor = "not-allowed";
}

function disableEditing() {
  document.querySelectorAll("#product-table-body tr").forEach(row => {
    row.cells[1].contentEditable = false;
    row.cells[2].contentEditable = false;

    row.cells[1].style.background = "";
    row.cells[2].style.background = "";
  });

  document.getElementById("order-date").setAttribute("readonly", true);
}


async function completePurchaseOrder() {
  const order_date = document.getElementById("order-date").value;

  const items = [];

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    items.push({
      product_name: row.cells[0].innerText.trim(),
      quantity: Number(row.cells[1].innerText.trim()),
      import_price: Number(row.cells[2].innerText.trim())
    });
  });

  try {
    const res = await fetch("../assets/php/complete_purchase_order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: orderId,
        order_date,
        items
      })
    });

    const result = await res.json();

    alert(result.message);

    if (result.success) {
      disableButtons();
      disableEditing();
    }

  } catch (error) {
    console.error(error);
  }
}