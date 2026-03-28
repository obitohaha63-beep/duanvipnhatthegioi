document.getElementById("btn-complete").addEventListener("click", function () {
    const supplier = document.getElementById("supplier").value;
    const count = parseInt(document.getElementById("so-san-pham").value);
    const items = [];

    for (let i = 1; i <= count; i++) {
        const productInput = document.querySelector(`.product-name[data-index='${i}']`);
        const productId = productInput.dataset.productId;
        const quantity = document.querySelector(`.quantity[data-index='${i}']`)?.value || 0;
        const importPrice = document.querySelector(`.import-price[data-index='${i}']`)?.value || 0;

        if (!productId) {
            alert(`Chưa chọn sản phẩm thứ ${i}`);
            return;
        }

        items.push({
            product_id: productId,
            quantity: quantity,
            import_price: importPrice
        });
    }

    fetch('../assets/php/complete_phieunhap.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier, items })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                location.reload();
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(err => console.error(err));
});