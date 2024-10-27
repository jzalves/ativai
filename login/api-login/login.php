<?php
require 'config.php';
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json; charset=UTF-8");

// Captura dados do corpo da requisição
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email_personal) || !isset($data->senha_personal)) {
    echo json_encode(["message" => "Dados incompletos."]);
    exit;
}

$email_personal = $data->email_personal;
$senha_personal = $data->senha_personal;

// Verifica o usuário no banco de dados
$query = "SELECT * FROM login WHERE email_personal = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email_personal);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["message" => "Usuário ou senha incorretos."]);
    exit;
}

$user = $result->fetch_assoc();

// Verifica a senha
if (!password_verify($senha_personal, $user['senha_personal'])) {
    echo json_encode(["message" => "Usuário ou senha incorretos."]);
    exit;
}

// Gera o token JWT
$payload = [
    "id" => $user['id'],
    "email" => $user['email_personal'],
    "iat" => time(),
    "exp" => time() + 3600 // Token expira em 1 hora
];

$jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

echo json_encode(["token" => $jwt]);
?>
