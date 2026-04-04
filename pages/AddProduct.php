
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thêm sản phẩm</title>

  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="stylesheet" href="../assets/css/QuanLySanPham.css">
  <style>
    .preview-img { max-width: 150px; margin-top: 10px; display: block; }
  </style>
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

    <div class="page-header">
      <h1>Thêm sản phẩm</h1>
      <button onclick="history.back()" class="btn-secondary">← Quay lại</button>
    </div>

    <form id="addProductForm" enctype="multipart/form-data">

      <div class="form-group">
        <label>Danh mục</label>
        <select name="category_id" id="categorySelect" required></select>

        <label>Thương hiệu</label>
        <input type="text" name="brand" placeholder="VD: Yonex..." required>

        <label>Tên sản phẩm</label>
        <input type="text" name="name" placeholder="VD: Vợt cầu lông..." required>

        <label>Màu sắc</label>
        <input type="text" name="color" placeholder="VD: Đỏ, Xanh">

        <label>Thông số </label>
        <input type="text" name="size" placeholder="VD: M, L, XL">

        <label>Giá nhập</label>
        <input type="number" name="cost_price" placeholder="VD: 500000" required>

        <label>% Lợi nhuận</label>
        <input type="number" name="profit_rate" placeholder="VD: 20">

        <label>Số lượng</label>
        <input type="number" name="quantity" value="0">

        <label>Ảnh sản phẩm</label>
        <input type="file" id="imageInput" name="image">
        <img id="previewImage" class="preview-img" src="" alt="Preview">

        <label>Mô tả</label>
        <textarea name="description" rows="5"></textarea>

        <label>Trạng thái</label>
        <select name="status">
          <option value="visible">Hiển thị</option>
          <option value="hidden">Ẩn</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">+ Thêm sản phẩm</button>
        <button type="button" onclick="history.back()" class="btn-secondary">Hủy</button>
      </div>

    </form>

  </main>
</div>

<script src="../assets/js/add_product.js"></script>
</body>
</html>