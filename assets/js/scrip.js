



document.addEventListener("DOMContentLoaded", () => {
    
    const addCategoryForm = document.getElementById("addCate");

    
    addCategoryForm.addEventListener("submit", async (event) => {
        
        event.preventDefault();

        
        
        const formDataToSend = new FormData(addCategoryForm);

        try {
            
            const serverResponse = await fetch("add_category.php", {
                method: "POST",        
                body: formDataToSend   
            });

            
            const responseData = await serverResponse.json();

            
            if (responseData.success) {
                
                alert(" Thêm danh mục thành công!");
                
                
                addCategoryForm.reset();
                
                
                window.location.href = "DanhMuc.php";
            } else {
                
                alert(" Lỗi: " + responseData.message);
            }
        } catch (error) {
            
            console.error("Chi tiết lỗi:", error);
            alert(" Có lỗi xảy ra khi gửi dữ liệu! Vui lòng thử lại.");
        }
    });
});