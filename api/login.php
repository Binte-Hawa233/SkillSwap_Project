<?php
// Turn off all error display
error_reporting(0);
ini_set('display_errors', 0);

require 'config.php';

$email    = mysqli_real_escape_string($conn, $_POST['email']);
$password = $_POST['password'];

$result = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
$user   = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id']    = $user['id'];
    $_SESSION['user_name']  = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    echo json_encode([
        'status'  => 'success',
        'message' => 'Login successful!',
        'name'    => $user['name'],
        'email'   => $user['email'],
        'id'      => $user['id']
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid email or password!'
    ]);
}
?>