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
      <li><a href="../pages/QuanLyTonKho.html">Quản lý tồn kho</a></li> </ul>
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
                <p>1</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Sản phẩm</p>
              <div class="box-trong">
                <p>9</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Tồn kho tổng</p>
              <div class="box-trong">
                <p>19</p>
                </b>
              </div>
        </div>
        <div class="box">
            <b>
            <p>Tổng doanh thu</p>
              <div class="box-trong">
                <p>16.120K</p>
                </b>
              </div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
