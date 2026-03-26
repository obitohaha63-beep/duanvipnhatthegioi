<?php
// Kết nối với cơ sở dữ liệu
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quebshop2";

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Truy vấn lấy danh sách người dùng
$sql = "SELECT id, name, email, status FROM users";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Đóng kết nối
$conn->close();

// Trả dữ liệu dưới dạng JSON
echo json_encode($users);
?>