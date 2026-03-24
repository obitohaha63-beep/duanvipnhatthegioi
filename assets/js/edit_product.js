document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    alert("Thiếu ID sản phẩm");
    return;
  }

  // Load categories & brands để select
  loadCategories();
  loadBrands();

  // Load sản phẩm
  fetch(`../assets/php/get_product_detail.php?id=${productId}`)
    .then(res => res.json())
    .then(res => {
      if(res.status !== 'success'){
        alert(res.message);
        return;
      }
      const data = res.data;
      fillForm(data);
    })
    .catch(err => {
      console.error(err);
      alert("Lỗi server");
    });
});

// ===== LOAD CATEGORY =====
function loadCategories() {
  fetch('../assets/php/get_categories.php?category_id=0') // category_id=0 để JS fill dynamic attributes later
    .then(res => res.json())
    .then(res => {
      const select = document.getElementById('categorySelect');
      select.innerHTML = '';
      if(res.status==='success'){
        res.data.forEach(c => {
          const option = document.createElement('option');
          option.value = c.id;
          option.textContent = c.name;
          select.appendChild(option);
        });
      }
    });
}

// ===== LOAD BRANDS =====
function loadBrands() {
  fetch('../assets/php/get_brands.php')
    .then(res => res.json())
    .then(res => {
      const select = document.getElementById('brandSelect');
      select.innerHTML = '';
      if(res.status==='success'){
        res.data.forEach(b => {
          const option = document.createElement('option');
          option.value = b.id;
          option.textContent = b.name;
          select.appendChild(option);
        });
      }
    });
}

// ===== FILL FORM =====
function fillForm(data) {
  const p = data.product;
  const firstVariant = data.variants[0] ?? {};
  const attributes = data.attributes ?? [];

  // BASIC
  document.querySelector('[name="name"]').value = p.name ?? '';
  document.querySelector('[name="category_id"]').value = p.category_id ?? '';
  document.querySelector('[name="brand_id"]').value = p.brand_id ?? '';
  document.querySelector('[name="cost_price"]').value = p.cost_price ?? 0;
  document.querySelector('[name="profit_percent"]').value = p.profit_percent ?? 0;
  document.querySelector('[name="quantity"]').value = firstVariant.quantity ?? 0;
  document.querySelector('[name="description"]').value = p.description ?? '';
  document.querySelector('[name="status"]').value = p.status ?? 'active';

  // IMAGE
  const previewImg = document.getElementById('previewImage');
  if(data.images && data.images.length>0){
    previewImg.src = '../assets/uploads/' + data.images[0].image_url;
  }

  // DYNAMIC ATTRIBUTES
  const container = document.getElementById('dynamicAttributes');
  container.innerHTML = '';

  attributes.forEach(attr => {
    const div = document.createElement('div');
    div.classList.add('attribute-item');

    const label = document.createElement('label');
    label.textContent = attr.name;
    div.appendChild(label);

    let input;

    // Lấy giá trị hiện tại từ variant
    let currentValue = '';
    if(firstVariant.attributes){
      const match = firstVariant.attributes.find(a=>a.attribute_id==attr.id);
      if(match){
        currentValue = attr.type==='text' ? match.value_text : match.option_id;
      }
    }

    if(attr.type === 'text'){
      input = document.createElement('input');
      input.type = 'text';
      input.value = currentValue ?? '';
      input.name = 'attr_' + attr.id;
    } else if(attr.type === 'select'){
      input = document.createElement('select');
      input.name = 'attr_' + attr.id;
      input.innerHTML = '<option value="">-- Chọn --</option>';
      (attr.options ?? []).forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.id;
        option.textContent = opt.value;
        if(opt.id == currentValue) option.selected = true;
        input.appendChild(option);
      });
    }

    div.appendChild(input);
    container.appendChild(div);
  });

  // Cập nhật preview giá
  updatePricePreview();
}

// ===== PRICE PREVIEW =====
const costInput = document.querySelector('[name="cost_price"]');
const profitInput = document.querySelector('[name="profit_percent"]');
const preview = document.getElementById('previewPrice');

function updatePricePreview(){
  const cost = parseFloat(costInput.value) || 0;
  const profit = parseFloat(profitInput.value) || 0;
  const price = cost * (1 + profit/100);
  preview.innerText = price.toLocaleString('vi-VN') + 'đ';
}

costInput.addEventListener('input', updatePricePreview);
profitInput.addEventListener('input', updatePricePreview);

// ===== IMAGE PREVIEW =====
document.getElementById('imageInput').addEventListener('change', function(e){
  const file = e.target.files[0];
  if(file){
    const url = URL.createObjectURL(file);
    document.getElementById('previewImage').src = url;
  }
});

// ===== SUBMIT FORM =====
document.getElementById('addProductForm').addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // BASIC
  formData.append('id', productId);
  formData.append('name', this.name.value);
  formData.append('category_id', this.category_id.value);
  formData.append('brand_id', this.brand_id.value);
  formData.append('cost_price', this.cost_price.value);
  formData.append('profit_percent', this.profit_percent.value);
  formData.append('quantity', this.quantity.value);
  formData.append('description', this.description.value);
  formData.append('status', this.status.value);

  // IMAGE
  const image = document.getElementById('imageInput').files[0];
  if(image) formData.append('image', image);

  // ATTRIBUTES
  document.querySelectorAll('#dynamicAttributes [name^="attr_"]').forEach(input=>{
    formData.append(input.name, input.value);
  });

  fetch('../assets/php/update_product.php',{
    method: 'POST',
    body: formData
  })
  .then(res=>res.json())
  .then(data=>{
    alert(data.message);
    if(data.status==='success'){
      window.location.href = 'product_list.html';
    }
  })
  .catch(err=>{
    console.error(err);
    alert('Lỗi server');
  });
});