<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plantopia";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Tangkap method request
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Handle GET request (Read)
        $status = isset($_GET['status']) ? $_GET['status'] : 'all';
        
        if ($status === 'all') {
            $sql = "SELECT * FROM orders";
        } else {
            $sql = "SELECT * FROM orders WHERE status = ?";
        }
        
        $stmt = $conn->prepare($sql);
        
        if ($status !== 'all') {
            $stmt->bind_param("s", $status);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        $orders = array();
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        
        echo json_encode($orders);
        break;
        
    case 'POST':
        // Handle POST request (Create)
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Generate new ID
        $result = $conn->query("SELECT MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)) as max_id FROM orders");
        $row = $result->fetch_assoc();
        $newId = 'ORD-' . str_pad(($row['max_id'] + 1), 3, '0', STR_PAD_LEFT);
        
        $stmt = $conn->prepare("INSERT INTO orders (id, order_date, customer_name, total, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdss", 
            $newId,
            $data['date'],
            $data['customer'],
            $data['total'],
            $data['status']
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $newId]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
        break;
        
    case 'PUT':
        // Handle PUT request (Update)
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        
        $stmt = $conn->prepare("UPDATE orders SET order_date = ?, customer_name = ?, total = ?, status = ? WHERE id = ?");
        $stmt->bind_param("ssdss", 
            $data['date'],
            $data['customer'],
            $data['total'],
            $data['status'],
            $id
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
        break;
        
    case 'DELETE':
        // Handle DELETE request (Delete)
        $id = $_GET['id'];
        
        $stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>