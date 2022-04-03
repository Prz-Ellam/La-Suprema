<?php

class UserDTO {

    private $username;
    private $email;
    private $password;

    public function __construct($username, $email, $password) {

        $this->$username = $username;
        $this->$email = $email;
        $this->$password = $password;

    }

    public function getUsername() {

        return $username;

    }

    public function setUsername($username) {

        $this->$username = $username;

    }

    public function getEmail() {

        return $email;

    }

    public function setEmail($email) {

        $this->$email = $email;

    }

    public function getPassword() {

        return $password;

    }

    public function setPassword($password) {

        $this->$password = $password;

    }

}



?>