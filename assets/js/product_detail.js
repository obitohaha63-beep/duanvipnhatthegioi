const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")

if (!id) {
    alert("Không có sản phẩm")
}

// 🔥 gọi API đúng param id
fetch(`../assets/php/get_product_detail.php?id=${id}`)
.then(async res => {
    const text = await res.text()
    try {
        return JSON.parse(text)
    } catch {
        console.error("Lỗi API:", text)
        throw new Error("API lỗi")
    }
})
.then(res => {

if (!res.success) {
    document.querySelector(".bigcontent").innerHTML = "<h2>Không tìm thấy sản phẩm</h2>"
    return
}

const p = res.product

// 🔥 render HTML
const html = `
<div class="product">
 <img src="../${p.image_url || 'assets/img/placeholder.png'}?t=${Date.now()}" alt="Ảnh lớn">
</div>

<div class="aboutproduct">
  <p class="racket-name">${p.name}</p>

  <pre class="trademark1">
Thương hiệu: <a href="#">${p.brand}</a> | 
Loại: <a href="#">${p.category_name}</a>
  </pre>

  <pre class="trademark1">
ID sản phẩm: <a href="#">${p.id}</a>
  </pre>

  <p class="value">${Number(p.selling_price).toLocaleString("vi-VN")} đ</p>

  <p style="font-size:14px;">Màu sắc:</p>
  <p>${p.color}</p>

  <div class="choosingcolor">
  ${p.color.split(",").map(c => `<div class="color-item" data-color="${c.trim()}">${c.trim()}</div>`).join("")}
</div>

  <div class="half-content">
    <hr>

    <p style="font-size:13px;margin-top:20px">Trọng lượng:</p>
    <div class="choosingracket1">
  ${p.size.split(",").map(s => `<div class="size-item">${s.trim()}</div>`).join("")}
</div>

    <div class="countamountofitem">
      <div class="minus">-</div>
      <div class="numbercount">1</div>
      <div class="plus">+</div>
    </div>

    <a href="login.html">
      <div class="add-Gio-Hang">
        <p>Thêm vào giỏ hàng</p>
      </div>
    </a>

    <a href="login.html">
      <div class="communicate-with-us-on-zalo">
        <p>Mua hàng</p>
      </div>
    </a>
  </div>
</div>

<div class="detail-of-items">
  ${p.description ?? ""}
</div>
`

document.querySelector(".bigcontent").innerHTML = html

})
.catch(err => {
    console.error(err)
})

let selectedSize = null;
let selectedColor = null;

document.addEventListener("click", function(e){
  if(e.target.classList.contains("size-item")){
    document.querySelectorAll(".size-item").forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    selectedSize = e.target.innerText;
  }

  if(e.target.classList.contains("color-item")){
    document.querySelectorAll(".color-item").forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    selectedColor = e.target.dataset.color;
  }
})