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
  const productIdInput = document.getElementById('productId');

  // Load danh mục
fetch('../assets/php/get_categories.php')
  .then(res => res.json())
  .then(res => {
    if(res.success){
      const categories = res.data; // phải lấy từ res.data
      categorySelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    } else {
      alert('Không tải được danh mục!');
    }
  });

  // Load dữ liệu sản phẩm
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
        previewImage.src = p.image_url ? '../' + p.image_url : '';
      } else {
        alert('Sản phẩm không tồn tại!');
      }
    });

  // Preview hình mới
  document.getElementById('imageInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => previewImage.src = reader.result;
      reader.readAsDataURL(file);
    }
  });

  // Submit cập nhật
  document.getElementById('editProductForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

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

console.log("Product ID:", productId);