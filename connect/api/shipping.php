<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$dbHost = 'localhost';
$dbName = 'plantopia';
$dbUser = 'root';
$dbPass = '';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $action = $_GET['action'] ?? '';
    
    switch ($action) {
        case 'create':
            createShipping($pdo);
            break;
        case 'read':
            readShipping($pdo);
            break;
        case 'update':
            updateShipping($pdo);
            break;
        case 'delete':
            deleteShipping($pdo);
            break;
        default:
            echo json_encode(['error' => 'Aksi tidak valid']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Koneksi database gagal: ' . $e->getMessage()]);
}

function createShipping($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO shipping (
        order_id, 
        customer_name, 
        customer_address, 
        shipping_method, 
        status
    ) VALUES (?, ?, ?, ?, ?)");
    
    $stmt->execute([
        $data['order_id'],
        $data['customer_name'],
        $data['customer_address'],
        $data['shipping_method'],
        $data['status']
    ]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
}

function readShipping($pdo) {
    $stmt = $pdo->query("SELECT * FROM shipping ORDER BY id DESC");
    $shippings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($shippings);
}

function updateShipping($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE shipping SET 
        order_id = ?, 
        customer_name = ?, 
        customer_address = ?, 
        shipping_method = ?, 
        status = ?
        WHERE id = ?");
    
    $stmt->execute([
        $data['order_id'],
        $data['customer_name'],
        $data['customer_address'],
        $data['shipping_method'],
        $data['status'],
        $data['id']
    ]);
    
    echo json_encode(['success' => true]);
}

function deleteShipping($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("DELETE FROM shipping WHERE id = ?");
    $stmt->execute([$data['id']]);
    
    echo json_encode(['success' => true]);
}