<?php

include('../Models/dbConnection.php');

if (isset($_POST['name']) && $_POST['email'] && isset($_POST['password']) && $_POST['confirmpassword']) {

    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmpassword'];

    $query = "INSERT INTO users(email, password, username) VALUES('$email', '$password', '$username')";
    $response = mysqli_query($connection, $query);


    if ($response) {
        echo json_encode(array("success" => 1));
    }
    else {
        echo json_encode(array("success" => 0));
    }

} 
else {
    echo json_encode(array("success" => 0));
}

?>