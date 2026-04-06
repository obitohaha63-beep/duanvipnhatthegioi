const mode = document.body.dataset.mode;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!id) {
  alert("Không có mã sản phẩm!");
}

// 1. Tải thông tin sản phẩm
fetch(`../assets/php/get_product_detail.php?id=${id}`)
  .then(res => res.json())
  .then(res => {
    if (!res.success) {
      document.querySelector(".bigcontent").innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
      return;
    }

    const p = res.product;

    // Hiển thị thanh điều hướng (Breadcrumb)
    const breadcrumbHTML = `
      <a href="../pages/haveaccount.html" style="color: #1b1b1b;">Trang chủ</a> /
      <a href="../pages/timkiemyonex1.php" style="color: #1b1b1b;">${p.category_name}</a> /
      ${p.name}
    `;
    document.querySelector(".linkedline-content").innerHTML = breadcrumbHTML;

    // Kiểm tra trạng thái đăng nhập để hiển thị nút
    let actionHTML = "";
    if (mode === "guest") {
      actionHTML = `
        <a href="login.html">
          <div class="add-Gio-Hang">
            <p>Đăng nhập <br> Để sử dụng chức năng giỏ hàng</p>
          </div>
        </a>
      `;
    } else if (mode === "user") {
      actionHTML = `
        <div class="add-Gio-Hang" id="addToCartBtn">
          <p>Thêm vào giỏ hàng</p>
        </div>
        <div class="communicate-with-us-on-zalo">
          <p>Mua hàng</p>
        </div>
      `;
    }

    // Tạo HTML cho phần chi tiết sản phẩm (Đã loại bỏ khối màu sắc, trọng lượng)
    const html = `
      <div class="product">
        <img src="../${p.image_url || 'assets/img/placeholder.png'}?t=${Date.now()}" alt="Ảnh sản phẩm">
      </div>

      <div class="aboutproduct">
        <p class="racket-name">${p.name}</p>
        <pre class="trademark1">Thương hiệu: <a href="#">${p.brand}</a> | Loại: <a href="#">${p.category_name}</a></pre>
        <pre class="trademark1">ID sản phẩm: <a href="#">${p.id}</a></pre>
        
        <p class="value">${Number(p.selling_price).toLocaleString("vi-VN")} đ</p>

        <div class="half-content">
          <hr>
          <div class="countamountofitem" style="margin-top: 20px;">
            <div class="minus">-</div>
            <div class="numbercount">1</div>
            <div class="plus">+</div>
          </div>
          
          ${actionHTML} 
        </div>
      </div>

      <div class="detail-of-items">
        ${p.description ?? "Chưa có mô tả cho sản phẩm này."}
      </div>
    `;

    document.querySelector(".bigcontent").innerHTML = html;
  })
  .catch(err => console.error("Lỗi:", err));

// 2. Gộp quản lý tất cả các sự kiện Click trên trang
document.addEventListener("click", function(e) {
  
  // Tăng/giảm số lượng
  const numberEl = document.querySelector(".numbercount");
  if (numberEl) {
    let current = parseInt(numberEl.innerText);
    
    if (e.target.classList.contains("plus")) {
      numberEl.innerText = current + 1;
    }
    
    if (e.target.classList.contains("minus") && current > 1) {
      numberEl.innerText = current - 1;
    }
  }

  // Thêm vào giỏ hàng
  if (e.target.closest("#addToCartBtn")) {
    const quantity = parseInt(document.querySelector(".numbercount").innerText);

    fetch("../assets/php/add_to_cart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Đã bỏ color và size ra khỏi payload gửi đi
      body: JSON.stringify({
        product_id: id,
        quantity: quantity 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Đã thêm vào giỏ hàng!");
        loadCartCount(); // Cập nhật lại số trên giỏ hàng
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));
  }
});

// 3. Hàm tải số lượng trên icon giỏ hàng
function loadCartCount() {
  fetch("../assets/php/get_cart_count.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.querySelector(".jscart").innerText = data.count;
      }
    });
}

// Khởi chạy
loadCartCount();