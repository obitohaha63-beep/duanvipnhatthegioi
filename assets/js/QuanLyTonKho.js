document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadStock();

    document.getElementById("btnSearchStock").addEventListener("click", loadStock);
    document.getElementById("btnReport").addEventListener("click", loadReport);
});

async function loadCategories() {
    try {
        const res = await fetch("../assets/php/get_categories.php");
        const result = await res.json();

        const select = document.getElementById("categoryFilter");
        select.innerHTML = `<option value="">Tất cả</option>`;

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
    const warning = document.getElementById("warningLimit").value;
    const date = document.getElementById("dateFilter").value;

    try {
        const res = await fetch(`../assets/php/get_stock.php?category=${category}&warning=${warning}&date=${date}`);
        const result = await res.json();

        console.log(result);

        const tbody = document.getElementById("stockTable");
        tbody.innerHTML = "";

        if (result.success) {
            result.data.forEach(p => {
                tbody.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td>${p.quantity}</td>
                    <td>${p.last_update ? p.last_update.split(' ')[0] : ''}</td>
                    <td>${p.status}</td>
                </tr>`;
            });
        }

    } catch (err) {
        console.error("Lỗi load stock:", err);
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

        if (result.success) {
            result.data.forEach(p => {
                tbody.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td>${p.quantity}</td>
                    <td>${p.last_update ? p.last_update.split(' ')[0] : ''}</td>
                    <td>${p.status}</td>
                </tr>`;
            });
        }

    } catch (err) {
        console.error("Lỗi report:", err);
    }
}