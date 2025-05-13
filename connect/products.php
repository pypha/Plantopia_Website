<?php
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Read products
        $result = $conn->query("SELECT * FROM products");
        $products = array();
        
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        
        echo json_encode($products);
        break;
        
    case 'POST':
        // Create or Update product
        $data = json_decode(file_get_contents("php://input"), true);
        
        $id = isset($data['id']) ? $data['id'] : null;
        $name = $data['name'];
        $category = $data['category'];
        $price = $data['price'];
        $stock = $data['stock'];
        $status = $data['status'];
        $image = isset($data['image']) ? $data['image'] : 'https://via.placeholder.com/150?text=Plant';
        
        if ($id) {
            // Update existing product
            $stmt = $conn->prepare("UPDATE products SET name=?, category=?, price=?, stock=?, status=?, image=? WHERE id=?");
            $stmt->bind_param("ssdisss", $name, $category, $price, $stock, $status, $image, $id);
        } else {
            // Create new product
            $stmt = $conn->prepare("INSERT INTO products (name, category, price, stock, status, image) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssdiss", $name, $category, $price, $stock, $status, $image);
        }
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "id" => $id ? $id : $stmt->insert_id));
        } else {
            echo json_encode(array("success" => false, "error" => $stmt->error));
        }
        break;
        
    case 'DELETE':
        // Delete product
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM products WHERE id=?");
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false, "error" => $stmt->error));
        }
        break;
}

$conn->close();
?>