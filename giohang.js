document.addEventListener("DOMContentLoaded", () => {
  const cartTable = document.querySelector(".cart-table tbody");
  const totalElement = document.getElementById("cart-total");
  const summaryTotal = document.getElementById("summary-total");
  const summaryFinal = document.getElementById("summary-final");
  const summaryItems = document.getElementById("summary-items");

  // ================================
  // 1️⃣ CỘNG / TRỪ SỐ LƯỢNG
  // ================================
  window.changeQty = function (button, delta) {
    const input = button.parentElement.querySelector("input");
    let qty = parseInt(input.value);
    qty = Math.max(1, qty + delta);
    input.value = qty;

    updateRowTotal(button.closest("tr"));
    updateCartTotal();
  };

  function updateRowTotal(row) {
    const priceText = row.children[1].innerText;
    const price = parseInt(priceText.replace(/\D/g, ""), 10);
    const qty = parseInt(row.querySelector("input").value);
    const total = price * qty;
    row.querySelector(".total-item").innerText = formatCurrency(total);
  }

  // ================================
  // 2️⃣ CẬP NHẬT TỔNG GIỎ HÀNG
  // ================================
  function updateCartTotal() {
    let total = 0;
    const rows = cartTable.querySelectorAll("tr");
    let summaryText = [];

    rows.forEach((row) => {
      const name = row.children[0].innerText;
      const qty = parseInt(row.querySelector("input").value);
      const totalItem = parseInt(
        row.querySelector(".total-item").innerText.replace(/\D/g, ""),
        10
      );
      total += totalItem;
      summaryText.push(`${name} x${qty}`);
    });

    totalElement.innerText = formatCurrency(total);
    summaryTotal.innerText = formatCurrency(total);
    summaryFinal.innerText = formatCurrency(total);
    summaryItems.innerText = summaryText.join(", ");
  }

  function formatCurrency(num) {
    return num.toLocaleString("vi-VN") + "đ";
  }

  // ================================
  // 3️⃣ XÓA SẢN PHẨM
  // ================================
  cartTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) {
      e.target.closest("tr").remove();
      updateCartTotal();
    }
  });

  // ================================
  // 4️⃣ ĐỊA CHỈ GIAO HÀNG & THANH TOÁN
  // ================================
  const addressRadios = document.querySelectorAll('input[name="address-option"]');
  const savedAddress = document.querySelector(".saved-address");
  const newAddress = document.querySelector(".new-address");

  addressRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "new") {
        savedAddress.classList.add("hidden");
        newAddress.classList.remove("hidden");
      } else {
        savedAddress.classList.remove("hidden");
        newAddress.classList.add("hidden");
      }
    });
  });

  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const cardPayment = document.querySelector(".card-payment");

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "card") {
        cardPayment.classList.remove("hidden");
      } else {
        cardPayment.classList.add("hidden");
      }
    });
  });

  // ================================
  // 5️⃣ NÚT "TIẾP TỤC MUA HÀNG" & "XÁC NHẬN"
  // ================================
  document.querySelector(".btn-back").addEventListener("click", () => {
    window.location.href = "tatcasanpham.html"; // hoặc trang sản phẩm chính
  });

  document.querySelector(".btn-checkout").addEventListener("click", () => {
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại CoolNet ❤️");
  });

  // ================================
  // 6️⃣ KHỞI TẠO BAN ĐẦU
  // ================================
  updateCartTotal();
});
