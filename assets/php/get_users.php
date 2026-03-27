<?php
header('Content-Type: application/json; charset=utf-8');

// Kết nối database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quebshop1";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Kết nối thất bại"
    ]));
}

// Lấy users + role
$sql = "SELECT id, name, email, status, role FROM users";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

echo json_encode($users);
?>