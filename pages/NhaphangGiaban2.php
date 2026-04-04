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

  <!-- Sidebar -->
  
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

  <!-- Main -->
  <main class="content">
    <div class="sub-container">

      <section class="sub-section">
        <h2>Quản lý giá bán</h2>
        <p class="desc">Thông tin giá vốn, lợi nhuận và giá bán</p>

        <!-- Search -->
        <div class="search-box">

          <div class="search-field">
            <label for="gia-von">Tra cứu giá vốn</label>
            <input type="text" id="gia-von" placeholder="Nhập giá vốn muốn tìm...">
          </div>

          <div class="search-field">
            <label for="loi-nhuan">Tra cứu % lợi nhuận</label>
            <input type="text" id="loi-nhuan" placeholder="Nhập % lợi nhuận muốn tìm...">
          </div>

          <div class="search-field">
            <label for="gia-ban">Tra cứu giá bán</label>
            <input type="text" id="gia-ban" placeholder="Nhập giá bán muốn tìm...">
          </div>

          <div class="search-field">
            <label for="loai-sp">Loại</label>
            <select id="loai-sp">
              <option value="">Tất cả</option>
              <option value="Vợt">Vợt</option>
              <option value="Giày">Giày</option>
              <option value="Phụ kiện">Phụ kiện</option>
            </select>
          </div>

        </div>

        <!-- Table -->
        <table class="data-table" id="table-giaban">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá vốn (VNĐ)</th>
              <th>Lợi nhuận (%)</th>
              <th>Giá bán (VNĐ)</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <!-- JS render vào đây -->
          <tbody id="giaban-body">
          </tbody>

        </table>

      </section>

    </div>
  </main>

</div>

<script src="../assets/js/giaban.js"></script>

</body>
</html>