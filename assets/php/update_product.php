<?php
header('Content-Type: application/json');
require_once 'dp.php';

$id = intval($_POST['id'] ?? 0);
$category_id = intval($_POST['category_id'] ?? 0);
$brand = trim($_POST['brand'] ?? '');
$name = trim($_POST['name'] ?? '');
$color = trim($_POST['color'] ?? '');
$size = trim($_POST['size'] ?? '');
$cost_price = floatval($_POST['cost_price'] ?? 0);
$profit_rate = floatval($_POST['profit_rate'] ?? 0);
$quantity = intval($_POST['quantity'] ?? 0);
$description = trim($_POST['description'] ?? '');
$status = $_POST['status'] ?? 'visible';

$image_url = null;
if(isset($_FILES['image']) && $_FILES['image']['error'] === 0){
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $newName = 'product_' . $id . '.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], '../assets/img/' . $newName);
    $image_url = 'assets/img/' . $newName;
}

if($id > 0){
    $sql = "UPDATE products SET category_id=?, brand=?, name=?, color=?, size=?, cost_price=?, profit_rate=?, quantity=?, description=?, status=?";
    if($image_url) $sql .= ", image_url=?";
    $sql .= " WHERE id=?";

    $stmt = $conn->prepare($sql);
    if($image_url){
        $stmt->bind_param("issssddisssi", $category_id, $brand, $name, $color, $size, $cost_price, $profit_rate, $quantity, $description, $status, $image_url, $id);
    } else {
        $stmt->bind_param("issssddissi", $category_id, $brand, $name, $color, $size, $cost_price, $profit_rate, $quantity, $description, $status, $id);
    }

    if($stmt->execute()){
        echo json_encode(['success'=>true,'message'=>'Cập nhật sản phẩm thành công']);
    }else{
        echo json_encode(['success'=>false,'message'=>'Lỗi cập nhật sản phẩm']);
    }
}else{
    echo json_encode(['success'=>false,'message'=>'ID sản phẩm không hợp lệ']);
}
?>