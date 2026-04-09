



const userMode = document.body.dataset.mode;
const urlParams = new URLSearchParams(window.location.search);
let searchKeyword = urlParams.get("keyword") || "";
let currentPageNumber = parseInt(urlParams.get("page")) || 1;



function loadProducts(pageNumber = 1) {

    const filterSettings = getSelectedFilters();



    const queryParams = new URLSearchParams({
        keyword: searchKeyword || "",
        page: pageNumber,
        price: filterSettings.price.join(","),
        brand: filterSettings.brand.join(","),
        category: filterSettings.category,
        sort: filterSettings.sort
    });


    fetch(`../assets/php/search_product.php?${queryParams.toString()}`)
        .then(response => response.json())
        .then(apiData => {
            const productList = apiData.data;
            const paginationInfo = apiData.pagination;


            document.getElementById("timkiemcoban").innerHTML =
                `Kết quả tìm kiếm "<b>${searchKeyword || ""}</b>" (${paginationInfo.total_items} sản phẩm)`;




            const productDetailPageURL = userMode === "user"
                ? "../pages/SanPham1.php"
                : "../pages/SanPham.html";


            let productsHTML = "";

            productList.forEach(product => {
                const formattedPrice = Number(product.selling_price)
                    .toLocaleString('vi-VN', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });

                productsHTML += `
                    <div class="box">
                        <div class="container-anh">
                            <div class="sanpham">
                                <!-- Link tới chi tiết sản phẩm -->
                                <a href="${productDetailPageURL}?id=${product.id}">
                                    <!-- Ảnh sản phẩm -->
                                    <img class="anh-arcsaber"
                                         src="${product.image}"
                                         alt="${product.name}">

                                    <!-- Tên sản phẩm -->
                                    <span class="text-arcsaber">${product.name}</span>

                                    <!-- Giá bán -->
                                    <span class="gia">${formattedPrice} đ</span>
                                </a>
                            </div>


                            <a href="${productDetailPageURL}?id=${product.id}">
                                <button>Chi tiết</button>
                            </a>
                        </div>
                    </div>
                `;
            });

            document.getElementById("productList").innerHTML = productsHTML;


            renderPaginationButtons(paginationInfo);
        })
        .catch(error => {
            console.error("Lỗi tìm kiếm:", error);
            document.getElementById("productList").innerHTML =
                "<p> Lỗi tìm kiếm. Vui lòng thử lại.</p>";
        });
}



function getSelectedFilters() {

    const selectedPrices = [...document.querySelectorAll(".price:checked")]
        .map(checkbox => checkbox.value);


    const selectedBrands = [...document.querySelectorAll(".brand:checked")]
        .map(checkbox => checkbox.value);


    const selectedSort = document.getElementById("idsapxep").value;


    const selectedCategory = document.getElementById("categoryFilter").value;

    return {
        price: selectedPrices,
        brand: selectedBrands,
        category: selectedCategory,
        sort: selectedSort
    };
}



function renderPaginationButtons(paginationInfo) {
    let paginationHTML = "";
    const totalPages = paginationInfo.total_pages;
    const currentPage = paginationInfo.current_page;


    const isPrevDisabled = currentPage === 1;
    paginationHTML += `
        <a href="#"
           onclick="goToPage(${currentPage - 1})"
           style="${isPrevDisabled ? 'pointer-events: none; opacity: 0.5;' : ''}">
            &laquo; Prev
        </a>
    `;


    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const isCurrentPage = pageNum === currentPage;
        paginationHTML += `
            <a href="#"
               onclick="goToPage(${pageNum})"
               class="${isCurrentPage ? 'active' : ''}">
                ${pageNum}
            </a>
        `;
    }


    const isNextDisabled = currentPage === totalPages;
    paginationHTML += `
        <a href="#"
           onclick="goToPage(${currentPage + 1})"
           style="${isNextDisabled ? 'pointer-events: none; opacity: 0.5;' : ''}">
            Next &raquo;
        </a>
    `;

    document.querySelector(".pagination").innerHTML = paginationHTML;
}



function goToPage(pageNumber) {
    currentPageNumber = pageNumber;


    loadProducts(pageNumber);



    window.history.pushState(
        {},
        "",
        `?keyword=${encodeURIComponent(searchKeyword || "")}&page=${pageNumber}`
    );
}



document.addEventListener("DOMContentLoaded", function() {
    loadCategories();
    loadProducts(currentPageNumber);
});


function loadCategories() {
    fetch(`../assets/php/get_categories.php`)
        .then(response => response.json())
        .then(data => {
            const categoryFilter = document.getElementById("categoryFilter");

            // Xóa các option cũ (giữ lại option "-- Tất cả --")
            while (categoryFilter.options.length > 1) {
                categoryFilter.remove(1);
            }

            // Thêm các categories từ database
            if (data.success && data.data) {
                data.data.forEach(category => {
                    const option = document.createElement("option");
                    option.value = category.name;
                    option.textContent = category.name;
                    categoryFilter.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Lỗi load categories:", error));
}

// ========== WRAP TẤT CẢ EVENT LISTENERS TRONG DOMContentLoaded ==========
document.addEventListener("DOMContentLoaded", function() {

    // Event listeners cho checkboxes giá
    document.querySelectorAll(".price").forEach(cb => {
        cb.addEventListener("change", () => {
            loadProducts(1);
        });
    });

    // Event listener cho select sắp xếp
    document.getElementById("idsapxep").addEventListener("change", () => {
        loadProducts(1);
    });

    // Event listeners cho checkboxes thương hiệu
    document.querySelectorAll(".brand").forEach(cb => {
        cb.addEventListener("change", () => {
            loadProducts(1);
        });
    });

    // Event listener cho select phân loại
    document.getElementById("categoryFilter").addEventListener("change", () => {
        loadProducts(1);
    });

    // Load categories từ database
    loadCategories();

    // ========== XỬ LÝ NÚT TÌM KIẾM ==========
    const productNameInput = document.getElementById("productName");
    const searchProductBtn = document.getElementById("searchProductBtn");

    if (!searchProductBtn) {
        console.error("Nút tìm kiếm không tìm thấy!");
        return;
    }

    // Xử lý sự kiện click nút tìm kiếm
    searchProductBtn.addEventListener("click", function() {
          searchKeyword = productNameInput.value.trim();
        loadProducts(1);
        // Cập nhật searchKeyword và tải sản phẩm
         window.history.pushState(
        {},
        "",
        `?keyword=${encodeURIComponent(searchKeyword)}&page=1`
    );


    });

    // Xử lý sự kiện Enter trong input
    productNameInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            searchProductBtn.click();
        }
    });
});
loadCategories();
