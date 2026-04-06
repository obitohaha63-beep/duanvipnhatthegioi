const mode = document.body.dataset.mode;
const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("keyword");
let currentPage = parseInt(urlParams.get("page")) || 1;

// Hàm tải danh sách sản phẩm theo bộ lọc và phân trang
function loadProducts(page = 1) {
  const filters = getFilters();

  // Tạo URL params chuẩn bị gửi lên server
  const params = new URLSearchParams({
    keyword: keyword || "",
    page: page,
    price: filters.price.join(","), // Ví dụ: "1-2tr,2-3tr"
    sort: filters.sort
    // Đã xóa phần weight ra khỏi params
  });

  fetch(`../assets/php/search_product.php?${params.toString()}`)
    .then(res => res.json())
    .then(res => {
      const products = res.data;
      const pagination = res.pagination;

      // Render Tiêu đề
      document.getElementById("timkiemcoban").innerHTML = 
        `Kết quả tìm kiếm "<b>${keyword || ""}</b>" (${pagination.total_items} sản phẩm)`;
      
      // Kiểm tra xem là khách hay user để trỏ đúng link chi tiết
      let productDetailPage = mode === "user" ? "SanPham1.php" : "SanPham.html";

      // Render danh sách sản phẩm
      let html = "";
      products.forEach(p => {
        html += `
          <div class="box">
            <div class="container-anh">
              <div class="sanpham">
                <a href="${productDetailPage}?id=${p.id}">
                  <img class="anh-arcsaber" src="${p.image}" alt="${p.name}">
                  <span class="text-arcsaber">${p.name}</span>
                  <span class="gia">${Number(p.selling_price).toLocaleString("vi-VN")} đ</span>
                  </a>
              </div>
              <a href="login.html">
                <button>Mua ngay</button>
              </a>
            </div>
          </div>
        `;
      });
      document.getElementById("productList").innerHTML = html;

      // Tạo các nút phân trang (1, 2, 3...)
      renderPagination(pagination);
    });
}

// Hàm lấy các giá trị người dùng đang chọn để lọc
function getFilters() {
  // Lấy các ô checkbox giá đang được đánh dấu (tick)
  const priceChecked = [...document.querySelectorAll(".price:checked")].map(cb => cb.value);
  // Lấy giá trị sắp xếp
  const sort = document.getElementById("idsapxep").value;

  // Đã xóa logic lấy các ô checkbox weight
  return {
    price: priceChecked,
    sort: sort
  };
}

// Hàm vẽ các nút phân trang
function renderPagination(pagination) {
  let html = "";
  const total = pagination.total_pages;
  const current = pagination.current_page;

  // Nút Lùi (Prev)
  html += `<a href="#" onclick="changePage(${current - 1})" ${current == 1 ? 'style="pointer-events:none;opacity:0.5"' : ''}>&laquo;</a>`;

  // Các trang số
  for (let i = 1; i <= total; i++) {
    html += `<a href="#" onclick="changePage(${i})" class="${i === current ? 'active' : ''}">${i}</a>`;
  }

  // Nút Tới (Next)
  html += `<a href="#" onclick="changePage(${current + 1})" ${current == total ? 'style="pointer-events:none;opacity:0.5"' : ''}>&raquo;</a>`;

  document.querySelector(".pagination").innerHTML = html;
}

// Hàm chuyển trang
function changePage(page) {
  currentPage = page;
  loadProducts(page);
  // Cập nhật lại URL trên trình duyệt mà không cần tải lại trang
  window.history.pushState({}, "", `?keyword=${encodeURIComponent(keyword || "")}&page=${page}`);
}

// Lắng nghe sự kiện khi đánh dấu vào các bộ lọc giá
document.querySelectorAll(".price").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); // Khi đổi filter thì luôn quay về trang 1
  });
});

// Lắng nghe sự kiện khi đổi cách sắp xếp
document.getElementById("idsapxep").addEventListener("change", () => {
  loadProducts(1);
});

// Chạy lần đầu khi vào trang
loadProducts(currentPage);