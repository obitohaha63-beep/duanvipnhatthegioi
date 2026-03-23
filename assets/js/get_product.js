document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container-sanphambot");

    fetch('../assets/php/get_products.php')
        .then(res => res.json())
        .then(res => {
            if (res.status !== "success") {
                container.innerHTML = "<p>Không thể load sản phẩm</p>";
                return;
            }

            container.innerHTML = ""; // xóa cũ
            res.data.forEach(product => {
                const variant = product.variants[0]; // lấy variant đầu tiên làm demo
                const attrData = {};

                if (variant && variant.attributes) {
                    variant.attributes.forEach(a => {
                        attrData[a.attr_name.toLowerCase().replace(/\s/g, "-")] = a.option_value || a.value_text || "";
                    });
                }

                const price = (parseFloat(product.cost_price) * (1 + parseFloat(product.profit_percent)/100))
                                .toLocaleString("vi-VN") + " ₫";

                const createdDate = product.created_at ? new Date(product.created_at).toISOString().split('T')[0] : "";

                const div = document.createElement("div");
                div.classList.add("box");
                div.innerHTML = `
                    <div class="container-anh">
                        <div class="sanpham"
                            data-brand="${product.category_name || ''}"
                            data-price="${price}"
                            data-weight="${attrData['trọng-lượng'] || ''}"
                            data-balance="${attrData['điểm-cân-bằng'] || ''}"
                            data-style="${attrData['phong-cách-chơi'] || ''}"
                            data-level="${attrData['trình-độ-chơi'] || ''}"
                            data-date="${createdDate}">
                            
                            <a href="SanPham.html?id=${product.id}">
                                <img class="anh-arcsaber" src="${product.image_url || '../assets/img/default.png'}">
                                <span class="text-arcsaber" style="color: #1b1b1b; text-decoration: none;">
                                    ${product.name}
                                </span>
                                <span class="mausac-arsaber">+1 màu sắc</span>
                                <span class="gia">${price}</span>
                            </a>
                        </div>
                        <a href="login.html"><button>Mua ngay</button></a>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Lỗi khi load sản phẩm</p>";
        });
});