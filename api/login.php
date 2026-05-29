<?php
require 'config.php';

$name     = mysqli_real_escape_string($conn, $_POST['name']);
$email    = mysqli_real_escape_string($conn, $_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Check if email exists
$check = mysqli_query($conn, "SELECT id FROM users WHERE email='$email'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email already exists!']);
    exit;
}

// Insert user
$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
if (mysqli_query($conn, $sql)) {
    $user_id = mysqli_insert_id($conn);
    $_SESSION['user_id']    = $user_id;
    $_SESSION['user_name']  = $name;
    $_SESSION['user_email'] = $email;
    echo json_encode(['status' => 'success', 'message' => 'Account created!', 'name' => $name]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Something went wrong!']);
}
?>