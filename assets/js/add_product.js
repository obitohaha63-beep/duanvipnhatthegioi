

document.addEventListener("DOMContentLoaded", () => {

    const addProductForm = document.getElementById("addProductForm");
    const categoryDropdown = document.getElementById("categorySelect");
    const previewImageElement = document.getElementById("previewImage");
    const imageInputElement = document.getElementById("imageInput");

    fetch("../assets/php/get_categories.php")
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                // Duyệt qua từng danh mục
                responseData.data.forEach(category => {
                    // Tạo phần tử <option> mới
                    const optionElement = document.createElement("option");
                    optionElement.value = category.id;          // Giá trị (ID)
                    optionElement.textContent = category.name;  // Hiển thị (Tên)
                    
                    // Thêm vào dropdown
                    categoryDropdown.appendChild(optionElement);
                });
            } else {
                console.error("Lỗi tải danh mục:", responseData.message);
            }
        })
        .catch(error => {
            console.error("Lỗi kết nối:", error);
            alert("❌ Không thể tải danh mục. Vui lòng tải lại trang.");
        });

    /**
     * BƯỚC 3: PREVIEW ẢNH TRƯỚC KHI UPLOAD
     * 
     * Ý tưởng:
     *   - Người dùng chọn file ảnh
     *   - Tạo URL tạm và hiển thị lên màn hình
     *   - Người dùng thấy ảnh sẽ được upload như thế nào
     */
    imageInputElement.addEventListener("change", function(event) {
        // Lấy file đã chọn
        const selectedFile = event.target.files[0];  // files[0] = file đầu tiên

        // Kiểm tra xem có chọn file không
        if (selectedFile) {
            // createObjectURL() = tạo URL tạm cho file
            // URL này chỉ tồn tại trong bộ nhớ máy tính
            const previewImageURL = URL.createObjectURL(selectedFile);
            
            // Đặt ảnh preview
            previewImageElement.src = previewImageURL;
        }
    });

    addProductForm.addEventListener("submit", (event) => {
        // Ngăn chặn hành động mặc định của form (reload trang)
        event.preventDefault();

        // ========== BƯỚC 4.1: CHUẨN BỊ DỮ LIỆU ==========
        // FormData = đối tượng dùng để gửi file + dữ liệu
        // (Không thể dùng JSON để gửi file)
        const formDataToSend = new FormData(addProductForm);

        // ========== BƯỚC 4.2: KIỂM TRA DỮ LIỆU (TỪY CHỌN) ==========
        // In ra console để debug (xem dữ liệu được lấy đúng không)
        console.log("=== DỮ LIỆU FORM ===");
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        // ========== BƯỚC 4.3: GỬI DỮ LIỆU LÊN SERVER ==========
        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formDataToSend  // Không cần headers khi gửi FormData
        })
        .then(response => response.json())
        .then(responseData => {
            // In ra console để debug
            console.log("Phản hồi từ server:", responseData);

            // ========== BƯỚC 4.4: XỬ LÝ KẾT QUẢ ==========
            if (responseData.success) {
                // Thành công
                alert(" " + responseData.message);
                
                // Xóa dữ liệu form
                addProductForm.reset();
                
                // Xóa ảnh preview
                previewImageElement.src = "";
            } else {
                // Thất bại
                alert(" Lỗi: " + responseData.message);
            }
        })
        .catch(error => {
            // Xử lý lỗi kết nối
            console.error("Chi tiết lỗi:", error);
            alert(" Lỗi kết nối server. Vui lòng thử lại!");
        });
    });
});