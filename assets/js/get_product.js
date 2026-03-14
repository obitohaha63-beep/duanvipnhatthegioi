
fetch("../assets/php/get_product.php")
.then(res => res.json())
.then(data => {

let html = ""

data.forEach(p => {

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
console.log(data)
})
.catch(err => console.log(err))
