<?php

require "db.php";

$product_code = $_POST["product_code"];
$name = $_POST["name"];
$category = $_POST["category"];
$description = $_POST["description"];
$color = $_POST["color"];
$weight = $_POST["weight"];
$unit = $_POST["unit"];
$stock = $_POST["stock_quantity"];
$cost = $_POST["cost_price"];
$profit = $_POST["profit_rate"];
$image = $_POST["image"];
$status = $_POST["status"];

# Giá bán = giá vốn * (100% + tỷ lệ lợi nhuận)

$selling_price = $cost * (1 + $profit/100);

$sql = "INSERT INTO products
(product_code,name,category,description,color,weight,unit,stock_quantity,cost_price,profit_rate,selling_price,image,status)

VALUES
(:product_code,:name,:category,:description,:color,:weight,:unit,:stock,:cost,:profit,:selling_price,:image,:status)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
':product_code'=>$product_code,
':name'=>$name,
':category'=>$category,
':description'=>$description,
':color'=>$color,
':weight'=>$weight,
':unit'=>$unit,
':stock'=>$stock,
':cost'=>$cost,
':profit'=>$profit,
':selling_price'=>$selling_price,
':image'=>$image,
':status'=>$status
]);

echo "Thêm sản phẩm thành công";

?>