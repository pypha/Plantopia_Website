<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'plantopia';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $method = $_SERVER['REQUEST_METHOD'];
    $userId = 1; // Untuk contoh, gunakan user ID 1

    switch ($method) {
        case 'GET':
            // Get user profile
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
            break;
            
        case 'POST':
            // Update profile
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("UPDATE users SET 
                name = ?, 
                email = ?, 
                phone = ?, 
                address = ?, 
                bio = ? 
                WHERE id = ?");
                
            $success = $stmt->execute([
                $data['name'],
                $data['email'],
                $data['phone'],
                $data['address'],
                $data['bio'],
                $userId
            ]);
            
            echo json_encode(['success' => $success]);
            break;
            
        case 'PUT':
            // Change password
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Verifikasi password lama
            $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            $user = $stmt->fetch();
            
            if (!password_verify($data['currentPassword'], $user['password'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Current password is incorrect']);
                break;
            }
            
            // Update password baru
            $newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
            $success = $stmt->execute([$newPassword, $userId]);
            
            echo json_encode(['success' => $success]);
            break;
            
        case 'DELETE':
            // Delete account
            $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
            $success = $stmt->execute([$userId]);
            
            if ($success) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete account']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>