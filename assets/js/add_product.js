// Load category và attributes động
window.addEventListener("DOMContentLoaded", () => {
  fetch('../assets/php/get_categories.php')
    .then(res => res.json())
    .then(data => {
      if(data.status === 'success'){
        const categorySelect = document.getElementById('categorySelect');
        data.data.forEach(cat => {
          const option = document.createElement('option');
          option.value = cat.id;
          option.textContent = cat.name;
          option.dataset.attributes = JSON.stringify(cat.attributes); // lưu attributes để dùng
          categorySelect.appendChild(option);
        });

        // Khi chọn category, hiển thị thuộc tính
        categorySelect.addEventListener('change', function() {
          const selected = this.selectedOptions[0];
          const attrs = JSON.parse(selected.dataset.attributes);
          const container = document.getElementById('dynamicAttributes');
          container.innerHTML = '';

          attrs.forEach(attr => {
            let html = `<label>${attr.name}:</label>`;
            if(attr.type === 'select'){
              html += `<select name="attr_${attr.id}">`;
              attr.options.forEach(opt => {
                html += `<option value="${opt}">${opt}</option>`;
              });
              html += `</select>`;
            } else if(attr.type === 'text'){
              html += `<input type="text" name="attr_${attr.id}">`;
            } else if(attr.type === 'number'){
              html += `<input type="number" name="attr_${attr.id}">`;
            }
            container.insertAdjacentHTML('beforeend', html);
          });
        });

        categorySelect.dispatchEvent(new Event('change')); // load mặc định
      }
    });
});

// Submit form thêm sản phẩm
document.getElementById('addProductForm').addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(this);

  fetch('../assets/php/add_product.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.status === 'success'){
      this.reset();
      document.getElementById('dynamicAttributes').innerHTML = '';
    }
  })
  .catch(err => alert('Lỗi server'));
});