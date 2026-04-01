  <?php include '../assets/php/check_admin.php'; ?>
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý nhập hàng</title>

    <link rel="stylesheet" href="../assets/css/NhaphangGiaban.css">
    <link rel="stylesheet" href="../assets/css/fontinter.css">
    <link rel="stylesheet" href="../assets/css/root.css">
  </head>
  <body>

  <div class="container">

    
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
      <li><a href="../pages/QuanLyTonKho.html">Quản lý tồn kho</a></li> 
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li> 
    </ul>
  </nav>
    <main class="content">
      <div class="sub-container">

        <section class="sub-section">

          <h2>Quản lý nhập hàng</h2>
          <p class="desc">Danh sách phiếu nhập</p>

          <div class="top-bar">

            <div class="search-box1">
              <label>Tra cứu phiếu nhập theo khoảng thời gian</label>

              <div class="date-range">
                <input type="date" id="from-date">
                <span>→</span>
                <input type="date" id="to-date">
              </div>
            </div>

            <a href="FormPhieuNhap.html">
              <button class="btn-add-product">+ Thêm phiếu nhập</button>
            </a>

          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Mã phiếu nhập</th>
                <th>Tổng giá tiền</th>
                <th>Ngày nhập</th>
                <th>Số lượng sản phẩm</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody id="receipt-table-body">
            </tbody>
          </table>

        </section>

      </div>
    </main>

  </div>

  <script src="../assets/js/testchucnangaddpnh.js"></script>
  
  </body>
  </html>