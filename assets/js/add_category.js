function loadCategories() {
    fetch('../assets/php/get_categories.php')
        .then(res => res.json())
        .then(res => {
            if(res.status !== 'success') {
                alert('Lỗi khi lấy dữ liệu: ' + res.message);
                return;
            }

            const tbody = document.querySelector("#categoryTable tbody");
            tbody.innerHTML = ''; // Xoá dữ liệu cũ

            res.data.forEach(cat => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${cat.id}</td>
                    <td>${cat.name}</td>
                    <td>
                        ${cat.description || ''}<br>
                        ${cat.attributes.map(a => {
                            let attrStr = `${a.name} (${a.type})`;
                            if(a.type === 'select') {
                                attrStr += `: ${a.options.join(', ')}`;
                            }
                            return attrStr;
                        }).join('<br>')}
                    </td>
                    <td>${cat.created_at || ''}</td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error(err);
            alert('Lỗi server khi load categories');
        });
}

// Gọi loadCategories khi trang load
document.addEventListener('DOMContentLoaded', loadCategories);