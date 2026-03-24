document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

function loadCategories() {
  fetch('../assets/php/get_categories.php')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('categorySelect');

      data.data.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
      });

      loadAttributes(select.value);
    });

  document.getElementById('categorySelect').addEventListener('change', function(){
    loadAttributes(this.value);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadBrands();  // <-- gọi load brands
});

function loadBrands() {
  fetch('../assets/php/get_brands.php')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('brandSelect');
      select.innerHTML = ''; // reset trước khi load
      data.data.forEach(b => {
        select.innerHTML += `<option value="${b.id}">${b.name}</option>`;
      });
    });
}

function loadAttributes(categoryId) {
  fetch('../assets/php/get_attributes.php?category_id=' + categoryId)
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById('dynamicAttributes');
      container.innerHTML = '';

      data.data.forEach(attr => {

        let html = `<div class="form-group">
          <label>${attr.name}</label>`;

        if(attr.type === 'select'){

  if(attr.options.length > 0){
    html += `<select data-attr-id="${attr.id}" class="attr-input">`;

    attr.options.forEach(opt => {
      html += `<option value="${opt.id}">${opt.value}</option>`;
    });

    html += `</select>`;
  } else {
    // KHÔNG có option → cho nhập tay
    html += `<input 
                type="text" 
                placeholder="Nhập giá trị..." 
                class="attr-input" 
                data-attr-id="${attr.id}"
                data-type="text-create"
             >`;
  }
} else {
          html += `<input type="text" class="attr-input" data-attr-id="${attr.id}">`;
        }

        html += `</div>`;

        container.insertAdjacentHTML('beforeend', html);
      });

    });
}

document.getElementById('addProductForm').addEventListener('submit', function(e){
  e.preventDefault();

  const formData = new FormData();

  // BASIC
  formData.append('name', this.name.value);
  formData.append('category_id', this.category_id.value);
  formData.append('brand_id', this.brand_id.value); // <-- thêm đây
  formData.append('cost_price', this.cost_price.value);
  formData.append('profit_percent', this.profit_percent.value);
  formData.append('description', this.description.value);
  formData.append('quantity', this.quantity.value);
formData.append('brand_id', document.getElementById('brandSelect').value);

  // IMAGE
  const image = document.getElementById('imageInput').files[0];
  if(image){
    formData.append('image', image);
  }

  // ATTRIBUTES
  const attrs = [];
  document.querySelectorAll('.attr-input').forEach(input => {
    attrs.push({
      attribute_id: input.dataset.attrId,
      value: input.value
    });
  });
  formData.append('attributes', JSON.stringify(attrs));

  fetch('../assets/php/add_product.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.status === 'success'){
      window.location.href = 'QuanLySanPham.html';
    }
  });
});

attrs.push({
  attribute_id: input.dataset.attrId,
  value: input.value
});