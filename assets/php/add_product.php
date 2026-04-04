<?php
header("Content-Type: application/json");
require "db.php";

function uploadImage($file){
    $uploadDir = __DIR__ . "/../uploads/";

    if(!is_dir($uploadDir)){
        mkdir($uploadDir, 0777, true);
    }

    // validate file
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if(!in_array($file['type'], $allowedTypes)){
        return null;
    }

    $filename = time() . "_" . basename($file["name"]);
    $targetFile = $uploadDir . $filename;

    if(move_uploaded_file($file["tmp_name"], $targetFile)){
        return "assets/uploads/" . $filename; // ✅ đồng bộ toàn hệ thống
    }

    return null;
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){

    // 🔥 DEBUG (bật khi cần)
    // echo json_encode(["FILES"=>$_FILES, "POST"=>$_POST]); exit;

    $name = trim($_POST['name'] ?? '');
    $category_id = intval($_POST['category_id'] ?? 0);
    $brand = trim($_POST['brand'] ?? '');
    $color = trim($_POST['color'] ?? '');
    $size = trim($_POST['size'] ?? '');
    $cost_price = floatval($_POST['cost_price'] ?? 0);
    $profit_rate = floatval($_POST['profit_rate'] ?? 20);
    $quantity = intval($_POST['quantity'] ?? 0);
    $status = $_POST['status'] ?? 'visible';
    $description = trim($_POST['description'] ?? '');

    $image_url = null;

    if(isset($_FILES['image']) && $_FILES['image']['error'] === 0){
        $image_url = uploadImage($_FILES['image']);
    }

    if($name === '' || $category_id === 0 || $brand === ''){
        echo json_encode([
            'success'=>false,
            'message'=>'Tên, danh mục và thương hiệu không được để trống'
        ]);
        exit;
    }

    try{
        $stmt = $conn->prepare("
            INSERT INTO products 
            (name, category_id, brand, color, size, image_url, quantity, cost_price, profit_rate, status, description) 
            VALUES 
            (:name, :category_id, :brand, :color, :size, :image_url, :quantity, :cost_price, :profit_rate, :status, :description)
        ");

        $stmt->execute([
            ':name'=>$name,
            ':category_id'=>$category_id,
            ':brand'=>$brand,
            ':color'=>$color,
            ':size'=>$size,
            ':image_url'=>$image_url,
            ':quantity'=>$quantity,
            ':cost_price'=>$cost_price,
            ':profit_rate'=>$profit_rate,
            ':status'=>$status,
            ':description'=>$description
        ]);

        echo json_encode([
            'success'=>true,
            'message'=>'Thêm sản phẩm thành công'
        ]);

    } catch(PDOException $e){
        echo json_encode([
            'success'=>false,
            'message'=>'Lỗi DB: '.$e->getMessage()
        ]);
    }

} else {
    echo json_encode([
        'success'=>false,
        'message'=>'Phương thức không hợp lệ'
    ]);
}