<?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang Quản Trị</title>
  <link rel="stylesheet" href="../assets/css/QuanLyDonDatHang.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="stylesheet" href="../assets/css/root.css">
</head>
<body>
  <div class="container">
    <!-- Menu bên trái -->
    
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

    <!-- Nội dung bên phải -->
    <main class="content">
      <a href="DonhangTonkho.html">
      <header class="header">
        <h1>Quản lý số lượng tồn sản phẩm</h1>
      
      </header>
      </a>
      <a href="QuanLyDonDatHang.html">
       <header class="header-duoi">
        <h1>Quản lý đơn đặt hàng của khách hàng</h1>
        
      </header>
      </a>

        <!-- Tra cứu theo ngày -->
        <div class="order-search">
          <h2> Tra cứu đơn hàng</h2>
          <div class="search-filters">
            <div class="filter-group">
              <label>Từ ngày:</label>
              <input type="date">
            </div>
            <div class="filter-group">
              <label>Đến ngày:</label>
              <input type="date">
            </div>
            <div class="filter-group">
              <label>Tình trạng đơn hàng:</label>
              <select>
                <option>Tất cả</option>
                <option>Mới đặt</option>
                <option>Đã xử lý</option>
                <option>Đã giao</option>
                <option>Hủy</option>
              </select>
            </div>
            <button class="btn-primary">Tra cứu</button>
          </div>
        </div>

        <!-- Bảng danh sách đơn hàng -->
        <div class="order-list">
          <h2>📋 Danh sách đơn hàng</h2>
          <table>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
            <tr>
              <td>#DH001</td>
              <td>Thành Phát Anh Hưng</td>
              <td>2025-10-22</td>
              <td>2,500,000₫</td>
              <td><span class="status pending">Mới đặt</span></td>
              <td><button class="btn-detail">Chi tiết</button></td>
            </tr>
            <tr>
              <td>#DH002</td>
              <td>Trần Thị B</td>
              <td>2025-10-23</td>
              <td>1,200,000₫</td>
              <td><span class="status shipped">Đã giao</span></td>
              <td><button class="btn-detail">Chi tiết</button></td>
            </tr>
          </table>
        </div>

        <!-- Chi tiết đơn hàng -->
        <div class="order-detail">
          <h2>📦 Chi tiết đơn hàng</h2>
          <p><strong>Mã đơn hàng:</strong> #DH001</p>
          <p><strong>Khách hàng:</strong> Thành Phát Anh Hưng</p>
          <p><strong>Địa chỉ giao hàng:</strong>  273 An Dương Vương, Phường Chợ Quán, TPHCM.</p>

          <table>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
            <tr>
              <td>Vợt cầu lông Yonex Nanoflare 1000 Chính Hãng</td>
              <td>1</td>
              <td>2,500,000₫</td>
              <td>2,500,000₫</td>
            </tr>
          </table>

          <div class="update-status">
            <label>Cập nhật tình trạng đơn hàng:</label>
            <select>
              <option>Mới đặt</option>
              <option>Đã xử lý</option>
              <option>Đã giao</option>
              <option>Hủy</option>
            </select>
            <button class="btn-update">Cập nhật</button>
          </div>
        </div>
    

    </main>
  </div>
</body>
</html>
