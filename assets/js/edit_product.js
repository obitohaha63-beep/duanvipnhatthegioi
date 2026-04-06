// Sự kiện này đảm bảo HTML load xong thì code JS mới chạy
document.addEventListener('DOMContentLoaded', () => {
  // Lấy ID sản phẩm từ URL (ví dụ: ?id=5)
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Lấy các tham chiếu đến các thẻ input trên giao diện
  const categorySelect = document.getElementById('categorySelect');
  const brandInput = document.getElementById('brandInput');
  const nameInput = document.getElementById('nameInput');
  // Đã xóa colorInput và sizeInput
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

  let removeImage = false; // Cờ kiểm tra xem user có bấm xóa ảnh không

  // 1. Tải danh sách danh mục (Categories)
  fetch('../assets/php/get_categories.php')
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        categorySelect.innerHTML = res.data.map(c =>
          `<option value="${c.id}">${c.name}</option>`
        ).join('');
      }
    });

  // 2. Tải thông tin chi tiết của sản phẩm để điền vào form
  fetch('../assets/php/get_product_detail.php?id=' + productId)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const p = data.product;

        // Đổ dữ liệu từ Database vào các ô input
        productIdInput.value = p.id;
        brandInput.value = p.brand;
        nameInput.value = p.name;
        // Đã xóa p.color và p.size
        costInput.value = p.cost_price;
        profitInput.value = p.profit_rate;
        quantityInput.value = p.quantity;
        descriptionInput.value = p.description;
        statusSelect.value = p.status;
        categorySelect.value = p.category_id;

        // Xử lý hiển thị ảnh hiện tại của sản phẩm
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

  // 3. Xử lý nút xóa ảnh
  removeImageBtn.addEventListener('click', () => {
    previewImage.src = '';
    imagePreviewContainer.style.display = 'none';
    imageInput.style.display = 'block';
    imageInput.value = '';
    removeImage = true; // Đánh dấu là đã xóa ảnh
  });

  // 4. Xử lý khi chọn ảnh mới từ máy tính
  imageInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        previewImage.src = reader.result;
        imagePreviewContainer.style.display = 'inline-block';
        imageInput.style.display = 'none';
      };
      reader.readAsDataURL(file); // Hiển thị ảnh tạm thời (preview)
      removeImage = false;
    }
  });

  // 5. Xử lý khi bấm nút Submit Form
  document.getElementById('editProductForm').addEventListener('submit', e => {
    e.preventDefault(); // Ngăn chặn hành vi reload trang mặc định
    
    // Gói toàn bộ dữ liệu trong form
    const formData = new FormData(e.target);
    formData.append('remove_image', removeImage ? 1 : 0);

    // Gửi lên server
    fetch('../assets/php/update_product.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(resp => {
      alert(resp.message);
      if (resp.success) {
        window.location.href = 'QuanLySanPham.php'; // Chuyển trang nếu thành công
      }
    });
  });
});