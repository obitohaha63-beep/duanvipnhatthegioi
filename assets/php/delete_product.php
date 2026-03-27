<?php
header("Content-Type: application/json");
require_once "db.php";

$id = $_POST['id'] ?? 0;

try{
    $stmt = $conn->prepare("DELETE FROM products WHERE id=?");
    $stmt->execute([$id]);

    if($stmt->rowCount() > 0){
        echo json_encode(['success'=>true, 'message'=>'Xóa sản phẩm thành công']);
    } else {
        echo json_encode(['success'=>false, 'message'=>'Sản phẩm không tồn tại']);
    }
}catch(PDOException $e){
    echo json_encode(['success'=>false, 'message'=>'Lỗi DB: '.$e->getMessage()]);
}