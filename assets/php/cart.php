<?php
require "db.php";
session_start();

header("Content-Type: application/json; charset=UTF-8");

// Kiểm tra người dùng đã đăng nhập
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';

// Lấy dữ liệu JSON từ request body
$input = json_decode(file_get_contents('php://input'), true);

try {
    if ($action === 'add') {
        // Thêm sản phẩm vào giỏ hàng
        $product_id = $input['product_id'] ?? null;
        $quantity = $input['quantity'] ?? 1;

        if (!$product_id) {
            echo json_encode(['success' => false, 'message' => 'Thiếu thông tin sản phẩm']);
            exit;
        }

        // Kiểm tra sản phẩm có tồn tại không
        $checkProduct = $pdo->prepare("SELECT id FROM products WHERE id = ?");
        $checkProduct->execute([$product_id]);
        if (!$checkProduct->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Sản phẩm không tồn tại']);
            exit;
        }

        // Lấy hoặc tạo giỏ hàng cho người dùng
        $cartStmt = $pdo->prepare("SELECT id FROM carts WHERE user_id = ?");
        $cartStmt->execute([$user_id]);
        $cart = $cartStmt->fetch(PDO::FETCH_ASSOC);

        if (!$cart) {
            // Tạo giỏ hàng mới
            $createCart = $pdo->prepare("INSERT INTO carts (user_id) VALUES (?)");
            $createCart->execute([$user_id]);
            $cart_id = $pdo->lastInsertId();
        } else {
            $cart_id = $cart['id'];
        }

        // Kiểm tra sản phẩm đã có trong giỏ không
        $checkItem = $pdo->prepare("SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?");
        $checkItem->execute([$cart_id, $product_id]);
        $item = $checkItem->fetch(PDO::FETCH_ASSOC);

        if ($item) {
            // Cập nhật số lượng
            $updateItem = $pdo->prepare("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?");
            $updateItem->execute([$quantity, $item['id']]);
        } else {
            // Thêm sản phẩm mới
            $addItem = $pdo->prepare("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)");
            $addItem->execute([$cart_id, $product_id, $quantity]);
        }

        echo json_encode(['success' => true, 'message' => 'Thêm vào giỏ hàng thành công']);

    } elseif ($action === 'get') {
        // Lấy danh sách giỏ hàng
        $stmt = $pdo->prepare("
            SELECT 
                ci.id,
                ci.product_id,
                ci.quantity,
                p.name,
                p.selling_price,
                p.image,
                p.product_code
            FROM cart_items ci
            JOIN carts c ON ci.cart_id = c.id
            JOIN products p ON ci.product_id = p.id
            WHERE c.user_id = ?
            ORDER BY ci.id DESC
        ");
        $stmt->execute([$user_id]);
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'items' => $items]);

    } elseif ($action === 'remove') {
        // Xóa sản phẩm khỏi giỏ
        $cart_item_id = $input['cart_item_id'] ?? null;

        if (!$cart_item_id) {
            echo json_encode(['success' => false, 'message' => 'Thiếu thông tin']);
            exit;
        }

        $deleteItem = $pdo->prepare("
            DELETE FROM cart_items 
            WHERE id = ? AND cart_id IN (SELECT id FROM carts WHERE user_id = ?)
        ");
        $deleteItem->execute([$cart_item_id, $user_id]);

        echo json_encode(['success' => true, 'message' => 'Xóa khỏi giỏ hàng thành công']);

    } elseif ($action === 'update') {
        // Cập nhật số lượng
        $cart_item_id = $input['cart_item_id'] ?? null;
        $quantity = $input['quantity'] ?? 1;

        if (!$cart_item_id || $quantity < 1) {
            echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
            exit;
        }

        $updateItem = $pdo->prepare("
            UPDATE cart_items 
            SET quantity = ? 
            WHERE id = ? AND cart_id IN (SELECT id FROM carts WHERE user_id = ?)
        ");
        $updateItem->execute([$quantity, $cart_item_id, $user_id]);

        echo json_encode(['success' => true, 'message' => 'Cập nhật giỏ hàng thành công']);

    } else {
        echo json_encode(['success' => false, 'message' => 'Action không hợp lệ']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
}
?>
