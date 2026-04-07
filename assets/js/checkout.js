




async function loadCheckout() {
    
    const response = await fetch("../assets/php/get_cart.php");
    const cartData = await response.json();

    
    if (!cartData.success) {
        console.error("Lỗi tải giỏ hàng:", cartData.message);
        return;
    }

    
    const checkoutItemsContainer = document.getElementById("checkout-items");
    checkoutItemsContainer.innerHTML = ""; 

    
    let totalPrice = 0; 

    
    cartData.cart.forEach(product => {
        
        totalPrice += product.price * product.quantity;

        
        const productHTML = `
            <p>
                <strong>${product.name}</strong><br>
                Số lượng: x${product.quantity} - ${Number(product.price).toLocaleString()}₫
            </p>
        `;

        checkoutItemsContainer.innerHTML += productHTML;
    });

    
    const formattedTotal = totalPrice.toLocaleString() + "₫";
    
    document.getElementById("subtotal").innerText = formattedTotal;
    document.getElementById("total").innerText = formattedTotal;
}



async function loadUserInformation() {
    
    const response = await fetch("../assets/php/get_users.php");
    const responseText = await response.text(); 

    
    let userData;
    try {
        userData = JSON.parse(responseText); 
    } catch (error) {
        
        console.error("Lỗi: Response không phải định dạng JSON:", responseText);
        return;
    }

    
    if (!userData.success) {
        console.error("Lỗi từ server:", userData.message);
        return;
    }

    
    const user = userData.user;
    
    
    document.getElementById("fullname").value = user.name || "";
    
    
    document.getElementById("phone").value = user.phone || "";
    
    
    document.getElementById("default-address").innerText = 
        user.default_address || "⚠️ Chưa cập nhật địa chỉ";
}



async function placeOrder() {
    
    
    const addressTypeRadios = document.querySelectorAll('input[name="address_type"]');
    
    
    let selectedAddressType = null;
    addressTypeRadios.forEach(radio => {
        if (radio.checked) {
            selectedAddressType = radio.value;
        }
    });

    let shippingAddress = "";

    if (selectedAddressType === "default") {
        
        shippingAddress = document.getElementById("default-address").innerText;
    } else if (selectedAddressType === "new") {
        
        const city = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const ward = document.getElementById("ward").value.trim();
        const detailAddress = document.getElementById("detail_address").value.trim();

        
        shippingAddress = `${detailAddress}, ${ward}, ${district}, ${city}`;

        
        if (!city || !district || !ward || !detailAddress) {
            alert(" Vui lòng điền đầy đủ các trường địa chỉ!");
            return;
        }
    }

    
    const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
    let selectedPaymentMethod = null;
    
    paymentMethodRadios.forEach(radio => {
        if (radio.checked) {
            selectedPaymentMethod = radio.value;
        }
    });

    if (!selectedPaymentMethod) {
        alert(" Vui lòng chọn phương thức thanh toán!");
        return;
    }

    
    const response = await fetch("../assets/php/place_order.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address: shippingAddress,
            payment_method: selectedPaymentMethod
        })
    });

    const orderResult = await response.json();

    
    if (orderResult.success) {
        
        localStorage.setItem("last_order_id", orderResult.order_id);
        
        alert(" Đặt hàng thành công!");
        
        
        window.location.href = "dathangthanhcong.php";
    } else {
        
        alert(" Lỗi: " + orderResult.message);
    }
}



function setupAddressToggle() {
    const addressRadios = document.querySelectorAll('input[name="address_type"]');
    const newAddressFormContainer = document.getElementById("new-address-form");

    
    addressRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            
            if (radio.value === "new" && radio.checked) {
                newAddressFormContainer.style.display = "block";
            }
            
            else if (radio.value === "default" && radio.checked) {
                newAddressFormContainer.style.display = "none";
            }
        });
    });
}



function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    const bankInfoContainer = document.getElementById("bank-info");
    const onlineInfoContainer = document.getElementById("online-info");

    
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            
            bankInfoContainer.style.display = "none";
            onlineInfoContainer.style.display = "none";

            
            if (radio.value === "bank_transfer" && radio.checked) {
                bankInfoContainer.style.display = "block";
            } else if (radio.value === "online" && radio.checked) {
                onlineInfoContainer.style.display = "block";
            }
        });
    });
}



loadUserInformation();      
loadCheckout();             
setupAddressToggle();       
setupPaymentMethodToggle(); 