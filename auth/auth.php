<?php

require 'jwtGenerator.php';

$jwt = new JwtGenerator();

// Add functionality to change role based on the authenticated user
// Role can be "admin", "advisor", or "manager" they are used in the Angular app
$role = "admin";

$payload = [
    "firstname" => "{$_SERVER['givenName']}",
    "lastname" => "{$_SERVER['sn']}",
    "email" => "{$_SERVER['mail']}",
    "role" => "{$role}"
];

$token = $jwt->jwt_encode_data($payload);


header("Location: http://localhost:4200/login?token=$token");


exit();
?>