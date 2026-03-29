const urlParams = new URLSearchParams(window.location.search)
const keyword = urlParams.get("keyword")
let currentPage = parseInt(urlParams.get("page")) || 1

function loadProducts(page = 1) {

fetch(`../assets/php/search_product.php?keyword=${encodeURIComponent(keyword)}&page=${page}`)

.then(res => res.json())
.then(res => {

const products = res.data
const pagination = res.pagination

// 🔥 tiêu đề
document.getElementById("timkiemcoban").innerHTML =
`Kết quả tìm kiếm "<b>${keyword}</b>" (${pagination.total_items} sản phẩm)`

// 🔥 render sản phẩm
let html = ""

products.forEach(p => {
html += `
<div class="box">
  <div class="container-anh">
    <div class="sanpham">
      <a href="SanPham.html?id=${p.id}">
        <img class="anh-arcsaber" src="${p.image}">
        <span class="text-arcsaber">${p.name}</span>
        <span class="gia">${Number(p.selling_price).toLocaleString("vi-VN")} đ</span>
        <span class="mausac-arsaber">${p.color}</span>
      </a>
    </div>
    <a href="login.html">
      <button>Mua ngay</button>
    </a>
  </div>
</div>
`
})

document.getElementById("productList").innerHTML = html

// 🔥 render pagination
renderPagination(pagination)

})
}

// 🔥 tạo pagination
function renderPagination(pagination) {
let html = ""

const total = pagination.total_pages
const current = pagination.current_page

// Prev
html += `<a href="#" onclick="changePage(${current - 1})" ${current == 1 ? 'style="pointer-events:none;opacity:0.5"' : ''}>&laquo;</a>`

// Pages
for (let i = 1; i <= total; i++) {
html += `<a href="#" onclick="changePage(${i})" class="${i === current ? 'active' : ''}">${i}</a>`
}

// Next
html += `<a href="#" onclick="changePage(${current + 1})" ${current == total ? 'style="pointer-events:none;opacity:0.5"' : ''}>&raquo;</a>`

document.querySelector(".pagination").innerHTML = html
}

// 🔥 đổi trang
function changePage(page) {
currentPage = page
loadProducts(page)

// update URL (không reload)
window.history.pushState({}, "", `?keyword=${encodeURIComponent(keyword)}&page=${page}`)
}

// load lần đầu
loadProducts(currentPage)