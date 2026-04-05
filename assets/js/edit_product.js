document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const categorySelect = document.getElementById('categorySelect');
  const brandInput = document.getElementById('brandInput');
  const nameInput = document.getElementById('nameInput');
  const colorInput = document.getElementById('colorInput');
  const sizeInput = document.getElementById('sizeInput');
  const costInput = document.getElementById('costInput');
  const profitInput = document.getElementById('profitInput');
  const quantityInput = document.getElementById('quantityInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const statusSelect = document.getElementById('statusSelect');

  const previewImage = document.getElementById('previewImage');
  const imageInput = document.getElementById('imageInput');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  const removeImageBtn = document.getElementById('removeImageBtn');

  const productIdInput = document.getElementById('productId');

  let removeImage = false;

  // Load category
  fetch('../assets/php/get_categories.php')
    .then(res => res.json())
    .then(res => {
      if(res.success){
        categorySelect.innerHTML = res.data.map(c =>
          `<option value="${c.id}">${c.name}</option>`
        ).join('');
      }
    });

  // Load product
  fetch('../assets/php/get_product_detail.php?id=' + productId)
    .then(res => res.json())
    .then(data => {
      if(data.success){
        const p = data.product;

        productIdInput.value = p.id;
        brandInput.value = p.brand;
        nameInput.value = p.name;
        colorInput.value = p.color;
        sizeInput.value = p.size;
        costInput.value = p.cost_price;
        profitInput.value = p.profit_rate;
        quantityInput.value = p.quantity;
        descriptionInput.value = p.description;
        statusSelect.value = p.status;
        categorySelect.value = p.category_id;

        // 🔥 FIX HIỂN THỊ ẢNH
        if (p.image_url) {
          previewImage.src = '../' + p.image_url;
          imagePreviewContainer.style.display = 'inline-block';
          imageInput.style.display = 'none';
        } else {
          imagePreviewContainer.style.display = 'none';
          imageInput.style.display = 'block';
        }
      }
    });

  // XÓA ẢNH
  removeImageBtn.addEventListener('click', () => {
    previewImage.src = '';
    imagePreviewContainer.style.display = 'none';
    imageInput.style.display = 'block';
    imageInput.value = '';
    removeImage = true;
  });

  // CHỌN ẢNH MỚI
  imageInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        previewImage.src = reader.result;
        imagePreviewContainer.style.display = 'inline-block';
        imageInput.style.display = 'none';
      };
      reader.readAsDataURL(file);

      removeImage = false;
    }
  });

  // SUBMIT
  document.getElementById('editProductForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append('remove_image', removeImage ? 1 : 0);

    fetch('../assets/php/update_product.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(resp => {
      alert(resp.message);
      if(resp.success) window.location.href = 'QuanLySanPham.php';
    });
  });
});