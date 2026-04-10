
let isLoggedIn = false;


async function checkLoginStatus() {
    try {
        const response = await fetch('../assets/php/check_login.php');
        const result = await response.json();
        isLoggedIn = result.isLoggedIn;
        console.log(' Trạng thái đăng nhập:', isLoggedIn ? 'Đã đăng nhập' : 'Chưa đăng nhập');
    } catch (error) {
        console.error('Lỗi kiểm tra đăng nhập:', error);
        isLoggedIn = false;
    }
}


function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}


function createProductHTML(product) {

    let productUrl;
    if (isLoggedIn) {

        productUrl = `../pages/SanPham1.php?id=${product.id}`;
    } else {

        productUrl = `../pages/SanPham.html?id=${product.id}`;
    }

    return `
        <div class="box">
            <div class="container-arcsaber">
                <a href="${productUrl}">
                    <img class="anh-arcsaber" src="../${product.image_url}" alt="${product.name}">
                    <span class="text-arcsaber">${product.name}</span>
                    <span class="mausac-arsaber">+1 màu sắc</span>
                    <span class="gia">${formatPrice(product.selling_price)}</span>
                </a>
            </div>
        </div>
    `;
}


async function loadLatestProducts() {
    try {
        // Bước 1: Kiểm tra trạng thái đăng nhập trước
        await checkLoginStatus();

        // Bước 2: Fetch dữ liệu sản phẩm từ API
        const response = await fetch('../assets/php/get_latest_products.php');

        // Kiểm tra nếu request thành công
        if (!response.ok) {
            throw new Error('Lỗi kết nối tới server');
        }

        // Parse JSON response
        const result = await response.json();

        if (!result.success) {
            console.error('API Error:', result.error);
            return;
        }

        const container = document.querySelector('.containerhot');

        if (!container) {
            console.error('Không tìm thấy element .containerhot');
            return;
        }

        container.innerHTML = '';

        
        // (createProductHTML sẽ tự động set URL dựa trên isLoggedIn)
        result.data.forEach(product => {
            container.innerHTML += createProductHTML(product);
        });

    } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
    }
}

// Chạy hàm khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', loadLatestProducts);
