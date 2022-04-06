<?php

class UserDTO {

    private $userID;
    private $username;
    private $email;
    private $password;

    public function __construct() {

    }

    public function getUserID() {

        return $this->userID;

    }

    public function setUserID($userID) {

        $this->userID = $userID;

    }

    public function getUsername() {

        return $this->username;

    }

    public function setUsername($username) {

        $this->username = $username;

    }

    public function getEmail() {

        return $this->email;

    }

    public function setEmail($email) {

        $this->email = $email;

    }

    public function getPassword() {

        return $this->password;

    }

    public function setPassword($password) {

        $this->password = $password;

    }

}



?>