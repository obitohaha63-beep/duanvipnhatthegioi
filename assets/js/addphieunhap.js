document.getElementById("so-san-pham").addEventListener("change", function () {
    let count = parseInt(this.value);
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
            <input type="number" required>
        </div>

        <div class="form-row">
            <label>Giá nhập ${i}</label>
            <input type="number" required>
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

        // focus/input chỉ dùng khi dữ liệu đã có
        productInput.addEventListener("focus", () => showProducts(index));
        productInput.addEventListener("input", () => filterProducts(index));

        select.addEventListener("change", function () {
            const categoryId = this.value;

            // reset input
            productInput.value = "";
            productInput.dataset.productId = "";
            productListDiv.innerHTML = "";
            productInput.disabled = true; // tạm khóa input cho tới khi fetch xong
            productDataMap[index] = [];

            if (!categoryId) return;

            fetch(`../assets/php/get_products_by_category.php?category_id=${categoryId}`)
                .then(res => res.json())
                .then(data => {
                    productDataMap[index] = Array.isArray(data) ? data : [];
                    productInput.disabled = false; // mở input khi fetch xong
                })
                .catch(err => {
                    console.error("Lỗi JSON từ PHP:", err);
                    productInput.disabled = false;
                });
        });
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

    // click ngoài để ẩn dropdown
    document.addEventListener("click", e => {
        document.querySelectorAll(".product-list").forEach(div => {
            if (!div.contains(e.target) && !div.previousElementSibling.contains(e.target)) {
                div.style.display = "none";
            }
        });
    });
});