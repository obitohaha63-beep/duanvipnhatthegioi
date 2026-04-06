<?php
header("Content-Type: application/json");
require "db.php";

$id = $_POST['productId'] ?? 0;

// Gắn sẵn các dữ liệu cần cập nhật vào mảng (bỏ color và size)
$data = [
    ':name' => $_POST['name'] ?? '',
    ':brand' => $_POST['brand'] ?? '',
    ':category_id' => $_POST['category_id'] ?? 0,
    ':cost' => $_POST['cost_price'] ?? 0,
    ':profit' => $_POST['profit_rate'] ?? 0,
    ':quantity' => $_POST['quantity'] ?? 0,
    ':description' => $_POST['description'] ?? '',
    ':status' => $_POST['status'] ?? 'visible',
    ':id' => $id
];

$image_url = null;
$remove_image = $_POST['remove_image'] ?? 0;

// Xử lý upload ảnh mới nếu có
if(isset($_FILES['image']) && $_FILES['image']['error'] == 0){
    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $target = "../uploads/" . $fileName;

    if(move_uploaded_file($_FILES["image"]["tmp_name"], $target)){
        $image_url = "assets/uploads/" . $fileName;
    }
}

try {
    // Nếu có upload ảnh mới, ta Update luôn cột image_url
    if($image_url){
        $sql = "UPDATE products SET 
            name=:name, brand=:brand, category_id=:category_id, 
            cost_price=:cost, profit_rate=:profit, quantity=:quantity,
            description=:description, status=:status, image_url=:image
            WHERE id=:id";
        
        $data[':image'] = $image_url;
    } 
    // Nếu người dùng yêu cầu xóa ảnh
    elseif ($remove_image == 1) {
        $sql = "UPDATE products SET 
            name=:name, brand=:brand, category_id=:category_id, 
            cost_price=:cost, profit_rate=:profit, quantity=:quantity,
            description=:description, status=:status, image_url=NULL
            WHERE id=:id";
    }
    // Nếu không thay đổi ảnh
    else {
        $sql = "UPDATE products SET 
            name=:name, brand=:brand, category_id=:category_id, 
            cost_price=:cost, profit_rate=:profit, quantity=:quantity,
            description=:description, status=:status
            WHERE id=:id";
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute($data);

    echo json_encode(["success"=>true, "message"=>"Cập nhật thành công"]);

} catch(PDOException $e){
    echo json_encode(["success"=>false, "message"=>"Lỗi: ".$e->getMessage()]);
}
?>