



document.addEventListener("DOMContentLoaded", () => {
    
    
    const productContainer = document.querySelector(".container-sanphambot");

    
    if (!productContainer) {
        
        console.log("⚠️ Không tìm thấy .container-sanphambot - bỏ qua product_list.js");
        return;
    }

    
    fetch('../assets/php/get_products.php')
        .then(response => response.json())  
        .then(apiData => {
            
            
            if (apiData.status !== "success" || !apiData.data || apiData.data.length === 0) {
                productContainer.innerHTML = "<p> Không thể load sản phẩm hoặc chưa có sản phẩm</p>";
                return;
            }

            
            productContainer.innerHTML = "";

            
            
            apiData.data.forEach(product => {
                
                
                
                const firstVariant = product.variants && product.variants.length > 0 
                    ? product.variants[0] 
                    : null;

                
                const attributesData = {};
                if (firstVariant && firstVariant.attributes) {
                    firstVariant.attributes.forEach(attribute => {
                        const attrKey = attribute.attr_name
                            .toLowerCase()
                            .replace(/\s/g, "-");  
                        
                        const attrValue = attribute.option_value || 
                                        attribute.value_text || 
                                        "";
                        
                        attributesData[attrKey] = attrValue;
                    });
                }

                
                
                const costPrice = parseFloat(product.cost_price);
                const profitPercent = parseFloat(product.profit_percent);
                const sellingPrice = (costPrice * (1 + profitPercent / 100))
                    .toLocaleString("vi-VN") + " ₫";  

                
                
                const createdDate = product.created_at 
                    ? new Date(product.created_at).toISOString().split('T')[0] 
                    : "N/A";

                
                
                const productDiv = document.createElement("div");
                productDiv.classList.add("box");  

                
                productDiv.innerHTML = `
                    <div class="container-anh">
                        <div class="sanpham"
                             data-brand="${product.category_name || 'Chưa phân loại'}"
                             data-price="${sellingPrice}"
                             data-weight="${attributesData['trọng-lượng'] || 'N/A'}"
                             data-balance="${attributesData['điểm-cân-bằng'] || 'N/A'}"
                             data-style="${attributesData['phong-cách-chơi'] || 'N/A'}"
                             data-level="${attributesData['trình-độ-chơi'] || 'N/A'}"
                             data-date="${createdDate}">
                            
                            <!-- Link tới chi tiết sản phẩm -->
                            <a href="SanPham.html?id=${product.id}">
                                <!-- Hình ảnh sản phẩm -->
                                <img class="anh-arcsaber" 
                                     src="${product.image_url || '../assets/img/default.png'}"
                                     alt="${product.name}">
                                
                                <!-- Tên sản phẩm -->
                                <span class="text-arcsaber" style="color: #1b1b1b; text-decoration: none;">
                                    ${product.name}
                                </span>
                                
                                <!-- Badge số màu -->
                                <span class="mausac-arsaber">+1 màu sắc</span>
                                
                                <!-- Giá bán -->
                                <span class="gia">${sellingPrice}</span>
                            </a>
                        </div>
                        
                        <!-- Nút mua ngay -->
                        <a href="login.html">
                            <button class="btn-buy">Mua ngay</button>
                        </a>
                    </div>
                `;

                
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            
            console.error("Chi tiết lỗi:", error);
            productContainer.innerHTML = "<p> Lỗi tải sản phẩm. Vui lòng tải lại trang.</p>";
        });
});



