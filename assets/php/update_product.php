<?php
header('Content-Type: application/json');
require 'db.php';

$id = intval($_POST['id'] ?? 0);
$name = $_POST['name'] ?? '';
$category_id = intval($_POST['category_id'] ?? 0);
$cost_price = floatval($_POST['cost_price'] ?? 0);
$profit_percent = floatval($_POST['profit_percent'] ?? 0);
$description = $_POST['description'] ?? '';
$quantity = intval($_POST['quantity'] ?? 0);
$status = $_POST['status'] ?? 'active';

if(!$id || !$name || !$category_id){
    echo json_encode(['status'=>'error','message'=>'Thiếu dữ liệu']);
    exit;
}

// IMAGE
$image_name = '';
if(isset($_FILES['image']) && $_FILES['image']['error']==0){
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $image_name = time() . '.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $image_name);
    $stmt = $conn->prepare("UPDATE products SET name=?, category_id=?, cost_price=?, profit_percent=?, description=?, quantity=?, status=?, image_url=? WHERE id=?");
    $stmt->bind_param("siiddsisi", $name, $category_id, $cost_price, $profit_percent, $description, $quantity, $status, $image_name, $id);
}else{
    $stmt = $conn->prepare("UPDATE products SET name=?, category_id=?, cost_price=?, profit_percent=?, description=?, quantity=?, status=? WHERE id=?");
    $stmt->bind_param("siiddssi", $name, $category_id, $cost_price, $profit_percent, $description, $quantity, $status, $id);
}

if($stmt->execute()){
    echo json_encode(['status'=>'success','message'=>'Cập nhật thành công']);
}else{
    echo json_encode(['status'=>'error','message'=>'Cập nhật thất bại']);
}
?>