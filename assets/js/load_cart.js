




function loadCartCount() {
    
    
    fetch("../assets/php/get_cart_count.php")
        
        .then(response => response.json())
        
        .then(responseData => {
            
            if (responseData.success) {
                
                
                const cartBadgeElement = document.querySelector(".jscart");
                
                
                cartBadgeElement.innerText = responseData.count;
            }
        })
        
        .catch(error => {
            console.error("Lỗi tải số lượng giỏ hàng:", error);
        });
}



loadCartCount();