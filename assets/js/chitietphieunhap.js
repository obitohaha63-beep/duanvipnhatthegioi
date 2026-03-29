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
    document.getElementById("order-date").value = order.order_date.replace(" ", "T").slice(0, 16);

    const tbody = document.getElementById("product-table-body");
    tbody.innerHTML = "";

    let total = 0;

    items.forEach(item => {
      const qty = Number(item.quantity);
      const price = Number(item.import_price);
      const amount = qty * price;
      total += amount;

      const row = document.createElement("tr");
      row.dataset.productId = item.product_id;

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
    console.error(error);
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
  row.cells[4].innerText = (qty * price).toLocaleString("vi-VN");
}

function updateTotal() {
  let total = 0;

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    const amount = Number(row.cells[4].innerText.replace(/\./g, ""));
    total += amount;
  });

  document.getElementById("total-amount").value = total.toLocaleString("vi-VN");
}

async function completePurchaseOrder() {
  const order_date = document.getElementById("order-date").value;
  const items = [];

  document.querySelectorAll("#product-table-body tr").forEach(row => {
    items.push({
      product_id: Number(row.dataset.productId),
      quantity: Number(row.cells[1].innerText.trim()),
      import_price: Number(row.cells[2].innerText.trim())
    });
  });

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
    loadPurchaseOrder();
  }
}

function disableButtons() {
  ["edit-btn", "confirm-btn"].forEach(id => {
    const btn = document.getElementById(id);
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });
}

function disableEditing() {
  document.querySelectorAll("#product-table-body tr").forEach(row => {
    row.cells[1].contentEditable = false;
    row.cells[2].contentEditable = false;
  });

  document.getElementById("order-date").setAttribute("readonly", true);
}