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
    price: filters.price.join(","),
    brand: filters.brand.join(","), // Thêm dòng này để gửi brand lên PHP
    sort: filters.sort
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
                  <span class="gia">${Number(p.selling_price)
                    .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})} đ</span>
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
  const priceChecked = [...document.querySelectorAll(".price:checked")].map(cb => cb.value);
  // Thêm dòng này để lấy các thương hiệu được chọn
  const brandChecked = [...document.querySelectorAll(".brand:checked")].map(cb => cb.value);
  const sort = document.getElementById("idsapxep").value;

  return {
    price: priceChecked,
    brand: brandChecked, // Đưa brand vào đối tượng trả về
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
// Thêm bộ lắng nghe cho các checkbox thương hiệu
document.querySelectorAll(".brand").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); 
  });
});
// Chạy lần đầu khi vào trang
loadProducts(currentPage);