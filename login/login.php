<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "ativai_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão com o banco de dados."]));
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['username'];
$passwordInput = $data['password'];

$sql = "SELECT id_personal FROM login_personal WHERE email_personal = ? AND senha_personal = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $passwordInput);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Login bem-sucedido."]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciais inválidas."]);
}

$stmt->close();
$conn->close();
?>
