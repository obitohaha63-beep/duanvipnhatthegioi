<?php
header("Content-Type: application/json");
require "db.php"; 

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Phải dùng POST']);
    exit;
}

// Lấy dữ liệu
$id = $_POST['id'] ?? '';
$category_id = $_POST['category_id'] ?? '';
$brand = $_POST['brand'] ?? '';
$name = $_POST['name'] ?? '';
$color = $_POST['color'] ?? '';
$size = $_POST['size'] ?? '';
$cost_price = $_POST['cost_price'] ?? 0;
$profit_rate = $_POST['profit_rate'] ?? 0;
$quantity = $_POST['quantity'] ?? 0;
$description = $_POST['description'] ?? '';
$status = $_POST['status'] ?? 'visible';

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu ID sản phẩm']);
    exit;
}

// Xử lý ảnh upload
$image_url = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $targetDir = "../assets/img/";
    $fileName = 'product_' . time() . '.' . $ext;
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        $image_url = 'assets/img/' . $fileName;
    } else {
        echo json_encode(['success' => false, 'message' => 'Không lưu được ảnh']);
        exit;
    }
}

try {
    $sql = "UPDATE products SET category_id=?, brand=?, name=?, color=?, size=?, cost_price=?, profit_rate=?, quantity=?, description=?, status=?";
    $params = [$category_id, $brand, $name, $color, $size, $cost_price, $profit_rate, $quantity, $description, $status];

    if ($image_url) {
        $sql .= ", image_url=?";
        $params[] = $image_url;
    }

    $sql .= " WHERE id=?";
    $params[] = $id;

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi cập nhật sản phẩm']);
}