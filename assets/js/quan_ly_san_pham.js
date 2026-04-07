

document.addEventListener("DOMContentLoaded", () => {
    const productTableBody = document.getElementById("productTable");

    
    if (!productTableBody) {
        console.error(" Lỗi: Không tìm thấy phần tử #productTable");
        return;
    }

    

    loadProductsToTable();
});



function loadProductsToTable() {
    const productTableBody = document.getElementById("productTable");

    
    fetch("../assets/php/get_products.php")
        .then(response => response.json())
        .then(apiData => {
            
            if (!apiData.success) {
                console.error(" Lỗi API:", apiData.message);
                productTableBody.innerHTML = `
                    <tr>
                        <td colspan="12" style="text-align: center; padding: 20px;">
                             Lỗi: ${apiData.message || "Không thể tải sản phẩm"}
                        </td>
                    </tr>
                `;
                return;
            }

            
            productTableBody.innerHTML = "";

            
            apiData.data.forEach(product => {
                
                const formattedCostPrice = Number(product.cost_price)
                    .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0});

                
                const productRow = document.createElement("tr");
                productRow.innerHTML = `
                    <td>${product.id}</td>
                    <td>
                        <img src="../${product.image_url}?t=${Date.now()}" 
                             style="max-width: 50px; height: auto;"
                             alt="${product.name}">
                    </td>
                    <td>${product.name}</td>
                    <td>${product.category || "N/A"}</td>
                    <td>${product.brand || "N/A"}</td>
                    <td>${formattedCostPrice}đ</td>
                    <td>${product.profit_rate || 0}%</td>
                    <td>${product.quantity}</td>
                    <td>${product.status}</td>
                    <td>${product.description || ""}</td>
                    <td>${product.created_at || ""}</td>
                    <td>
                        <div class="action-buttons">
                            <a href="../pages/EditProduct.html?id=${product.id}" 
                               class="btn-primary"> Sửa</a>
                            <button class="btn-danger btn-delete" 
                                    data-id="${product.id}" 
                                    onclick="deleteProduct(${product.id})">
                                 Xóa
                            </button>
                        </div>
                    </td>
                `;

                productTableBody.appendChild(productRow);
            });
        })
        .catch(error => {
            console.error(" Lỗi tải sản phẩm:", error);
            productTableBody.innerHTML = `
                <tr>
                    <td colspan="12" style="text-align: center; padding: 20px; color: red;">
                         Lỗi kết nối server. Vui lòng tải lại trang!
                    </td>
                </tr>
            `;
        });
}



function deleteProduct(productId) {
    
    if (!confirm(" Bạn có chắc muốn xóa sản phẩm này?")) {
        return;
    }

    
    fetch(`../assets/php/delete_product.php?id=${productId}`)
        .then(response => response.json())
        .then(deleteResult => {
            
            if (deleteResult.success) {
                alert(" " + deleteResult.message);
                
                loadProductsToTable();
            } else {
                alert(" Lỗi: " + deleteResult.message);
            }
        })
        .catch(error => {
            console.error(" Lỗi xóa sản phẩm:", error);
            alert(" Lỗi kết nối server!");
        });
}
