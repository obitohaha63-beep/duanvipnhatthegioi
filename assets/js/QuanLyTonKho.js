document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadStock();
    loadWarningStock();

    document.getElementById("btnSearchStock").addEventListener("click", loadStock);
    document.getElementById("btnReport").addEventListener("click", loadReport);
    document.getElementById("btnSearchWarningStock").addEventListener("click", loadWarningStock);
});


async function loadCategories() {
    try {
        const res = await fetch("../assets/php/get_categories.php");
        const result = await res.json();

        const select = document.getElementById("categoryFilter");
        select.innerHTML = `<option value="">Tất cả loại sản phẩm</option>`;

        if (result.success) {
            result.data.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
            });
        }
    } catch (err) {
        console.error("Lỗi load categories:", err);
    }
}


async function loadStock() {
    const category = document.getElementById("categoryFilter").value;
    const date = document.getElementById("dateFilter").value;

    try {
        
        const res = await fetch(`../assets/php/get_stock.php?category=${category}&date=${date}`);
        const result = await res.json();

        const tbody = document.getElementById("stockTable");
        tbody.innerHTML = "";

        if (!result.success || result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">Chưa có dữ liệu</td></tr>`;
            return;
        }

        result.data.forEach((p, index) => {
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
            </tr>`;
        });

    } catch (err) {
        console.error("Lỗi load tồn kho:", err);
    }
}


async function loadReport() {
    const keyword = document.getElementById("keyword").value;
    const from = document.getElementById("fromDate").value;
    const to = document.getElementById("toDate").value;

    try {
        const res = await fetch(`../assets/php/get_report.php?keyword=${keyword}&from=${from}&to=${to}`);
        const result = await res.json();

        const tbody = document.getElementById("reportTable");
        tbody.innerHTML = "";

        if (!result.success || result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">Chưa có dữ liệu</td></tr>`;
            return;
        }

        result.data.forEach((p, index) => {
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.imported}</td>
                <td>${p.exported}</td>
            </tr>`;
        });

    } catch (err) {
        console.error("Lỗi báo cáo:", err);
    }
}


async function loadWarningStock() {
    const warning = parseInt(document.getElementById("warningLimit").value) || 5;

    try {
        const res = await fetch(`../assets/php/get_stock.php`);
        const result = await res.json();

        const tbody = document.getElementById("warningStockTable");
        tbody.innerHTML = "";

        if (!result.success || result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">Chưa có dữ liệu</td></tr>`;
            return;
        }

        const filtered = result.data.filter(p => p.quantity <= warning);

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">Không có sản phẩm cảnh báo</td></tr>`;
            return;
        }

        filtered.forEach((p, index) => {
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
            </tr>`;
        });

    } catch (err) {
        console.error("Lỗi load sản phẩm cảnh báo:", err);
    }
}