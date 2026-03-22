<?php
require "db.php";

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $name = $_POST['name'] ?? '';
    $category_id = $_POST['category_id'] ?? '';
    $price = $_POST['price'] ?? 0;
    $quantity = $_POST['quantity'] ?? 0;
    $description = $_POST['description'] ?? '';

    if(empty($name) || empty($category_id)){
        echo json_encode(['status'=>'error','message'=>'Tên sản phẩm và loại không được để trống']);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO products (category_id, name, price, quantity, description) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$category_id, $name, $price, $quantity, $description]);
        $product_id = $pdo->lastInsertId();

        // Lưu thuộc tính
        foreach($_POST as $key => $val){
            if(strpos($key,'attr_') === 0){
                $attribute_id = substr($key,5);
                $stmt = $pdo->prepare("INSERT INTO product_attributes (product_id, attribute_id, value) VALUES (?, ?, ?)");
                $stmt->execute([$product_id, $attribute_id, $val]);
            }
        }

        $pdo->commit();
        echo json_encode(['status'=>'success','message'=>'Thêm sản phẩm thành công']);
    } catch (Exception $e){
        $pdo->rollBack();
        echo json_encode(['status'=>'error','message'=>'Lỗi: '.$e->getMessage()]);
    }
} else {
    echo json_encode(['status'=>'error','message'=>'Phương thức không hợp lệ']);
}