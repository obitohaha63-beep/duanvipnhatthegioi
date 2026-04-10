

document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");



    // Thêm rule validate cho product_code
    ValidationRules.productCode = (value) => {
        if (!value) return 'Mã sản phẩm không được để trống';
        if (value.trim().length < 2) return 'Mã sản phẩm phải ít nhất 2 ký tự';
        return '';
    };


    const fieldConfigs = {
        product_code: 'productCode',
        name: 'productName',
        category: 'required',
        description: 'required',
        unit: 'required',
        stock_quantity: 'quantity',
        cost_price: 'price',
        profit_rate: 'percentageRate',
        image: 'required'
    };


    setupRealtimeValidation(productForm, fieldConfigs);

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validate toàn bộ form trước khi submit
        if (!validateForm(productForm, fieldConfigs)) {
            alert(" Vui lòng kiểm tra lại các thông tin!");
            return;
        }


        // GỬI DỮ LIỆU ĐẾN SERVER

        const formData = new FormData(productForm);

        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formData
        })
            .then(res => res.text())
            .then(data => {
                alert(" " + data);
                // Reset form
                productForm.reset();
            })
            .catch(err => {
                console.error("Lỗi:", err);
                alert(" Lỗi kết nối server!");
            });
    });
});
