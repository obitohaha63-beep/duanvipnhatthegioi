



const userMode = document.body.dataset.mode;  
const urlParams = new URLSearchParams(window.location.search);
const searchKeyword = urlParams.get("keyword");  
let currentPageNumber = parseInt(urlParams.get("page")) || 1;  



function loadProducts(pageNumber = 1) {
    
    const filterSettings = getSelectedFilters();

    
    
    const queryParams = new URLSearchParams({
        keyword: searchKeyword || "",        
        page: pageNumber,                    
        price: filterSettings.price.join(","),    
        brand: filterSettings.brand.join(","),    
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
                ? "SanPham1.php" 
                : "SanPham.html";

            
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

    return {
        price: selectedPrices,
        brand: selectedBrands,
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



loadProducts(currentPageNumber);


document.querySelectorAll(".price").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); 
  });
});


document.getElementById("idsapxep").addEventListener("change", () => {
  loadProducts(1);
});

document.querySelectorAll(".brand").forEach(cb => {
  cb.addEventListener("change", () => {
    loadProducts(1); 
  });
});

loadProducts(currentPage);