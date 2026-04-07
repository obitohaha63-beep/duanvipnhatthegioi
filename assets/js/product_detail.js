






const userMode = document.body.dataset.mode;


const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get("id");  


if (!productId) {
    alert(" Lỗi: Không tìm thấy mã sản phẩm!");
}



fetch(`../assets/php/get_product_detail.php?id=${productId}`)
    .then(response => response.json())
    .then(apiData => {
        
        if (!apiData.success) {
            document.querySelector(".bigcontent").innerHTML = 
                "<h2> Không tìm thấy sản phẩm</h2>";
            return;
        }

        const product = apiData.product;

        
        
        const breadcrumbHTML = `
            <a href="../pages/haveaccount.html" style="color: #1b1b1b;">Trang chủ</a> /
            <a href="../pages/timkiemyonex1.php" style="color: #1b1b1b;">
                ${product.category_name}
            </a> /
            ${product.name}
        `;
        document.querySelector(".linkedline-content").innerHTML = breadcrumbHTML;

        
        
        
        let actionButtonHTML = "";

        if (userMode === "guest") {
            
            actionButtonHTML = `
                <a href="login.html">
                    <div class="add-Gio-Hang">
                        <p>Đăng nhập <br> Để sử dụng chức năng giỏ hàng</p>
                    </div>
                </a>
            `;
        } else if (userMode === "user") {
            
            actionButtonHTML = `
                <div class="add-Gio-Hang" id="addToCartBtn">
                    <p>Thêm vào giỏ hàng</p>
                </div>
                
            `;
        }

        
        const productHTML = `
            <!-- PHầN ẢNH SẢN PHẨM -->
            <div class="product">
                <img src="../${product.image_url || 'assets/img/placeholder.png'}?t=${Date.now()}" 
                     alt="${product.name}">
            </div>

            <!-- PHầN THÔNG TIN VÀ GIÁ -->
            <div class="aboutproduct">
                <!-- Tên sản phẩm -->
                <p class="racket-name">${product.name}</p>
                
                <!-- Thương hiệu và loại -->
                <pre class="trademark1">
                Thương hiệu: <a href="#">${product.brand}</a> | 
                Loại: <a href="#">${product.category_name}</a>
                </pre>
                
                
                <pre class="trademark1">ID sản phẩm: <a href="#">${product.id}</a></pre>
                
                
                <p class="value">${Number(product.selling_price)
                    .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})} đ
                </p>

                
                <div class="half-content">
                    <hr>
                    
                    
                    <div class="countamountofitem" style="margin-top: 20px;">
                        <button class="minus">−</button>
                        <span class="numbercount">1</span>
                        <button class="plus">+</button>
                    </div>
                    
                    <!-- Nút hành động (login hoặc add to cart) -->
                    ${actionButtonHTML}
                </div>
            </div>

            <!-- PHầN MÔ TẢ SẢN PHẨM -->
            <div class="detail-of-items">
                <h2>MÔ TẢ SẢN PHẨM:</h2>${product.description}
            </div>
        `;

        document.querySelector(".bigcontent").innerHTML = productHTML;
    })
    .catch(error => {
        console.error("Lỗi tải sản phẩm:", error);
        document.querySelector(".bigcontent").innerHTML = 
            "<h2> Lỗi tải sản phẩm. Vui lòng tải lại trang.</h2>";
    });



document.addEventListener("click", function(event) {
    
    const quantityValueElement = document.querySelector(".numbercount");
    
    if (quantityValueElement) {
        let currentQuantity = parseInt(quantityValueElement.innerText);

        
        if (event.target.classList.contains("plus")) {
            quantityValueElement.innerText = currentQuantity + 1;
        }

        
        if (event.target.classList.contains("minus") && currentQuantity > 1) {
            quantityValueElement.innerText = currentQuantity - 1;
        }
    }

    
    if (event.target.closest("#addToCartBtn")) {
        
        const selectedQuantity = parseInt(
            document.querySelector(".numbercount").innerText
        );

        
        fetch("../assets/php/add_to_cart.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: selectedQuantity
            })
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                alert(" Đã thêm vào giỏ hàng!");
                updateCartBadgeCount(); 
            } else {
                alert(" Lỗi: " + responseData.message);
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert(" Lỗi kết nối server. Vui lòng thử lại.");
        });
    }
});



function updateCartBadgeCount() {
    fetch("../assets/php/get_cart_count.php")
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                
                document.querySelector(".jscart").innerText = responseData.count;
            }
        })
        .catch(error => {
            console.error("Lỗi cập nhật badge:", error);
        });
}



updateCartBadgeCount();