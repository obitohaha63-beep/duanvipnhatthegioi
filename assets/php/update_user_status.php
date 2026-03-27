<?php
// Nhận dữ liệu từ client
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$newStatus = $data['newStatus'];

// Kết nối với cơ sở dữ liệu
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quebshop1";

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Cập nhật trạng thái tài khoản
$sql = "UPDATE users SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newStatus, $userId);

if ($stmt->execute()) {
    // Trả kết quả về client
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Cập nhật thất bại']);
}

// Đóng kết nối
$stmt->close();
$conn->close();
?>