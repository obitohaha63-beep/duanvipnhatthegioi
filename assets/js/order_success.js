




async function loadOrderDetail() {
    
    
    const orderId = localStorage.getItem("last_order_id");

    
    if (!orderId) {
        alert(" Không tìm thấy mã đơn hàng!");
        return;
    }

    
    document.getElementById("order-id").innerText = orderId;

    try {
        
        const response = await fetch(`../assets/php/get_order_detail.php?id=${orderId}`);
        const orderData = await response.json();

        
        if (!orderData.success) {
            alert(" Lỗi: " + orderData.message);
            return;
        }

        const order = orderData.order;        
        const orderItems = orderData.items;   

        
        document.getElementById("customer-name").value = order.customer_name || "";
        document.getElementById("phone").value = order.phone || "";
        document.getElementById("address").value = order.delivery_address || "";

        
        let paymentMethodText = "";
        
        switch (order.payment_method) {
            case "cash":
                paymentMethodText = " Thanh toán khi nhận hàng";
                break;
            case "bank_transfer":
                paymentMethodText = " Chuyển khoản ngân hàng";
                break;
            case "online":
                paymentMethodText = " Thanh toán online";
                break;
            default:
                paymentMethodText = order.payment_method;
        }

        document.getElementById("payment").value = paymentMethodText;

        
        const itemsContainer = document.getElementById("order-items");
        itemsContainer.innerHTML = "";  

        let totalAmount = 0;  

        
        orderItems.forEach(item => {
            
            const itemSubtotal = item.quantity * item.selling_price;
            totalAmount += itemSubtotal;  

            
            const tableRow = `
                <tr>
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>${Number(item.selling_price).toLocaleString('vi-VN')}₫</td>
                    <td>${Number(itemSubtotal).toLocaleString('vi-VN')}₫</td>
                </tr>
            `;

            itemsContainer.innerHTML += tableRow;
        });

        
        document.getElementById("total").innerText = 
            totalAmount.toLocaleString('vi-VN') + "₫";

    } catch (error) {
        console.error("Chi tiết lỗi:", error);
        alert(" Lỗi tải chi tiết đơn hàng. Vui lòng tải lại trang.");
    }
}



loadOrderDetail();