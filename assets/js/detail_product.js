const params = new URLSearchParams(window.location.search)
const code = params.get("code")

fetch("../assets/php/get_product.php?code=" + code)
.then(res => res.json())
.then(data => {
const p = data[0]
let html = `

<div class = "bigcontent">
        <div class="product">
         <img class="main-image" src="${p.image}" alt="Ảnh lớn">
          
        </div>
        <div class = "aboutproduct">
          <p class = "racket-name"> ${p.name} </p>
          <pre class ="trademark1">Thương hiệu: <a href="?"> Yonex</a>   |   Loại: <a href="?">${p.category}</a></pre>
          <pre class ="trademark1">Mã sản phẩm: <a href="?">${p.product_code}</a></pre>
          <br>
          <p class="value">${p.selling_price}</p>
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
`
document.getElementById("detailProducts").innerHTML = html

})
.catch(err => console.log(err))

.catch(err => console.log(err))
console.log(data)

location.reload();