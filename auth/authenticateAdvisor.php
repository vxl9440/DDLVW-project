<?php

require 'jwtGenerator.php';

$jwt = new JwtGenerator();


$payload = [
    "fname" => "{$_SERVER['givenName']}",
    "lname" => "{$_SERVER['sn']}",
    "email" => "{$_SERVER['mail']}",
];

$token = $jwt->jwt_encode_data($payload);

// redirect back to angular app with token in param
header("Location: http://localhost:4200/?token=$token");

exit();
?>