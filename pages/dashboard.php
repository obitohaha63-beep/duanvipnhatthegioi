  <?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang Quản Trị</title>
  <link rel="stylesheet" href="../assets/css/dashboard.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="stylesheet" href="../assets/css/root.css">
</head>

<body>
  <div class="container">
    <!-- Menu bên trái -->
    <nav class="sidebar">
    <h2 class="logo">Admin</h2>

    <ul class="menu">
      <li><a href="../pages/dashboard.php">Dashboard</a></li>
      <li><a href="../pages/QuanLyuser.php">Quản lý người dùng</a></li>
      <li><a href="../pages/DanhMuc.php">Danh mục</a></li>
      <li><a href="../pages/QuanLySanPham.php">Sản phẩm</a></li>
      <li><a href="../pages/NhaphangGiaban.php">Quản lý nhập hàng</a></li> 
      <li><a href="../pages/NhaphangGiaban2.php">Quản lý giá bán</a></li> 
      <li><a href="../pages/QuanLyDonHang.php" > Quản lý đơn đặt hàng </a></li> 
      <li><a href="../pages/QuanLyTonKho.php">Quản lý tồn kho</a></li> </ul>
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li> 
  </nav>
    <!-- Nội dung bên phải -->
    <main class="content">
      <h1>Dashboard</h1>
      <div class="khung">
        <div class="box">
            <b>
            <p>Người dùng</p>
              <div class="box-trong">
                <p id="totalUsers">0</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Sản phẩm</p>
              <div class="box-trong">
                <p id="totalProducts">0</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Tồn kho tổng</p>
              <div class="box-trong">
                <p id="totalStock">0</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Tổng doanh thu</p>
              <div class="box-trong">
                <p id="totalRevenue">0</p>
                </b>
              </div>
        </div>
      </div>
    </main>
  </div>
  <script>
document.addEventListener("DOMContentLoaded", function () {
  fetch('../assets/php/dashboard_api.php')
    .then(res => res.json())
    .then(data => {
      document.getElementById('totalUsers').innerText = data.users;
      document.getElementById('totalProducts').innerText = data.products;
      document.getElementById('totalStock').innerText = data.stock;

      document.getElementById('totalRevenue').innerText =
        Number(data.revenue).toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + ' đ';
    })
    .catch(err => console.error(err));
});
</script>
</body>

</html>
