  <?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đơn hàng & Tồn kho - Trang Quản Trị</title>
  <link rel="stylesheet" href="../assets/css/DonhangTonkho.css">
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
      <li><a href="../pages/QuanLyTonKho.php">Quản lý tồn kho</a></li> </ul>
      <li><a href="../assets/php/logout.php">Đăng xuất</a></li>
  </nav>

    <!-- Nội dung bên phải -->
    <main class="content">
      <div class="page-container">

        <!-- ==================== QUẢN LÝ ĐƠN HÀNG ==================== -->
        <div class="card">
          <h2>Quản lý đơn đặt hàng</h2>
          <div class="form-group">
            <label>Từ ngày:</label>
            <input type="date">
            <label>Đến ngày:</label>
            <input type="date">
            <label>Tình trạng:</label>
            <select>
                <option>Mới đặt</option>
              <option>Tất cả</option>

              <option>Đã xử lý</option>
              <option>Đã giao</option>
              <option>Hủy</option>
            </select>
            <button>Tra cứu</button>
          </div>

          <table>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Tình trạng</th>
              <th>Chi tiết</th>
            </tr>
            <tr>
              <td>DH001</td>
              <td>Đinh Công Thành</td>
              <td>01/11/2025</td>
              <td>2.500.000₫</td>
              <td><span class="result-box">Mới đặt</span></td>
              <td><button style="background-color: #4caf50;">Xem</button></td>
            </tr>

          </table>

          <!-- ====== CHI TIẾT ĐƠN HÀNG ====== -->
          <div class="card" style="margin-top:20px;">
            <h3>Chi tiết đơn hàng: DH001</h3>
            <div class="form-group">
              <label>Khách hàng:</label><input type="text" value="Đinh Công Thành" readonly>
              <label>Ngày đặt:</label><input type="text" value="01/11/2025" readonly>
            </div>
            <div class="form-group">
              <label>Địa chỉ:</label><input type="text" value="12 Nguyễn Trãi, Hà Nội" readonly>
              <label>Điện thoại:</label><input type="text" value="0796 556 438" readonly>
            </div>

            <table>
              <tr>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
              <tr>
                <td>SP001</td>
                <td>Yonex Arcsaber 11 Pro Chính Hãng</td>
                <td>1</td>
                <td>3.200.000₫</td>
                <td>3.200.000₫</td>
              </tr>

              <tr>
                <th colspan="4">Tổng cộng</th>
                <th>3.200.000₫</th>
              </tr>
            </table>

            <div class="form-group" style="margin-top:15px;">
              <label>Tình trạng đơn hàng:</label>
              <select>
                <option>Mới đặt</option>
                <option>Đã xử lý</option>
                <option>Đã giao</option>
                <option>Hủy</option>
              </select>
              <button>Cập nhật</button>
            </div>
          </div>
        </div>

        <!-- ==================== QUẢN LÝ TỒN KHO ==================== -->
        <div class="card">
          <h2>Quản lý số lượng tồn kho</h2>
          <div class="form-group">
            <label>Loại sản phẩm:</label>
            <select>
              <option>Tất cả</option>
              <option>Điện thoại</option>
              <option>Laptop</option>
              <option>Phụ kiện</option>
            </select>
            <label>Thời điểm:</label>
            <input type="date">
            <button>Tra cứu</button>
          </div>

          <table>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Loại</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
            </tr>
            <tr>
              <td>SP001</td>
              <td>Yonex Arcsaber 11 Pro Chính Hãng</td>
              <td>Vợt cầu lông</td>
              <td>5</td>
              <td><span class="alert">Sắp hết hàng!</span></td>
            </tr>
            <tr>
              <td>SP002</td>
              <td>Victor A550 LS</td>
              <td>Giày cầu lông</td>
              <td>20</td>
              <td>Đủ hàng</td>
            </tr>
            <tr>
              <td>SP003</td>
              <td>Lining AYQR014</td>
              <td>Ống cầu lông</td>
              <td>2</td>
              <td><span class="alert">Sắp hết hàng!</span></td>
            </tr>
          </table>

          <section>
      <h2>Tra cứu số lượng nhập – xuất – tồn</h2>
      <label>Tên sản phẩm:</label>
      <input type="text" placeholder="Ví dụ: Yonex"><br>
      <label>Từ ngày:</label>
      <input type="date">
      <label>Đến ngày:</label>
      <input type="date"><br>
      <p><strong>Kết quả hiển thị (ví dụ):</strong></p>
      <table>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng nhập</th>
          <th>Số lượng xuất</th>
          <th>Số lượng tồn</th>
        </tr>
        <tr>
          <td>SP001</td>
          <td>Yonex Arcsaber 11 Pro Chính Hãng</td>
          <td>20</td>
          <td>8</td>
          <td>12</td>
        </tr>

      </table>
    </section>
      </div>
    </main>
  </div>
</body>
</html>
