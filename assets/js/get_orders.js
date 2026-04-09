
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
                            <button class="btn-xem" data-order-id="${order.id}" type="button">
                Xem
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

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-xem')) {
        window.location.href = `../pages/donhangcuaban.php?id=${e.target.dataset.orderId}`;
    }
});
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}


function formatMoney(amount) {
    return Number(amount).toLocaleString('vi-VN') + '₫';
}


loadOrders();
