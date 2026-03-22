
<?php

require "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu cơ bản
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    
    // Lấy dữ liệu thuộc tính
    $attr_names = $_POST['attr_name'] ?? [];
    $attr_types = $_POST['attr_type'] ?? [];
    $attr_options = $_POST['attr_options'] ?? [];

    if (empty($name)) {
        echo json_encode(['status' => 'error', 'message' => 'Tên loại sản phẩm không được để trống']);
        exit;
    }

    try {
        // Bắt đầu transaction
        $pdo->beginTransaction();

        // Thêm category
        $stmt = $pdo->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
        $stmt->execute([$name, $description]);
        $category_id = $pdo->lastInsertId();

        // Thêm các attribute
        for ($i = 0; $i < count($attr_names); $i++) {
            $attr_name = trim($attr_names[$i]);
            $attr_type = $attr_types[$i];
            $options_str = $attr_options[$i] ?? '';

            if ($attr_name === '') continue;

            // Thêm vào category_attributes
            $stmt = $pdo->prepare("INSERT INTO category_attributes (category_id, name, type) VALUES (?, ?, ?)");
            $stmt->execute([$category_id, $attr_name, $attr_type]);
            $attribute_id = $pdo->lastInsertId();

            // Nếu là select, thêm các option
            if ($attr_type === 'select' && $options_str !== '') {
                $options = array_map('trim', explode(',', $options_str));
                foreach ($options as $opt) {
                    if ($opt === '') continue;
                    $stmt = $pdo->prepare("INSERT INTO attribute_options (attribute_id, value) VALUES (?, ?)");
                    $stmt->execute([$attribute_id, $opt]);
                }
            }
        }

        $pdo->commit();
        echo json_encode(['status' => 'success', 'message' => 'Tạo loại sản phẩm thành công']);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . $e->getMessage()]);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Phương thức không hợp lệ']);
}
?>