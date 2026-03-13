<?php
require "db.php";

if(isset($_GET["code"])){

    $code = $_GET["code"];

    $stmt = $pdo->prepare("SELECT * FROM products WHERE product_code = ?");
    $stmt->execute([$code]);

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

}else{

    $stmt = $pdo->query("SELECT * FROM products");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

}

echo json_encode($data);