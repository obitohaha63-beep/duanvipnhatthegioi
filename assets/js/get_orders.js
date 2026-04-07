
async function loadOrders() {
    try {
        
        const response = await fetch('../assets/php/get_orders.php?status=delivered,confirmed');
        const data = await response.json();

        if (data.success) {
            const tbody = document.getElementById('orderTableBody');
            tbody.innerHTML = "";

            data.orders.forEach(order => {
                const row = `
                    <tr>
                        <td>HD${String(order.id).padStart(3, '0')}</td>
                        <td>${formatDate(order.order_date)}</td>
                        <td>${formatMoney(order.total_amount)}</td>
                        <td>
                            <button class="btn-xem">
                                <a href="donhangcuaban.html?id=${order.id}" style="color:white;">
                                    Xem
                                </a>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("Lỗi load đơn hàng:", error);
    }
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}


function formatMoney(amount) {
    return Number(amount).toLocaleString('vi-VN') + '₫';
}


loadOrders();
