

document.addEventListener("DOMContentLoaded", () => {
    
    const addCategoryForm = document.getElementById("addCate");

    
    addCategoryForm.addEventListener("submit", (event) => {
        
        event.preventDefault();

        
        
        const formDataToSend = new FormData(addCategoryForm);

        
        fetch("../assets/php/add_category.php", {
            method: "POST",
            body: formDataToSend
        })
        
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                
                alert(" " + responseData.message);
                
                
                addCategoryForm.reset();
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