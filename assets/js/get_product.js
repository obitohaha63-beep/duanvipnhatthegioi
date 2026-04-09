



document.addEventListener("DOMContentLoaded", () => {

    const productContainer = document.querySelector(".container-sanphambot");


    fetch('../assets/php/get_products.php')
        .then(response => response.json())
        .then(apiResponse => {


            if (apiResponse.status !== "success" || !apiResponse.data) {
                productContainer.innerHTML = "<p> Không thể tải sản phẩm</p>";
                return;
            }


            productContainer.innerHTML = "";


            apiResponse.data.forEach(product => {



                const firstVariant = product.variants && product.variants[0]
                    ? product.variants[0]
                    : null;


                const attributesMap = {};

                if (firstVariant && firstVariant.attributes) {
                    firstVariant.attributes.forEach(attribute => {

                        const attrKey = attribute.attr_name
                            .toLowerCase()
                            .replace(/\s/g, "-");


                        const attrValue = attribute.option_value ||
                                        attribute.value_text ||
                                        "";

                        attributesMap[attrKey] = attrValue;
                    });
                }



                const costPrice = parseFloat(product.cost_price) || 0;
                const profitPercent = parseFloat(product.profit_percent) || 0;
                const sellingPrice = (costPrice * (1 + profitPercent / 100))
                    .toLocaleString("vi-VN") + " ₫";



                const createdDate = product.created_at
                    ? new Date(product.created_at).toISOString().split('T')[0]
                    : "";


                const productDiv = document.createElement("div");
                productDiv.classList.add("box");

                productDiv.innerHTML = `
                    <div class="container-anh">
                        
                        <div class="sanpham"
                             data-brand="${product.category_name || ''}"
                             data-price="${sellingPrice}"

                             data-date="${createdDate}">


                            <a href="SanPham.html?id=${product.id}">

                                <img class="anh-arcsaber"
                                     src="${product.image_url || '../assets/img/default.png'}"
                                     alt="${product.name}">


                                <span class="text-arcsaber" style="color: #1b1b1b; text-decoration: none;">
                                    ${product.name}
                                </span>


                                <span class="mausac-arsaber">+1 màu sắc</span>

                                <!-- Giá bán -->
                                <span class="gia">${sellingPrice}</span>
                            </a>
                        </div>


                        <a href="login.html">
                            <button>Mua ngay</button>
                        </a>
                    </div>
                `;


                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => {

            console.error("Chi tiết lỗi:", error);
            productContainer.innerHTML = "<p> Lỗi kính load sản phẩm. Vui lòng tải lại trang.</p>";
        });
});
