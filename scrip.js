
document.addEventListener("DOMContentLoaded", function() {
  const danhMuc = document.querySelector(".khungxanhmucluc");
  const menuDropdown = document.querySelector(".khungtrangmenu-dropdown");

  danhMuc.addEventListener("click", function() {
    menuDropdown.style.display =
      menuDropdown.style.display === "block" ? "none" : "block";
  });
  
  // Ẩn menu khi click ra ngoài
  document.addEventListener("click", function(e) {
    if (!menuDropdown.contains(e.target) && !danhMuc.contains(e.target)) {
      menuDropdown.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(
    ".price, .brand, .weight, .balance, .style, .level"
  );
  const products = document.querySelectorAll(".sanpham");

  function filterProducts() {
    // Lấy danh sách tất cả filter được chọn
    const selected = {
      price: Array.from(document.querySelectorAll(".price:checked")).map(cb => cb.value),
      brand: Array.from(document.querySelectorAll(".brand:checked")).map(cb => cb.value),
      weight: Array.from(document.querySelectorAll(".weight:checked")).map(cb => cb.value),
      balance: Array.from(document.querySelectorAll(".balance:checked")).map(cb => cb.value),
      style: Array.from(document.querySelectorAll(".style:checked")).map(cb => cb.value),
      level: Array.from(document.querySelectorAll(".level:checked")).map(cb => cb.value)
    };

    products.forEach(product => {
      const box = product.closest(".box"); // lấy cả box bao ngoài

      const match =
        (selected.price.length === 0 || selected.price.includes(product.dataset.price)) &&
        (selected.brand.length === 0 || selected.brand.includes(product.dataset.brand)) &&
        (selected.weight.length === 0 || selected.weight.includes(product.dataset.weight)) &&
        (selected.balance.length === 0 || selected.balance.includes(product.dataset.balance)) &&
        (selected.style.length === 0 || selected.style.includes(product.dataset.style)) &&
        (selected.level.length === 0 || selected.level.includes(product.dataset.level));

      box.style.display = match ? "block" : "none";
    });
  }

  filters.forEach(filter => {
    filter.addEventListener("change", filterProducts);
  });
});

// ==== SẮP XẾP GIÁ ====
document.addEventListener("DOMContentLoaded", function() {
  const selectSort = document.getElementById("idsapxep");
  const container = document.querySelector(".container-sanphambot");

  // Hàm lấy giá tiền (vd: "1.590.000 ₫" => 1590000)
  function getPrice(element) {
    const text = element.querySelector(".gia").innerText;
    return parseInt(text.replace(/\D/g, ""), 10);
  }

  // Khi người dùng chọn sắp xếp
  selectSort.addEventListener("change", function() {
    const products = Array.from(container.querySelectorAll(".box"));
    const type = this.value;

    let sorted = [];

    if (type === "tangdan") {
      // Giá tăng dần
      sorted = products.sort((a, b) => getPrice(a) - getPrice(b));
    } 
    else if (type === "giamdan") {
      // Giá giảm dần
      sorted = products.sort((a, b) => getPrice(b) - getPrice(a));
    } 
    else if (type === "moinhat") {
      // Sản phẩm mới nhất
      sorted = products.sort((a, b) => {
        const dateA = new Date(a.querySelector(".sanpham").dataset.date);
        const dateB = new Date(b.querySelector(".sanpham").dataset.date);
        return dateB - dateA; // mới nhất lên trước
      });
    }

    // Cập nhật lại thứ tự hiển thị
    container.innerHTML = "";
    sorted.forEach(item => container.appendChild(item));
  });
});

// +- Thanh phần thanh toán
document.addEventListener("DOMContentLoaded", () => {
  const decBtn = document.querySelector(".btn-dec");
  const incBtn = document.querySelector(".btn-inc");
  const quantitySpan = document.querySelector(".quantity span");

  let quantity = parseInt(quantitySpan.textContent);

  incBtn.addEventListener("click", () => {
    quantity++;
    quantitySpan.textContent = quantity;
  });

  decBtn.addEventListener("click", () => {
    if (quantity > 1) { // không cho nhỏ hơn 1
      quantity--;
      quantitySpan.textContent = quantity;
    }
  });
});

