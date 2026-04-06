/**
 * File: timkiemcoban.js
 * Mục đích: Xử lý trang tìm kiếm sản phẩm cơ bản
 * 
 * Chức năng chính:
 *   1. Lấy keyword tìm kiếm từ URL
 *   2. Tải sản phẩm theo keyword và lọc
 *   3. Hiển thị danh sách sản phẩm
 *   4. Hỗ trợ phân trang
 *   5. Hỗ trợ lọc theo giá, thương hiệu, sắp xếp
 */

// ========== BƯỚC 1: LẤY DỮ LIỆU TỪ URL ==========
const userMode = document.body.dataset.mode;  // guest hoặc user
const urlParams = new URLSearchParams(window.location.search);
const searchKeyword = urlParams.get("keyword");  // Từ khóa tìm kiếm
let currentPageNumber = parseInt(urlParams.get("page")) || 1;  // Trang hiện tại

/**
 * Hàm: Tải danh sách sản phẩm theo tìm kiếm + lọc + phân trang
 * 
 * Các bước:
 *   1. Lấy các bộ lọc của người dùng
 *   2. Tạo URL query parameters
 *   3. Gọi API tìm kiếm
 *   4. Hiển thị sản phẩm
 *   5. Hiển thị phân trang
 * 
 * @param {number} pageNumber - Số trang hiện tại
 */
function loadProducts(pageNumber = 1) {
    // ========== BƯỚC 1: LẤY CÁC BỘNC ==========
    const filterSettings = getSelectedFilters();

    // ========== BƯỚC 2: CHUẨN BỊ URL QUERY ==========
    // URLSearchParams = công cụ tạo query string
    const queryParams = new URLSearchParams({
        keyword: searchKeyword || "",        // Từ khóa tìm kiếm
        page: pageNumber,                    // Số trang
        price: filterSettings.price.join(","),    // Giá (ngăn cách bỳ dấu phẩy)
        brand: filterSettings.brand.join(","),    // Thương hiệu
        sort: filterSettings.sort            // Cách sắp xếp
    });

    // ========== BƯỚC 3: GỌI API TÌNOẾM ==========
    fetch(`../assets/php/search_product.php?${queryParams.toString()}`)
        .then(response => response.json())
        .then(apiData => {
            const productList = apiData.data;      // Mảng sản phẩm
            const paginationInfo = apiData.pagination;  // Thông tin phân trang

            // ========== BƯỚC 4: HIỂN THỊ TIÊU ĐỀ ==========
            document.getElementById("timkiemcoban").innerHTML = 
                `Kết quả tìm kiếm "<b>${searchKeyword || ""}</b>" (${paginationInfo.total_items} sản phẩm)`;
            
            // ========== BƯỚC 5: CHỌN TRANG CHI TIẾT ==========
            // Nếu là user đã login → dùng SanPham1.php
            // Nếu là guest → dùng SanPham.html
            const productDetailPageURL = userMode === "user" 
                ? "SanPham1.php" 
                : "SanPham.html";

            // ========== BƯỚC 6: HIỂN THỊ DANH SÁCH SẢN PHẨM ==========
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
                            
                            <!-- Nút mua ngay -->
                            <a href="login.html">
                                <button>Mua ngay</button>
                            </a>
                        </div>
                    </div>
                `;
            });

            document.getElementById("productList").innerHTML = productsHTML;

            // ========== BƯỚC 7: HIỂN THỊ PHÂN TRANG ==========
            renderPaginationButtons(paginationInfo);
        })
        .catch(error => {
            console.error("Lỗi tìm kiếm:", error);
            document.getElementById("productList").innerHTML = 
                "<p>❌ Lỗi tìm kiếm. Vui lòng thử lại.</p>";
        });
}

/**
 * Hàm: Lấy các bộ lọc mà người dùng chọn
 * 
 * Bộ lọc bao gồm:
 *   - price: giá bán (checkbox)
 *   - brand: thương hiệu (checkbox)
 *   - sort: cách sắp xếp (dropdown)
 * 
 * @returns {Object} Đối tượng chứa các bộ lọc được chọn
 */
function getSelectedFilters() {
    // Lấy tất cả checkbox giá được check → lưu vào mảng giá
    const selectedPrices = [...document.querySelectorAll(".price:checked")]
        .map(checkbox => checkbox.value);

    // Lấy tất cả checkbox thương hiệu được check → lưu vào mảng brand
    const selectedBrands = [...document.querySelectorAll(".brand:checked")]
        .map(checkbox => checkbox.value);

    // Lấy giá trị sắp xếp từ dropdown
    const selectedSort = document.getElementById("idsapxep").value;

    return {
        price: selectedPrices,
        brand: selectedBrands,
        sort: selectedSort
    };
}

/**
 * Hàm: Tạo các nút phân trang (1, 2, 3 ... Prev, Next)
 * 
 * Cấu trúc phân trang:
 *   - Nút Previous (<<): lùi 1 trang
 *   - Các nút số trang: 1, 2, 3, ...
 *   - Nút Next (>>): tiến 1 trang
 * 
 * @param {Object} paginationInfo - Thông tin phân trang từ server
 */
function renderPaginationButtons(paginationInfo) {
    let paginationHTML = "";
    const totalPages = paginationInfo.total_pages;
    const currentPage = paginationInfo.current_page;

    // ========== NÚT PREVIOUS (LÙI) ==========
    const isPrevDisabled = currentPage === 1;
    paginationHTML += `
        <a href="#" 
           onclick="goToPage(${currentPage - 1})" 
           style="${isPrevDisabled ? 'pointer-events: none; opacity: 0.5;' : ''}">
            &laquo; Prev
        </a>
    `;

    // ========== CÁC NÚT SỐ TRANG ==========
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

    // ========== NÚT NEXT (TIẾN) ==========
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

/**
 * Hàm: Chuyển sang trang khác
 * 
 * Ý tưởng:
 *   - Cập nhật số trang hiện tại
 *   - Tải lại danh sách sản phẩm theo trang mới
 *   - Cập nhật URL mà không reload trang (dùng pushState)
 * 
 * @param {number} pageNumber - Số trang muốn đi
 */
function goToPage(pageNumber) {
    currentPageNumber = pageNumber;
    
    // Tải lại sản phẩm cho trang mới
    loadProducts(pageNumber);
    
    // Cập nhật URL trên trình duyệt mà không reload trang
    // pushState = thêm vào history nhưng không reload
    window.history.pushState(
        {},  // state object (có thể để trống)
        "",  // title (bị ignore ở hầu hết trình duyệt)
        `?keyword=${encodeURIComponent(searchKeyword || "")}&page=${pageNumber}`
    );
}

/**
 * ========== CHẠY HÀM NGAY KHI TRANG TẢI ==========
 */
loadProducts(currentPageNumber);

// Lắng nghe sự kiện khi đánh dấu vào các bộ lọc giá
document.querySelectorAll(".price").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); // Khi đổi filter thì luôn quay về trang 1
  });
});

// Lắng nghe sự kiện khi đổi cách sắp xếp
document.getElementById("idsapxep").addEventListener("change", () => {
  loadProducts(1);
});
// Thêm bộ lắng nghe cho các checkbox thương hiệu
document.querySelectorAll(".brand").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); 
  });
});
// Chạy lần đầu khi vào trang
loadProducts(currentPage);