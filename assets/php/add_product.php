<?php

require "db.php";
$data = $_POST;

$data["selling_price"] = $data["cost_price"] * (1 + $data["profit_rate"]/100);

$columns = implode(",", array_keys($data));
$placeholders = ":" . implode(",:", array_keys($data));

$sql = "INSERT INTO products ($columns) VALUES ($placeholders)";

$stmt = $pdo->prepare($sql);
$stmt->execute($data);
echo "Thêm sản phẩm thành công";

?>