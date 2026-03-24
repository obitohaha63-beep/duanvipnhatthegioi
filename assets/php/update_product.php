<?php
header('Content-Type: application/json');
require 'db.php';

try {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $category_id = $_POST['category_id'];
    $brand_id = $_POST['brand_id'] ?? null;
    $cost_price = $_POST['cost_price'] ?? 0;
    $profit_percent = $_POST['profit_percent'] ?? 0;
    $quantity = $_POST['quantity'] ?? 0;
    $description = $_POST['description'] ?? '';
    $status = $_POST['status'] ?? 'active';

    $conn->beginTransaction();

    // 1. Update products
    $stmt = $conn->prepare("UPDATE products SET name=?, category_id=?, brand_id=?, cost_price=?, profit_percent=?, description=?, status=? WHERE id=?");
    $stmt->execute([$name, $category_id, $brand_id, $cost_price, $profit_percent, $description, $status, $id]);

    // 2. Update first variant quantity (simple)
    $stmt = $conn->prepare("SELECT id FROM product_variants WHERE product_id=? LIMIT 1");
    $stmt->execute([$id]);
    $variant = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($variant) {
        $stmt = $conn->prepare("UPDATE product_variants SET quantity=? WHERE id=?");
        $stmt->execute([$quantity, $variant['id']]);

        // 3. Update variant_attributes
        foreach ($_POST as $key => $val) {
            if (strpos($key, 'attr_') === 0) {
                $attr_id = str_replace('attr_', '', $key);

                // Check type of attribute
                $stmt = $conn->prepare("SELECT type FROM attributes WHERE id=?");
                $stmt->execute([$attr_id]);
                $attr = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$attr) continue;

                if ($attr['type'] === 'text') {
                    // Update value_text
                    $stmt = $conn->prepare("UPDATE variant_attributes SET value_text=? WHERE variant_id=? AND attribute_id=?");
                    $stmt->execute([$val, $variant['id'], $attr_id]);
                } else if ($attr['type'] === 'select') {
                    // Update option_id
                    $stmt = $conn->prepare("UPDATE variant_attributes SET option_id=? WHERE variant_id=? AND attribute_id=?");
                    $stmt->execute([$val, $variant['id'], $attr_id]);
                }
            }
        }
    }

    // 4. Update image
    if (isset($_FILES['image']) && $_FILES['image']['tmp_name']) {
        $imgName = time().'_'.$_FILES['image']['name'];
        $target = '../assets/uploads/'.$imgName;
        move_uploaded_file($_FILES['image']['tmp_name'], $target);

        // Simple: delete old images and insert new
        $stmt = $conn->prepare("DELETE FROM product_images WHERE product_id=?");
        $stmt->execute([$id]);

        $stmt = $conn->prepare("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)");
        $stmt->execute([$id, $imgName]);
    }

    $conn->commit();

    echo json_encode(['status'=>'success','message'=>'Cập nhật sản phẩm thành công']);
} catch(Exception $e){
    $conn->rollBack();
    echo json_encode(['status'=>'error','message'=>'Lỗi: '.$e->getMessage()]);
}