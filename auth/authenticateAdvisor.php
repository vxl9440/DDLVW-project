<?php

require 'jwtGenerator.php';

$jwt = new JwtGenerator();

$payload = [
    "fname" => "{$_SERVER['givenName']}",
    "lname" => "{$_SERVER['sn']}",
    "email" => "{$_SERVER['mail']}",
];

$token = $jwt->jwt_encode_data($payload);

setcookie('jwt', $token, time() + 86400, "/", "", null, true);

// header('Content-Type: application/json; charset=utf-8');
// echo json_encode(["token" => $token]);

exit();
?>