<?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quản lý sản phẩm</title>

  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="stylesheet" href="../assets/css/QuanLySanPham.css">
</head>

<body>
<div class="container">

  <!-- SIDEBAR -->
 
    <nav class="sidebar">
    <h2 class="logo">Admin</h2>

    <ul class="menu">
      <li><a href="../pages/dashboard.html">Dashboard</a></li>
      <li><a href="../pages/QuanLyuser.html">Quản lý người dùng</a></li>
      <li><a href="../pages/DanhMuc.html">Danh mục</a></li>
      <li><a href="../pages/QuanLySanPham.html">Sản phẩm</a></li>
      <li><a href="../pages/NhaphangGiaban.html">Quản lý nhập hàng</a></li> 
      <li><a href="../pages/NhaphangGiaban2.html">Quản lý giá bán</a></li> 
      <li><a href="../pages/QuanLyDonHang.html" > Quản lý đơn đặt hàng </a></li> 
      <li><a href="../pages/QuanLyTonKho.html">Quản lý tồn kho</a></li> </ul>
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li> 
  </nav>

  <!-- CONTENT -->
  <main class="content">

    <div class="page-header">
      <h1>Quản lý sản phẩm</h1>
    </div>

    <section class="card">
      <div class="card-header">
        <h2>Danh sách sản phẩm</h2>
        <button onclick="location.href='AddProduct.html'" class="btn-primary">
          + Thêm sản phẩm
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Thương hiệu</th>
            <th>Màu sắc</th>
            <th>Kích thước</th>
            <th>Giá nhập</th>
            <th>% Lợi nhuận</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="productTable">
          <!-- JS render -->
        </tbody>
      </table>
    </section>

  </main>
</div>

<script src="../assets/js/product_list.js"></script>
</body>
</html>