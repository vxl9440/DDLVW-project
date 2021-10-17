<?php

require_once './php-jwt/src/JWT.php';

use \Firebase\JWT\JWT;

class JwtGenerator {
    protected $jwt_secrect;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct() {
        // set your default time-zone
        $this->issuedAt = time();
        
        // Token Validity (86400 second = 24hr)
        $this->expire = $this->issuedAt + 86400;

        // Set your secret or signature
        $this->jwt_secrect = "ischool";  
    }

    // ENCODING THE TOKEN
    public function jwt_encode_data($data) {

        $token = [
            "iss" => "localhost",
            "iat" => $this->issuedAt,
            "exp" => $this->expire,
            "data"=> $data
        ];

        $this->jwt = JWT::encode($token, $this->jwt_secrect);
        
        return $this->jwt;
    }
}

?>