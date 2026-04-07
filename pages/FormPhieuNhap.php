<?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang Quản Trị</title>
  <link rel="stylesheet" href="../assets/css/NhaphangGiaban.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="stylesheet" href="../assets/css/root.css">
</head>
<body>
  <div class="container">
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

    <main class="content">
      <div class="form-container">
        <h3>Tạo phiếu nhập hàng</h3>
        <form id="form-phieunhap">

          <div class="form-row">
            <label for="ngay-nhap">Ngày nhập</label>
            <input type="datetime-local" id="ngay-nhap" required>
          </div>

          <div class="form-row">
            <label for="so-san-pham">Số sản phẩm muốn thêm</label>
            <input type="number" id="so-san-pham" min="1" placeholder="Nhập số sản phẩm">
          </div>

          <div id="product-list"></div>

          <div class="form-buttons">
            <button type="button" id="btn-complete" class="btn btn-save">Hoàn thành phiếu nhập</button>
            <button type="button" class="btn btn-cancel" onclick="location.href='../pages/NhapHangGiaBan.php'">Hủy</button>
          </div>

        </form>
      </div>
    </main>
  </div>

  <script src="../assets/js/addphieunhap.js"></script>
</body>
</html>