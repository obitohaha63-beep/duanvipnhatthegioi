

document.addEventListener("DOMContentLoaded", () => {

    const addProductForm = document.getElementById("addProductForm");
    const categoryDropdown = document.getElementById("categorySelect");
    const previewImageElement = document.getElementById("previewImage");
    const imageInputElement = document.getElementById("imageInput");

    fetch("../assets/php/get_categories.php")
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                
                responseData.data.forEach(category => {
                    
                    const optionElement = document.createElement("option");
                    optionElement.value = category.id;          
                    optionElement.textContent = category.name;  
                    
                    
                    categoryDropdown.appendChild(optionElement);
                });
            } else {
                console.error("Lỗi tải danh mục:", responseData.message);
            }
        })
        .catch(error => {
            console.error("Lỗi kết nối:", error);
            alert(" Không thể tải danh mục. Vui lòng tải lại trang.");
        });

    

    imageInputElement.addEventListener("change", function(event) {
        
        const selectedFile = event.target.files[0];  

        
        if (selectedFile) {
            
            
            const previewImageURL = URL.createObjectURL(selectedFile);
            
            
            previewImageElement.src = previewImageURL;
        }
    });

    addProductForm.addEventListener("submit", (event) => {
        
        event.preventDefault();

        
        
        
        const formDataToSend = new FormData(addProductForm);

        
        
        console.log("=== DỮ LIỆU FORM ===");
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        
        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formDataToSend  
        })
        .then(response => response.json())
        .then(responseData => {
            
            console.log("Phản hồi từ server:", responseData);

            
            if (responseData.success) {
                
                alert(" " + responseData.message);
                
                
                addProductForm.reset();
                
                
                previewImageElement.src = "";
            } else {
                
                alert(" Lỗi: " + responseData.message);
            }
        })
        .catch(error => {
            
            console.error("Chi tiết lỗi:", error);
            alert(" Lỗi kết nối server. Vui lòng thử lại!");
        });
    });
});