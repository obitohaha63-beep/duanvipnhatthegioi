<?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quản lý danh mục</title>

  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="stylesheet" href="../assets/css/QuanLySanPham.css">
</head>

<body>
<div class="container">

  <!-- SIDEBAR -->
  <nav class="sidebar">
    <h2 class="logo">Admin</h2>

    <ul class="menu">
      <li><a href="dashboard.html">Dashboard</a></li>
      <li><a href="QuanLyuser.html">Quản lý người dùng</a></li>
      <li><a href="DanhMuc.html">Danh mục</a></li>
      <li><a href="QuanLySanPham.html">Sản phẩm</a></li>
      <li><a href="NhaphangGiaban.html">Quản lý nhập hàng</a></li> 
      <li><a href="NhaphangGiaban2.html">Quản lý giá bán</a></li> 
      <li><a href="QuanLyDonHang.html" > Quản lý đơn đặt hàng </a></li> 
      <li><a href="QuanLyTonKho.html">Quản lý tồn kho</a></li> </ul>
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li> 
  </nav>

  <!-- CONTENT -->
  <main class="content">

    <div class="page-header">
      <h1>Quản lý danh mục</h1>
    </div>

    <section class="card">
      <div class="card-header">
        <h2>Danh mục</h2>
        <button onclick="location.href='ThemSanPham.html'" class="btn-primary">
          + Thêm loại
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
          </tr>
        </thead>
        <tbody id="categoryTable">
          <!-- JS render -->
        </tbody>
      </table>
    </section>

  </main>
</div>

<script src="../assets/js/category_list.js"></script>
</body>
</html>