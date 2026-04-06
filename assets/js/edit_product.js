/**
 * File: edit_product.js
 * Mục đích: Xử lý form chỉnh sửa sản phẩm
 * 
 * Chức năng chính:
 *   1. Lấy ID sản phẩm từ URL
 *   2. Tải danh mục từ server
 *   3. Tải thông tin sản phẩm cũ từ database
 *   4. Hiển thị dữ liệu vào form
 *   5. Xử lý thay đổi ảnh (preview, xóa, upload mới)
 *   6. Gửi dữ liệu cập nhật lên server
 */

// DOMContentLoaded = chờ HTML tải xong mới chạy code
document.addEventListener('DOMContentLoaded', () => {
    // ========== BƯỚC 1: LẤY ID SẢN PHẨM TỪ URL ==========
    // URL: edit.php?id=123
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // ========== BƯỚC 2: LẤY THAM CHIẾU ĐẾN CÁC INPUT ==========
    const categorySelect = document.getElementById('categorySelect');
    const brandInput = document.getElementById('brandInput');
    const nameInput = document.getElementById('nameInput');
    const costInput = document.getElementById('costInput');
    const profitInput = document.getElementById('profitInput');
    const quantityInput = document.getElementById('quantityInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const statusSelect = document.getElementById('statusSelect');

    // Các phần tử liên quan đến ảnh
    const previewImage = document.getElementById('previewImage');
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const productIdInput = document.getElementById('productId');

    // Cờ kiểm tra người dùng có bấm xóa ảnh không
    let userRemovedImage = false;

    /**
     * BƯỚC 3: TẢI DANH MỤC VỀ DROPDOWN
     */
    fetch('../assets/php/get_categories.php')
        .then(response => response.json())
        .then(categoryData => {
            if (categoryData.success) {
                // Duyệt qua từng danh mục
                categorySelect.innerHTML = categoryData.data.map(category =>
                    `<option value="${category.id}">${category.name}</option>`
                ).join('');
            }
        })
        .catch(error => console.error("Lỗi tải danh mục:", error));

    /**
     * BƯỚC 4: TẢI THÔNG TIN SẢN PHẨM CŨ
     */
    fetch('../assets/php/get_product_detail.php?id=' + productId)
        .then(response => response.json())
        .then(productData => {
            if (productData.success) {
                const product = productData.product;

                // ========== ĐIỀN SỰ LIỆU VÀO FORM ==========
                productIdInput.value = product.id;
                brandInput.value = product.brand;
                nameInput.value = product.name;
                costInput.value = product.cost_price;
                profitInput.value = product.profit_rate;
                quantityInput.value = product.quantity;
                descriptionInput.value = product.description;
                statusSelect.value = product.status;
                categorySelect.value = product.category_id;

                // ========== HIỂN THỊ ẢNH CỦA SẢN PHẨM ==========
                if (product.image_url) {
                    // Nếu có ảnh → hiển thị preview
                    previewImage.src = '../' + product.image_url;
                    imagePreviewContainer.style.display = 'inline-block';
                    imageInput.style.display = 'none';
                } else {
                    // Nếu không có ảnh → hiển thị input tải file
                    imagePreviewContainer.style.display = 'none';
                    imageInput.style.display = 'block';
                }
            } else {
                alert("❌ Không tìm thấy sản phẩm!");
            }
        })
        .catch(error => {
            console.error("Lỗi tải sản phẩm:", error);
            alert("❌ Lỗi tải thông tin sản phẩm!");
        });

    /**
     * BƯỚC 5: XỬ LÝ NÚT XÓA ẢNH
     */
    removeImageBtn.addEventListener('click', () => {
        // Xóa preview ảnh
        previewImage.src = '';
        imagePreviewContainer.style.display = 'none';
        
        // Hiển thị input tải file
        imageInput.style.display = 'block';
        imageInput.value = '';
        
        // Đánh dấu là đã xóa ảnh
        userRemovedImage = true;
    });

    /**
     * BƯỚC 6: XỬ LÝ KHI NGƯỜI DÙNG CHỌN ẢNH MỚI
     * 
     * FileReader = công cụ để đọc file từ máy người dùng
     * readAsDataURL = chuyển ảnh thành URL tạm để preview
     */
    imageInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            // Tạo FileReader để đọc file
            const fileReader = new FileReader();
            
            // Khi đọc xong file
            fileReader.onload = () => {
                // Hiển thị preview ảnh
                previewImage.src = fileReader.result;
                imagePreviewContainer.style.display = 'inline-block';
                imageInput.style.display = 'none';
            };
            
            // Bắt đầu đọc file dưới dạng Data URL
            fileReader.readAsDataURL(selectedFile);
            
            // Reset cờ
            userRemovedImage = false;
        }
    });

    /**
     * BƯỚC 7: XỬ LÝ SUBMIT FORM
     */
    document.getElementById('editProductForm').addEventListener('submit', (event) => {
        event.preventDefault();  // Ngăn reload trang

        // ========== CHUẨN BỊ DỮ LIỆU ==========
        // FormData = dùng để gửi dữ liệu kể cả file
        const formDataToSend = new FormData(event.target);
        
        // Thêm flag để báo server có xóa ảnh hay không
        formDataToSend.append('remove_image', userRemovedImage ? 1 : 0);

        // ========== GỬI LÊN SERVER ==========
        fetch('../assets/php/update_product.php', {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => response.json())
        .then(updateResult => {
            alert(updateResult.message);
            
            if (updateResult.success) {
                // Chuyển hướng về trang quản lý sản phẩm
                window.location.href = 'QuanLySanPham.php';
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert("❌ Lỗi cập nhật sản phẩm. Vui lòng thử lại.");
        });
    });
});