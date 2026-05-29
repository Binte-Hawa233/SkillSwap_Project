<?php
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Please login first!']);
    exit;
}

$user_id = $_SESSION['user_id'];
$post_id = $_POST['post_id'];

$check = mysqli_query($conn, "SELECT id FROM likes WHERE post_id='$post_id' AND user_id='$user_id'");

if (mysqli_num_rows($check) > 0) {
    mysqli_query($conn, "DELETE FROM likes WHERE post_id='$post_id' AND user_id='$user_id'");
    echo json_encode(['status' => 'unliked']);
} else {
    mysqli_query($conn, "INSERT INTO likes (post_id, user_id) VALUES ('$post_id', '$user_id')");
    echo json_encode(['status' => 'liked']);
}
?>