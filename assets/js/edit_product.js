



document.addEventListener('DOMContentLoaded', () => {
    
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    
    const categorySelect = document.getElementById('categorySelect');
    const brandInput = document.getElementById('brandInput');
    const nameInput = document.getElementById('nameInput');
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

    
    let userRemovedImage = false;

    

    fetch('../assets/php/get_categories.php')
        .then(response => response.json())
        .then(categoryData => {
            if (categoryData.success) {
                
                categorySelect.innerHTML = categoryData.data.map(category =>
                    `<option value="${category.id}">${category.name}</option>`
                ).join('');
            }
        })
        .catch(error => console.error("Lỗi tải danh mục:", error));

    

    fetch('../assets/php/get_product_detail.php?id=' + productId)
        .then(response => response.json())
        .then(productData => {
            if (productData.success) {
                const product = productData.product;

                
                productIdInput.value = product.id;
                brandInput.value = product.brand;
                nameInput.value = product.name;
                costInput.value = product.cost_price;
                profitInput.value = product.profit_rate;
                quantityInput.value = product.quantity;
                descriptionInput.value = product.description;
                statusSelect.value = product.status;
                categorySelect.value = product.category_id;

                
                if (product.image_url) {
                    
                    previewImage.src = '../' + product.image_url;
                    imagePreviewContainer.style.display = 'inline-block';
                    imageInput.style.display = 'none';
                } else {
                    
                    imagePreviewContainer.style.display = 'none';
                    imageInput.style.display = 'block';
                }
            } else {
                alert(" Không tìm thấy sản phẩm!");
            }
        })
        .catch(error => {
            console.error("Lỗi tải sản phẩm:", error);
            alert(" Lỗi tải thông tin sản phẩm!");
        });

    

    removeImageBtn.addEventListener('click', () => {
        
        previewImage.src = '';
        imagePreviewContainer.style.display = 'none';
        
        
        imageInput.style.display = 'block';
        imageInput.value = '';
        
        
        userRemovedImage = true;
    });

    

    imageInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            
            const fileReader = new FileReader();
            
            
            fileReader.onload = () => {
                
                previewImage.src = fileReader.result;
                imagePreviewContainer.style.display = 'inline-block';
                imageInput.style.display = 'none';
            };
            
            
            fileReader.readAsDataURL(selectedFile);
            
            
            userRemovedImage = false;
        }
    });

    

    document.getElementById('editProductForm').addEventListener('submit', (event) => {
        event.preventDefault();  

        
        
        const formDataToSend = new FormData(event.target);
        
        
        formDataToSend.append('remove_image', userRemovedImage ? 1 : 0);

        
        fetch('../assets/php/update_product.php', {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => response.json())
        .then(updateResult => {
            alert(updateResult.message);
            
            if (updateResult.success) {
                
                window.location.href = 'QuanLySanPham.php';
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert(" Lỗi cập nhật sản phẩm. Vui lòng thử lại.");
        });
    });
});