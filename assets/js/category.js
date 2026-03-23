document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

function loadCategories() {
  fetch('../assets/php/get_categories.php')
    .then(res => res.json())
    .then(data => {

      const table = document.getElementById('categoryTable');
      table.innerHTML = '';

      data.data.forEach(cate => {

        const row = `
          <tr>
            <td>${cate.id}</td>
            <td>${cate.name}</td>
            <td>${cate.description ?? ''}</td>
            <td>${formatDate(cate.created_at)}</td>
            <td>
              <button onclick="editCategory(${cate.id}, '${cate.name}', '${cate.description ?? ''}')">
                Sửa
              </button>
              <button onclick="deleteCategory(${cate.id})">
                Xóa
              </button>
            </td>
          </tr>
        `;

        table.insertAdjacentHTML('beforeend', row);
      });

    });
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}

// ===== DELETE =====
function deleteCategory(id) {
  if(confirm("Bạn có chắc muốn xóa danh mục này?")){
    fetch('../assets/php/delete_category.php?id=' + id)
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadCategories();
      });
  }
}

// ===== EDIT =====
function editCategory(id, name, description) {

  const newName = prompt("Nhập tên mới:", name);
  if(newName === null) return;

  const newDesc = prompt("Nhập mô tả:", description);

  fetch('../assets/php/update_category.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      name: newName,
      description: newDesc
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadCategories();
  });
}