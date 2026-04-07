
function getOrderId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}


function formatMoney(amount) {
    return Number(amount).toLocaleString('vi-VN') + '₫';
}

async function loadOrderDetail() {
    const id = getOrderId();

    if (!id) {
        alert("Không có ID đơn hàng");
        return;
    }

    try {
        const res = await fetch(`../assets/php/get_order_detail.php?id=${id}`);
        const data = await res.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        const order = data.order;
        const items = data.items;

        
        document.getElementById("orderInfo").innerHTML = `
            <p><strong>Mã đơn:</strong> HD${String(order.id).padStart(3, '0')}</p>
            <p><strong>Khách hàng:</strong> ${order.customer_name}</p>
            <p><strong>SĐT:</strong> ${order.phone ?? "Không có"}</p>
            <p><strong>Địa chỉ:</strong> ${order.full_address ?? order.delivery_address}</p>
            <p><strong>Ngày đặt:</strong> ${formatDate(order.order_date)}</p>
            <p><strong>Thanh toán:</strong> ${order.payment_method}</p>
            <p><strong>Trạng thái:</strong> ${order.status}</p>
        `;

        
        const tbody = document.getElementById("orderItems");
        tbody.innerHTML = "";

        let total = 0;

        items.forEach(item => {
            const subtotal = item.quantity * item.selling_price;
            total += subtotal;

            tbody.innerHTML += `
                <tr>
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>${formatMoney(item.selling_price)}</td>
                    <td>${formatMoney(subtotal)}</td>
                </tr>
            `;
        });

        
        document.getElementById("totalAmount").innerText =
            "Tổng tiền: " + formatMoney(total);

    } catch (err) {
        console.error("Lỗi:", err);
    }
}

loadOrderDetail();