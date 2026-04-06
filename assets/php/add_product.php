<?php
header("Content-Type: application/json");
require "db.php"; // Kết nối cơ sở dữ liệu (Database)

// Hàm hỗ trợ tải ảnh lên server
function uploadImage($file) {
    $uploadDir = __DIR__ . "/../uploads/";

    // Nếu chưa có thư mục uploads thì tạo mới
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Kiểm tra định dạng file xem có phải là ảnh không
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        return null;
    }

    // Đổi tên file để không bị trùng (thêm thời gian hiện tại vào trước tên file)
    $filename = time() . "_" . basename($file["name"]);
    $targetFile = $uploadDir . $filename;

    // Di chuyển file từ bộ nhớ tạm vào thư mục uploads
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        return "assets/uploads/" . $filename; 
    }

    return null;
}

// Bắt đầu xử lý khi có request gửi lên bằng phương thức POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Lấy dữ liệu từ form, dùng toán tử ?? để gán giá trị mặc định nếu rỗng
    $name = trim($_POST['name'] ?? '');
    $category_id = intval($_POST['category_id'] ?? 0);
    $brand = trim($_POST['brand'] ?? '');
    $cost_price = floatval($_POST['cost_price'] ?? 0);
    $profit_rate = floatval($_POST['profit_rate'] ?? 20);
    $quantity = intval($_POST['quantity'] ?? 0);
    $status = $_POST['status'] ?? 'visible';
    $description = trim($_POST['description'] ?? '');

    $image_url = null;

    // Nếu người dùng có chọn upload ảnh
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $image_url = uploadImage($_FILES['image']);
    }

    // Kiểm tra các trường bắt buộc
    if ($name === '' || $category_id === 0 || $brand === '') {
        echo json_encode([
            'success' => false,
            'message' => 'Tên, danh mục và thương hiệu không được để trống'
        ]);
        exit; // Dừng chạy code ngay lập tức
    }

    try {
        // Chuẩn bị câu lệnh SQL để thêm dữ liệu (Dùng PDO để chống lỗi bảo mật SQL Injection)
        $stmt = $conn->prepare("
            INSERT INTO products 
            (name, category_id, brand, image_url, quantity, cost_price, profit_rate, status, description) 
            VALUES 
            (:name, :category_id, :brand, :image_url, :quantity, :cost_price, :profit_rate, :status, :description)
        ");

        // Gắn dữ liệu thật vào câu lệnh SQL và chạy
        $stmt->execute([
            ':name' => $name,
            ':category_id' => $category_id,
            ':brand' => $brand,
            ':image_url' => $image_url,
            ':quantity' => $quantity,
            ':cost_price' => $cost_price,
            ':profit_rate' => $profit_rate,
            ':status' => $status,
            ':description' => $description
        ]);

        echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công']);

    } catch(PDOException $e) {
        // Bắt lỗi nếu Database gặp vấn đề
        echo json_encode(['success' => false, 'message' => 'Lỗi DB: ' . $e->getMessage()]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ']);
}