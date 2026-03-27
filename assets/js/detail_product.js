const params = new URLSearchParams(window.location.search)
const code = params.get("code")

fetch("../assets/php/get_product_detail.php?code=" + code)
.then(data => {
  console.log(data)

  if (data.error) {
    document.getElementById("detailProducts").innerHTML = data.error
    return
  }

  const p = data

  let html = `

<div class = "bigcontent">
        <div class="product">
         <img class="main-image" src="${p.images?.[0] ?? p.image}" alt="Ảnh lớn">
          
        </div>
        <div class = "aboutproduct">
          <p class = "racket-name"> ${p.name} </p>
          <pre class ="trademark1">Thương hiệu: <a href="?"> ${p.brand_name}</a>   |   Loại: <a href="?">${p.category_name}</a></pre>
          <pre class ="trademark1">Mã sản phẩm: <a href="?">${p.product_code}</a></pre>
          <br>
          <p class="value">${Number(p.selling_price).toLocaleString("vi-VN")} đ</p>
          <br>
          <p style="font-size: 14px;">Màu sắc: </p>
          <p class ="DenVang"></p>
          <div class = "choosingcolor">
            <a href = "?">
              <img src="../assets/img/vot.png" alt="hinhanhsanpham" style = " padding-left: 6px; border-radius: 15px;">
              <div class = "choosingcolor2"></div>
              <p class = "text-racketcolor">${p.color}</p>
            </a>
          </div>
          <div class = "half-content">
            <hr>
            <p style="font-size: 13px; margin-top: 26px">Trọng lượng: </p>
            <div class = "choosingracket1" id="active"> 4UG5</div>
            <div class = "choosingracket2"> 4UG6</div>
            <div class = "countamountofitem">
              <div class = "minus">-</div>
              <div class = "numbercount"> 1 </div>
              <div class = "plus">+</div> 
            </div>
            <a href="login.html">
            <div class = "add-Gio-Hang">
              
              <p style =" font-size: 17px; padding-top:8px; color: white; font-weight: 700; "> Thêm vào giỏ hàng</p>
              
              <p style="font-size: 13px; padding-top: 5px; color: white;"> Giao tận nơi hoặc nhận tại cửa hàng</p>
              </a>
            </div>
            <a href="login.html">
            <div class = "communicate-with-us-on-zalo">
              
                <p style="font-size: 17px; font-weight: 700; padding-top: 8px; color: white;"> Mua hàng</p>
              <p style="font-size: 13px; padding-top: 5px; color: white;"> Giao tận nơi hoặc nhận tại cửa hàng</p>
            </div>
            </a>
           </div>
        </div>  
      </div>
      <div class = "sales-commitment">
        <div class = "sales-commitment-content">
          <div class = "sales-commitment-frame"> Cam kết bán hàng </div>
            <ul class = "sales-commitment-list">
              <li><img src="../assets/img/baohanh.png" alt="baohanh" class = "anhchung"> <span>🎁 Bảo hành chính hãng theo nhà sản xuất</span></li>
              <li><img src="../assets/img/mienphigiaohang.png" alt="baohanh" class = "anhchung"><span>Miễn phí giao hàng trong 2-3 ngày toàn quốc và 4H trong nội thành TP.HCM (Đơn trên 2 triệu). Trừ ống cầu.</span></li>
              <li><img src="../assets/img/hotrodoitra.png" alt="baohanh" class = "anhchung"><span>Hỗ trợ đổi trả cho hàng chính hãng (có phiếu bảo hành) miễn phí trong vòng 7 ngày.*</span></li>
              <li><img src="../assets/img/giaohanglayngay.png" alt="baohanh" class = "anhchung"><span>Hỗ trợ đặt giao hàng lấy ngay tại TP.HCM ( Khách hàng chi trả phí theo phí của Ahamove, Grab)</span></li>
            </ul>
        </div>
      </div>
      <div class="detail-of-items">
        ${p.description}
    </div>
`
  document.getElementById("detailProducts").innerHTML = html
})
.catch(err => console.log(err))