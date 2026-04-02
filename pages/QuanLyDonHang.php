<?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Quản lý đơn đặt hàng</title>
  <link rel="stylesheet" href="../assets/css/DonhangTonkho.css">
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
      <li><a href="../pages/QuanLyTonKho.html">Quản lý tồn kho</a></li> </ul>
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li> 
  </nav>
  <!-- Nội dung -->
  <main class="content">
    <div class="card">
      <h2>Quản lý đơn đặt hàng</h2>

      <div class="form-group">
        <label>Từ ngày:</label>
        <input type="date" id="fromDate">

        <label>Đến ngày:</label>
        <input type="date" id="toDate">

        <label>Tình trạng:</label>
        <select id="statusFilter">
          <option value="">Tất cả</option>
          <option value="pending">Chưa xử lý</option>
          <option value="confirmed">Xác nhận</option>
          <option value="delivered">Đã giao thành công</option>
          <option value="cancelled">Hủy đơn hàng</option>
        </select>

        <button id="searchBtn">Tra cứu</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Tình trạng</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody id="orderTableBody">
        </tbody>
      </table>

    </div>
  </main>

</div>

<script src="../assets/js/QuanLyDonHang.js"></script>
</body>
</html>