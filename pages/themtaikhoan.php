  <?php include '../assets/php/check_admin.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thêm tài khoản mới</title>
    <link rel="stylesheet" href="../assets/css/style.css"> <style>
        
        .container { max-width: 500px; margin: 50px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .form-group input[readonly] { background-color: #f9f9f9; cursor: not-allowed; }
        .btn-submit { width: 100%; padding: 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; transition: 0.3s; }
        .btn-submit:hover { background-color: #218838; }
        .btn-back { display: inline-block; margin-bottom: 20px; text-decoration: none; color: #666; font-size: 14px; }
        .btn-back:hover { color: #000; }
        .message { padding: 10px; margin-bottom: 15px; border-radius: 4px; display: none; }
        .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>

<div class="container">
    <a href="javascript:history.back()" class="btn-back">← Quay lại danh sách</a>
    <h2>Thêm tài khoản mới</h2>
    <div id="response-msg" class="message"></div>

    <form id="form-add-user">
        <div class="form-group">
            <label for="name">Họ và tên</label>
            <input type="text" id="name" name="name" placeholder="VD: Nguyễn Văn A" required>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="email@gmail.com" required>
        </div>

        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="tel" id="phone" name="phone" placeholder="09xxxxxxxx" pattern="[0-9]{10}">
        </div>

        <div class="form-group">
            <label for="role">Vai trò</label>
            <select id="role" name="role">
                <option value="customer">Khách hàng</option>
                <option value="admin">Quản trị viên</option>
            </select>
        </div>

        <div class="form-group">
            <label for="password">Mật khẩu khởi tạo</label>
            <input type="text" id="password" value="123456" readonly>
            <small style="color: #666;">(Mặc định cho tài khoản mới)</small>
        </div>

        <button type="submit" class="btn-submit">Tạo tài khoản</button>
    </form>
</div>

<script src="../assets/js/themtaikhoan.js"></script>
</body>
</html>
