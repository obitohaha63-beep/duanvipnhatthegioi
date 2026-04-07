/**
 * VALIDATION - FORM THÊM SẢN PHẨM
 * Sử dụng hệ thống validation inline từ validation.js
 */

document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");

    // ============================================
    // 1. THÊM VALIDATION RULES MỚI CHO SẢN PHẨM
    // ============================================
    
    // Thêm rule validate cho product_code
    ValidationRules.productCode = (value) => {
        if (!value) return 'Mã sản phẩm không được để trống';
        if (value.trim().length < 2) return 'Mã sản phẩm phải ít nhất 2 ký tự';
        return '';
    };

    // ============================================
    // 2. CẤU HÌNH CÁC TRƯỜNG CẦN VALIDATE
    // ============================================
    const fieldConfigs = {
        product_code: 'productCode',       // Mã sản phẩm
        name: 'productName',               // Tên sản phẩm
        category: 'required',              // Loại sản phẩm
        color: 'required',                 // Màu sắc
        weight: 'quantity',                // Trọng lượng (số >= 0)
        description: 'required',           // Mô tả
        unit: 'required',                  // Đơn vị tính
        stock_quantity: 'quantity',        // Số lượng tồn
        cost_price: 'price',               // Giá vốn
        profit_rate: 'percentageRate',     // Tỷ lệ lợi nhuận
        image: 'required'                  // Link hình ảnh
    };

    // ============================================
    // 3. THIẾT LẬP VALIDATION THỜI GIAN THỰC
    // ============================================
    setupRealtimeValidation(productForm, fieldConfigs);

    // ============================================
    // 4. XỬ LÝ SUBMIT FORM
    // ============================================
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validate toàn bộ form trước khi submit
        if (!validateForm(productForm, fieldConfigs)) {
            alert("❌ Vui lòng kiểm tra lại các thông tin!");
            return;
        }

        // ============================================
        // 5. GỬI DỮ LIỆU ĐẾN SERVER
        // ============================================
        const formData = new FormData(productForm);

        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formData
        })
            .then(res => res.text())
            .then(data => {
                alert("✅ " + data);
                // Reset form
                productForm.reset();
            })
            .catch(err => {
                console.error("Lỗi:", err);
                alert("❌ Lỗi kết nối server!");
            });
    });
});
