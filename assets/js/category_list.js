document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("categoryTable");

    fetch("../assets/php/get_categories.php")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const categories = data.data;
                tableBody.innerHTML = ""; // clear table

                categories.forEach(cat => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${cat.id}</td>
                        <td>${cat.name}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            } else {
                tableBody.innerHTML = `<tr><td colspan="2">Lỗi: ${data.message}</td></tr>`;
            }
        })
        .catch(err => {
            console.error(err);
            tableBody.innerHTML = `<tr><td colspan="2">Đã có lỗi xảy ra khi kết nối server</td></tr>`;
        });
});