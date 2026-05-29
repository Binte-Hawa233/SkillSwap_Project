<?php
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Please login first!']);
    exit;
}

$user_id = $_SESSION['user_id'];
$content = mysqli_real_escape_string($conn, $_POST['content']);
$topic   = mysqli_real_escape_string($conn, $_POST['topic']);

if (empty($content)) {
    echo json_encode(['status' => 'error', 'message' => 'Post cannot be empty!']);
    exit;
}

$sql = "INSERT INTO posts (user_id, content, topic) VALUES ('$user_id', '$content', '$topic')";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success', 'message' => 'Post created!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Something went wrong!']);
}
?>