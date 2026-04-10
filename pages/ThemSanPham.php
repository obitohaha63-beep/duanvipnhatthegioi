  <?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tạo loại sản phẩm</title>

  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="stylesheet" href="../assets/css/QuanLySanPham.css">
</head>

<body>
<div class="container">

  <!-- SIDEBAR -->
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

  <!-- CONTENT -->
  <main class="content">

    <!-- HEADER -->
    <div class="page-header">
      <h1>Tạo loại sản phẩm</h1>
      <button onclick="history.back()" class="btn-secondary">← Quay lại</button>
    </div>

     <form id="addCate" class="form-card">

      <!-- BASIC INFO -->
      <section class="card">
        <h2>Thông tin cơ bản</h2>

        <div class="form-group">
          <label>Tên loại sản phẩm</label>
          <input type="text" name="name" required placeholder="VD: Vợt cầu lông">
        </div>

        
      </section>

      <!-- ACTION -->
      <div class="form-actions">
        <button type="button" onclick="history.back()" class="btn-secondary">Hủy</button>
        <button type="submit" class="btn-primary">+ Tạo loại sản phẩm</button>
      </div>

    </form>


  </main>
</div>

<script src="../assets/js/add_category.js"></script>
</body>
</html>
