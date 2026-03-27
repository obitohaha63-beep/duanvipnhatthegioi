const urlParams = new URLSearchParams(window.location.search)
const keyword = urlParams.get("keyword")

fetch("../assets/php/search_product.php?keyword=" + keyword)

.then(res => res.json())
.then(res => {

const products = res.data   // 🔥 BẮT BUỘC

document.getElementById("timkiemcoban").innerHTML =
`Kết quả tìm kiếm "<b>${keyword}</b>" (${products.length} sản phẩm)`

let html = ""

products.forEach(p => {

html += `
<div class="box">
  <div class="container-anh">

    <div class="sanpham">
      <a href="SanPham.html?code=${p.product_code}">
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

})