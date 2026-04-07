document.addEventListener("DOMContentLoaded", function () {

    
    document.getElementById("so-san-pham").addEventListener("change", function () {
        const count = parseInt(this.value);
        if (!count || count < 1) return;

        let html = "";
        for (let i = 1; i <= count; i++) {
            html += `
            <div class="form-row">
                <label>Loại sản phẩm ${i}</label>
                <select class="category-select" data-index="${i}" required>
                    <option value="">-- Chọn loại --</option>
                    <option value="1">Vợt cầu lông</option>
                    <option value="2">Giày cầu lông</option>
                </select>
            </div>

            <div class="form-row" style="position: relative;">
                <label>Tên sản phẩm ${i}</label>
                <input type="text" class="product-name" data-index="${i}" placeholder="Chọn sản phẩm" autocomplete="off" required disabled>
                <div class="product-list" id="product-list-${i}"></div>
            </div>

            <div class="form-row">
                <label>Số lượng ${i}</label>
                <input type="number" class="product-quantity" data-index="${i}" required>
            </div>

            <div class="form-row">
                <label>Giá nhập ${i}</label>
                <input type="number" class="product-price" data-index="${i}" required>
            </div>
            <br><br>
            `;
        }
        document.getElementById("product-list").innerHTML = html;

        
        const productDataMap = {};

        document.querySelectorAll(".category-select").forEach(select => {
            const index = select.dataset.index;
            const productInput = document.querySelector(`.product-name[data-index='${index}']`);
            const productListDiv = document.getElementById(`product-list-${index}`);

            
            select.addEventListener("change", function () {
                const categoryId = this.value;
                productInput.value = "";
                productInput.dataset.productId = "";
                productListDiv.innerHTML = "";
                productInput.disabled = true;

                if (!categoryId) return;

                fetch(`../assets/php/get_products_by_category.php?category_id=${categoryId}`)
                    .then(res => res.json())
                    .then(data => {
                        productDataMap[index] = Array.isArray(data) ? data : [];
                        productInput.disabled = false;
                    })
                    .catch(err => {
                        console.error("Lỗi JSON từ PHP:", err);
                        productInput.disabled = false;
                        productDataMap[index] = [];
                    });
            });

            
            productInput.addEventListener("focus", () => showProducts(index));
            
            productInput.addEventListener("input", () => filterProducts(index));
        });

        
        function showProducts(index) {
            const productInput = document.querySelector(`.product-name[data-index='${index}']`);
            const productListDiv = document.getElementById(`product-list-${index}`);
            const data = productDataMap[index] || [];
            if (!data.length) return;

            productListDiv.innerHTML = data.map(p =>
                `<div class="product-item" data-id="${p.id}">${p.name}</div>`
            ).join("");
            productListDiv.style.display = "block";
            bindClickEvents(index);
        }

        
        function filterProducts(index) {
            const productInput = document.querySelector(`.product-name[data-index='${index}']`);
            const productListDiv = document.getElementById(`product-list-${index}`);
            const data = productDataMap[index] || [];

            if (!data.length) return;

            const val = productInput.value.toLowerCase();
            const filtered = data.filter(p => p.name.toLowerCase().includes(val));

            productListDiv.innerHTML = filtered.length
                ? filtered.map(p => `<div class="product-item" data-id="${p.id}">${p.name}</div>`).join("")
                : `<div class="no-product">Không tìm thấy sản phẩm</div>`;
            productListDiv.style.display = "block";
            bindClickEvents(index);
        }

        
        function bindClickEvents(index) {
            const productInput = document.querySelector(`.product-name[data-index='${index}']`);
            const productListDiv = document.getElementById(`product-list-${index}`);
            productListDiv.querySelectorAll(".product-item").forEach(item => {
                item.onclick = function () {
                    productInput.value = this.textContent;
                    productInput.dataset.productId = this.dataset.id;
                    productListDiv.style.display = "none";
                };
            });
        }

        
        document.addEventListener("click", e => {
            document.querySelectorAll(".product-list").forEach(div => {
                if (!div.contains(e.target) && !div.previousElementSibling.contains(e.target)) {
                    div.style.display = "none";
                }
            });
        });

    });

    
    const btnComplete = document.getElementById("btn-complete");
    if (!btnComplete) return;

    
    btnComplete.addEventListener("click", function (e) {
        e.preventDefault(); 

        const ngayNhapInput = document.getElementById("ngay-nhap");
        const ngayNhap = ngayNhapInput ? ngayNhapInput.value : "";
        if (!ngayNhap) return alert("Vui lòng chọn ngày nhập");

        const soSanPham = parseInt(document.getElementById("so-san-pham").value);
        if (!soSanPham || soSanPham < 1) return alert("Nhập số sản phẩm hợp lệ");

        const products = [];
        for (let i = 1; i <= soSanPham; i++) {
            const productInput = document.querySelector(`.product-name[data-index='${i}']`);
            const quantityInput = document.querySelector(`.product-quantity[data-index='${i}']`);
            const priceInput = document.querySelector(`.product-price[data-index='${i}']`);

            const productId = productInput?.dataset.productId;
            const quantity = quantityInput?.value;
            const price = priceInput?.value;

            if (!productId || !quantity || !price) {
                return alert(`Vui lòng điền đầy đủ thông tin cho sản phẩm ${i}`);
            }

            products.push({ product_id: productId, quantity, price });
        }

        fetch("../assets/php/complete_phieunhap.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ngay_nhap: ngayNhap, products })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(`Hoàn thành phiếu nhập! Đã thêm ${data.inserted || 0} sản phẩm.`);
                window.location.reload();
            } else {
                alert("Lỗi: " + (data.message || "Không thêm được sản phẩm nào"));
            }
        })
        .catch(err => {
            console.error(err);
            alert("Có lỗi xảy ra khi hoàn thành phiếu nhập");
        });
    });

});