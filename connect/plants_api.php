<?php
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Read plants
        $result = $conn->query("SELECT * FROM plants");
        $plants = array();
        
        while ($row = $result->fetch_assoc()) {
            // Decode JSON fields
            $row['suitable_locations'] = json_decode($row['suitable_locations'], true);
            $plants[] = $row;
        }
        
        echo json_encode($plants);
        break;
        
    case 'POST':
        // Create or Update plant
        $data = json_decode(file_get_contents("php://input"), true);
        
        $id = isset($data['id']) ? $data['id'] : null;
        $name = $data['name'];
        $category = $data['category'];
        $image = $data['image'];
        $light_requirement = $data['light_requirement'];
        $watering_info = $data['watering_info'];
        $temperature_range = $data['temperature_range'];
        $humidity_level = $data['humidity_level'];
        $planting_guide = $data['planting_guide'];
        $suitable_locations = json_encode($data['suitable_locations']);
        
        if ($id) {
            // Update existing plant
            $stmt = $conn->prepare("UPDATE plants SET name=?, category=?, image=?, light_requirement=?, watering_info=?, temperature_range=?, humidity_level=?, planting_guide=?, suitable_locations=? WHERE id=?");
            $stmt->bind_param("ssssssssss", $name, $category, $image, $light_requirement, $watering_info, $temperature_range, $humidity_level, $planting_guide, $suitable_locations, $id);
        } else {
            // Create new plant
            $stmt = $conn->prepare("INSERT INTO plants (name, category, image, light_requirement, watering_info, temperature_range, humidity_level, planting_guide, suitable_locations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssss", $name, $category, $image, $light_requirement, $watering_info, $temperature_range, $humidity_level, $planting_guide, $suitable_locations);
        }
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "id" => $id ? $id : $stmt->insert_id));
        } else {
            echo json_encode(array("success" => false, "error" => $stmt->error));
        }
        break;
        
    case 'DELETE':
        // Delete plant
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM plants WHERE id=?");
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