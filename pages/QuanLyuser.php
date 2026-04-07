<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang Quản Trị</title>
  <link rel="stylesheet" href="../assets/css/QuanLyuser.css">
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
      <h1>Quản lý tài khoản khách hàng và quản trị viên</h1>
    <div class="action-bar" style="margin-bottom: 20px; text-align: right;">
    <a href="themtaikhoan.php" class="btn-add-user">
        <i class="fas fa-user-plus"></i> + Thêm tài khoản mới
    </a>
</div>
      <div class="khung-table">
        <div class="user-list">
          <h2>Danh sách người dùng</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody id="user-table">
            </tbody>
          </table>
        </div>
      </div>

      <br>

      <div class="khung-table">
        <div class="user-list">
          <h2>Danh sách quản trị viên</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody id="admin-table">
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <script src="../assets/js/QuanLyuser.js"></script>
</body>
</html>